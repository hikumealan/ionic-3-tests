const fs = require('fs');
const http = require('http');
const events = require('events');
const querystring = require('querystring');
const eventEmitter = new events.EventEmitter();

// const glob = require('glob');
// const cors = require('cors');
// Generate a v1 UUID (time-based)
const uuidV1 = require('uuid/v1');
// Generate a v4 UUID (random)
const uuidV4 = require('uuid/v4');
const helmet = require('helmet');
const express = require('express');
// const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// const xmlParser = require('express-xml-bodyparser');

// Server Data
// const reponses = glob.sync('/api/**/*');
const users = JSON.parse(fs.readFileSync('data/users.json'));
let sessions = JSON.parse(fs.readFileSync('data/sessions.json'));
let stepup = {
  interval: Math.floor(Math.random() * 60) + 10, // Stepup Interval between 10-60 secs
  enabled: false
};

//Server Function
const receive = function (req, res, next) {
    // console.log('Middleware');
  if(stepup.enabled){
    console.log('Step Up Started');
    stepup.enabled = false;
    eventEmitter.emit('doStepup', req, res, next);
  }
  else{
    next();
  }
};

const send = (res, status = 200, body) => {
    res.set('Content-Type', 'application/json; charset=UTF-8');
    try{
        res.status(status).send(body);
    }
    catch(e){
        res.status(500).send(e);
        console.error(e);
        throw(e);
    }
};

// Server Config
const app = express();
// Enabling Security from vulnerabilities
app.use(helmet());
// Enabling CORS for all routes
// app.use(cors());
// Enabling preflight requests for any route
// app.options('*', cors());


// Server Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
/*
app.use(cookieSession({
    name: 'session',
    keys: [
        // secret keys
    ],

    // Cookie Options
    maxAge: (1 * 60 * 60 * 1000) // 1 hour
}));
*/
/*
app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2'],
    cookie: {
        secure: true,
        httpOnly: true,
        domain: 'example.com',
        path: 'foo/bar',
        expires: new Date(Date.now() + (1 * 60 * 60 * 1000)) // 1 hour
    }
}));
*/

// Server Middleware
app.use(receive);

// Server Event
// eventEmitter.on('createSession', function(session){
//     sessions.push(session);
// });

// eventEmitter.on('cleanupSessions', function(){
//     sessions.forEach((item, index) => {
//         if((item.timestamp + item.expiration) < new Date().getTime()){
//             sessions.splice(index, 1);
//         }
//     });
// });

// eventEmitter.on('persistSessions', function(){
//     fs.writeFile('./data/session.json', JSON.stringify(sessions), function(err){
//         if(err){
//             console.error(err.stack);
//         }
//     });
// });

eventEmitter.on('doStepup', function(req, res, next){
  const mock = `./api/stepup.json`;
  fs.readFile(mock, function read(err, data) {
    console.log('Step Up Completed');
    if(err){
      send(res, 503, {message:`Error managing Step Up.`});
    }
    else{
      send(res, 200, data);
    }
  });
});

// eventEmitter.on('loadMocks', function(){
//     const mocks = glob.sync('api/**/*');
//     mocks.forEach(function(mock){
//         if(false && mock.includes('.')){
//             let type = mock.split('.').pop();
//             let url = '/' + mock.split('.').reverse().pop();
//             switch((type || '').toUpperCase()){
//                 case 'JSON':
//                     app.all(url, function(req, res){
//                         fs.readFile(mock, function read(err, data) {
//                             if(err){
//                                 send(res, 503, {message:`Error retrieving stub for '${mock}'`});
//                             }
//                             else{
//                                 send(res, 200, data);
//                             }
//                         });
//                     });
//                     console.log(`Mock endpoint '${url}' stubbed with '${mock}'`);
//                 break;
//                 case 'XML':
//                     res.set('Content-Type', 'application/xml; charset=UTF-8');
//                 break;
//                 default:
//
//                 break;
//             }
//         }
//     });
// });

// Server Route
/*
app.post('/api/authenticate', function(req, res){
    const username = req.body.user;
    const password = req.body.password;
    const logins = users.filter( (user) => {
        const usr = (((user || {}).credentials || {}).username || '').toLowerCase();
        return usr === (username || '').toLowerCase();
    });
    const results = Array.isArray(logins) ? logins : [];

    switch(results.length){
        case 0:
            send(res, 404, {message:'Invalid login'});
            break;
        default:
            // TODO: Manage multiple username matches
            // for(let i = 0; i < results.length; i++){
                let index = 0; // i
                let item = results[index];
                let psw = ((item || {}).credentials || {}).password;
                if(psw === password){
                    const uuid = uuidV1();
                    const session = {
                        id: item.id
                        , token: uuid
                        , timestamp: new Date().getTime()
                        , expiration: (1 * 60 * 60 * 1000)
                    };
                    delete item.credentials;
                    eventEmitter.emit('createSession', session);
                    res.set('Set-Cookie', uuid);
                    send(res, 200, item);
                    // break;
                }
                else{
                    send(res, 401, {message:'Invalid username/password'});
                    // break;
                }
            // }
            break;
    }
});
*/

app.get('/api/keepalive', function(req, res){
    // TODO: Read Cookies for Token
    send(res, 200, {message:'Keep Alive'});
});

// app.all( '/api/persist', function(req, res){
//     eventEmitter.emit('persistSessions');
// });

app.all( '*', function(req, res){
    const mock = `.${req.url}.json`;
    fs.readFile(mock, function read(err, data) {
        if(err){
            send(res, 400, {message:`No matching endpoint for '${req.url}'`});
        }
        else{
            send(res, 200, data);
        }
    });
});


process.on('uncaughtException', function(err){
    // if(process.env.NODE_ENV === 'production'){
    //     var mailer = nodemailer.createTransport(config.mailMode, config.nodemailer);
    //     var message = {
    //         from: config.senderMail,
    //         to: config.problemMail,
    //         subject: "Error in service: " + config.serviceName,
    //         text: (new Date()).toUTCString() + "\n\n" +
    //         err.message + "\n\n" +
    //         err.stack
    //     };
    //     mailer.sendMail(message, function() {
    //         process.exit(1);
    //     });
    // }
    // else{
    console.error(`${(new Date()).toUTCString()} uncaughtException: ${err.message}`);
    console.error(err.stack);
    process.exit(1);
    // }
});

const init = () => {
  eventEmitter.emit('cleanupSessions');
  // eventEmitter.emit('loadMocks');
  let server = http.createServer(app);
  // AWS Beanstalk by default sets up Nginx proxy the forward 80 -> 8081
  let port = process.env.NODE_ENV = 'production' ? 8081 : 8080;
  // server.listen(port);
  server.listen(8081);
  console.info(`Mock Server running on port: ${server.address().port}`);
  console.info(`Step up will be enabled every ${stepup.interval} seconds.`);
};

init();
setInterval( () => {
    eventEmitter.emit('cleanupSessions');
    setTimeout( () => {
        eventEmitter.emit('persistSessions');
    }, (5 * 1000)); // 5 secs
}, (60 * 1000)); // 60 secs

// Mock Step Up Enabling
// setInterval( () => {
//   if(!stepup.enabled){
//     console.info(`Step up enabled.`);
//     stepup.enabled = true;
//   }
// }, (stepup.interval * 1000)); // Random number of secs with 60 secs Max

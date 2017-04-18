import { TestBed, async } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ApplicationVersion } from '../providers/application-version';
import { ApplicationEnvironment } from '../providers/application-environment';

import { MyApp } from './app.component';


describe('MyApp Component', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MyApp
      ],
      imports: [
        IonicModule.forRoot(MyApp)
      ],
      providers: [
        StatusBar,
        SplashScreen,
        ApplicationEnvironment,
        ApplicationVersion
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(MyApp);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it ('should be the right type', () => {
    const fixture = TestBed.createComponent(MyApp);
    const app = fixture.debugElement.componentInstance;
    expect(app instanceof MyApp).toBe(true);
  });

  it ('should have two pages', () => {
    const fixture = TestBed.createComponent(MyApp);
    const app = fixture.debugElement.componentInstance;
    expect(app.pages.length).toBe(2);
  });

});

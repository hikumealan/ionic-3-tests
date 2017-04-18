#!/bin/bash

VERSION=`sed -n 's/\(<widget.*version="\)\([^"]*\)\(" .*>\)/\2/p' config.xml`
#echo "Version: $VERSION"
FIND=".*private VERSION: string = '.*$"
REPLACE="  private VERSION: string = '${VERSION}';"
ORIG_FILE="src/providers/application-version.ts"
NEW_FILE="src/providers/application-version.tmp"
sed "s/${FIND}/${REPLACE}/" ${ORIG_FILE} > ${NEW_FILE}
mv ${NEW_FILE} ${ORIG_FILE}
echo $VERSION > version.txt

#package-write

CLI and module for easily writing / updating a package.json file

## Install

    npm i -g package-write

## Usage

### CLI

    package-write "scripts.prepush" "jshint . && npm test"

Will result in

    "scripts": {
        "prepush": "jshint . && npm test"
    }


### Module

    var packageWrite = require('packageWrite'),
        fs = require('fs'),
        packagePath = packageWrite.getPackagePath(),
        packageFile = packageWrite.getPackage(packagePath);

    packageWrite.applyChange(packageFile, 'scripts.prepush', 'jshint . && npm test');

    fs.writeFileSync(packagePath, JSON.stringify(packageFile, null, 2));

Will result in

    "scripts": {
        "prepush": "jshint . && npm test"
    }
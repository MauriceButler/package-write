#!/usr/bin/env node

var args = require('minimist')(process.argv.slice(2)),
    packageWrite = require('./'),
    fs = require('graceful-fs'),
    argsLength = args._.length,
    packagePath,
    packageFile;

if(!argsLength || argsLength % 2 !== 0){
    console.error('Invalid number of arguments');
    process.exit(1);
    return;
}

packagePath = packageWrite.getPackagePath();
packageFile = packageWrite.getPackage(packagePath);

for (var i = 0; i < argsLength; i+=2) {
    packageWrite.applyChange(packageFile, args._[i], args._[i + 1]);
}

if(args.test || args.t){
    console.log(packageFile);
} else {
    fs.writeFileSync(packagePath, JSON.stringify(packageFile, null, 4));
}

process.exit(0);

var fs = require('graceful-fs'),
    path = require('path');

function getPackage(packagePath){
    return require(packagePath || getPackagePath());
}

function getPackagePath(currentPath){
    if(typeof currentPath === 'undefined'){
        currentPath = process.cwd();
    }

    if(!currentPath || currentPath === '/'){
        console.error('package.json not found.');
        process.exit(1);
        return;
    }

    var packagePath = path.join(currentPath, 'package.json');

    if(fs.existsSync(packagePath)){
        return packagePath;
    }

    return getPackagePath(path.join(currentPath, '..'));
}

function getTarget(base, keys){
   var result = base;

   if(keys.length){
       for (var i = 0; i < keys.length; i++) {
           if(typeof result[keys[i]] !== 'object'){
               result[keys[i]] = {};
           }

           result = result[keys[i]];
       }
   }

   return result;
}

function applyChange(base, diffKey, diffItem){
   var keys = diffKey.split('.'),
       lastKey = keys.pop(),
       thingToChange = getTarget(base, keys);

   thingToChange[lastKey] = diffItem;
}

module.exports = {
    getPackage: getPackage,
    getPackagePath: getPackagePath,
    applyChange: applyChange
};
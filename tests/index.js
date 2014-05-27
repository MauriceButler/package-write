var test = require('grape'),
    mockery = require('mockery'),
    packageWrite = require('../');

mockery.registerAllowables(['../', 'path']);

test('packageWrite exists', function(t){
    t.plan(2);

    t.ok(packageWrite, 'packageWrite exists');
    t.equal(typeof packageWrite, 'object', 'packageWrite is an object');
});

test('packageWrite.getPackage exists', function(t){
    t.plan(2);

    t.ok(packageWrite.getPackage, 'packageWrite.getPackage exists');
    t.equal(typeof packageWrite.getPackage, 'function', 'packageWrite.getPackage is a function');
});

test('packageWrite.getPackagePath exists', function(t){
    t.plan(2);

    t.ok(packageWrite.getPackagePath, 'packageWrite.getPackagePath exists');
    t.equal(typeof packageWrite.getPackagePath, 'function', 'packageWrite.getPackagePath is a function');
});

test('packageWrite.applyChange exists', function(t){
    t.plan(2);

    t.ok(packageWrite.applyChange, 'packageWrite.applyChange exists');
    t.equal(typeof packageWrite.applyChange, 'function', 'packageWrite.applyChange is a function');
});

test('packageWrite.applyChange works', function(t){
    t.plan(1);
    var base = {foo: 'bar'},
        expected = {foo: 'bar2', meh: 'stuff', beep: {boop: 'majigger'}},
        changes = ['foo', 'bar2', 'meh', 'stuff', 'beep.boop', 'majigger'];

    for (var i = 0; i < changes.length; i+=2) {
        packageWrite.applyChange(base, changes[i], changes[i + 1]);
    }

    t.deepEqual(base, expected, 'apply change works');
});

// test('packageWrite.getPackagePath works', function(t){
//     t.plan(2);
//     var expected = '/foo/package.json',
//         result;

//     mockery.registerMock('graceful-fs', {
//         existsSync: function(path){
//             return path === '/foo';
//         }
//     });

//     delete require.cache[require.resolve('../')];
//     mockery.enable({ useCleanCache: true, warnOnReplace: false });
//     var localPackageWrite = require('../');
//     mockery.disable();

//     result = localPackageWrite.getPackagePath('/foo/bar/meh/stuff/majigger');

//     t.equal(result, expected, 'packageWrite.getPackagePath works');
// });
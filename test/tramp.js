/*
    Use nodeunit to run these tests.
    All should pass.
 */

var Tramp = require('../index');

exports.justText = function(test){
    test.expect(2);
    Tramp.translate({input: 'English', output: 'French'}, {property: 'test', message: 'This is a test with just text.'}, function(err, result){
        test.ok(!err);
        test.equals(result, 'test=Ceci est un test avec juste le texte.');
        test.done();
    });
};

exports.textAndHTML = function(test){
    test.expect(2);
    Tramp.translate({input: 'English', output: 'French'}, {property: 'test', message: '<div class="test happy good">This is a test <strong>with some html</strong>.</div>'}, function(err, result){
        test.ok(!err);
        test.equals(result, 'test=<div class="test happy good"> Ceci est un test <strong>avec quelques html.</strong> </div>');
        test.done();
    });
};

exports.variables = function(test){
    test.expect(2);
    Tramp.translate({input: 'English', output: 'French'}, {property: 'test', message: 'I would like {0} to go to {1} on {2} with {3}.'}, function(err, result){
        test.ok(!err);
        test.equals(result, 'test=Je voudrais {0} pour aller à {1} le {2} avec {3}.');
        test.done();
    });
};

exports.otherLanguageToEnglish = function(test){
    test.expect(2);
    Tramp.translate({input: 'French', output: 'English'}, {property: 'test', message: 'Ceci est un test.'}, function(err, result){
        test.ok(!err);
        test.equals(result, 'test=This is a test.');
        test.done();
    }); 
};

exports.comment = function(test){
    test.expect(2);
    Tramp.translate({input: 'English', output: 'French'}, {comment: '# This is a comment.'}, function(err, result){
        test.ok(!err);
        test.equals(result, '# This is a comment.');
        test.done();
    });
};

exports.blankMessage = function(test){
    test.expect(2);
    Tramp.translate({input: 'English', output: 'French'}, {property: 'test', message: ''}, function(err, result){
        test.ok(!err);
        test.equals(result, 'test=');
        test.done();
    });
};


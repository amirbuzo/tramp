var Tramp = require('../index');

exports.justText = function(test){
    test.expect(1);
    Tramp.translate({input: 'English', output: 'French'}, {property: 'test.1', message: 'This is a test with just text.'}, function(result){
        test.equals(result, 'test.1=Ceci est un test avec juste le texte.');
        test.done();
    });
};

exports.textAndHTML = function(test){
    test.expect(1);
    Tramp.translate({input: 'English', output: 'French'}, {property: 'test.1', message: '<div class="test happy good">This is a test <strong>with some html</strong>.</div>'}, function(result){
        test.equals(result, 'test.1=<div class="test happy good"> Ceci est un test <strong>avec quelques html.</strong> </div>');
        test.done();
    });
};


// {0}, {1}
//other langage to english
// comment
// blank lines
// missing options


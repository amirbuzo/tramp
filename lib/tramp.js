var Translate = require('translate');

function line(options, data, callback) {
    //options = { input: output: }
    //data { comment: property: message: }

    if (!data.message || !data.message.length) {
        callback(data);
        return;
    }

    run_translate(options, data, callback);
}

function run_translate(options, data, callback) {
    Translate.text(options, data.message, function(err, translated_text){
        if (err) {
            setTimeout(function(){
                run_translate(options, data, callback);
            }, 1000 * 60 * 10);
        } else {
            callback({ property: data.property, message: translated_text });
        }
    });
}

function format(data) {
    return data.comment ? data.comment
            : data.property ? data.property + '=' + (data.message || '')
            : '';
}

function translate(options, message, callback) {
    var format_then_callback = function(data){ callback(null, format(data)) };
    line(options, message, format_then_callback);
}

module.exports.translate = translate;

//line('ei.section.invalidConfirmation.linkInvalidOrExpired=You \'seem\' to have clicked on a confirmation link that is invalid or expired.  If you were trying to <a href="{0}">create a new account</a> or <a href="{1}">reset your password</a>, please try again.');
//line('# test');
//line('ei.section.myEnergyUse.error.costs.noData=Your costs are not yet available in this view. <a href="{0}">See your costs for the year &raquo;</a>');
//line("{0} is providing you new information on your {1} use through the {2} program. It's part of our ongoing efforts to help our customers save energy and money.");
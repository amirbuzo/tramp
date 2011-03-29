
var CLI = require('cli'),
    Translate = require('translate');

var translation_cache = {};

var options = CLI.parse({
    input:   ['input',  'Source language.  Defaults to English.',   'string',     'English'],
    output:  ['output', 'Output language.  Defaults to French.',    'string',     'French']
});

var data,
    total_lines;
    current_line = -1;

CLI.withStdinLines(function(file_content){

    data = file_content;
    total_lines = data.length;
    process();
});

function process() {
    line(next_line());
}

function next_line() {
    current_line++;
    return (current_line < total_lines) ? data[current_line].trim() : false;
}

function message_out(property, message) {
    out(property + '=' + (message || ''));
}

function out(str) {
    console.log(str);
    process();
}

function continues_on_next_line(str) {
    return str.substr(str.length - 1) == '\\';
}

function multi_line_message(str) {
    if (str && continues_on_next_line(str)) {
        return str.substr(0, str.length - 1) + ' ' + multi_line_message(next_line());
    } else {
        return str;
    }
}

function split(str) {
    var equals_location  = str.indexOf('='),
        message = multi_line_message(str.substr(equals_location + 1));

    return {
        property: str.substr(0, equals_location),
        message: fix_original_message(message)
    }
}

function fix_original_message(str) {
    // Translate doesn't handle single quotes
    return str.replace(/'/g, '’').trim();
}

function fix_translated_message(str) {
    return str;
    /*
    // Entities encoder is a bit over dramatic
    return Entities.encode(str)
                .replace(/&comma;/g, ',')
                .replace(/&period;/g, '.')
                .replace(/&equals;/g, '=')
                .replace(/&quot;/g, '"')
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/&lcub;/g, '{')
                .replace(/&rcub;/g, '}')
                .replace(/&sol;/g, '/');
    */
}

function line(str) {
    if (str === false) {
        return;
    }

    if (!str.length || str.substr(0, 1) == '#') {
        out(str);
        return;
    }

    var data = split(str);

    if (!data.message.length) {
        message_out(data.property, '');
        return;
    }

    if (translation_cache[data.message]) {
        message_out(data.property, translation_cache[data.message]);
        return;
    }

    //console.log('Property: ', data.property);
    //console.log('Original: ', data.message);
    setTimeout(function(){
        translate(data.message, data.property);
    }, 1);
}


function translate(text, property) {
    Translate.text(options, text, function(err, translated_text){
        if (err) {
            setTimeout(function(){
                translate(text, property);
            }, 1000 * 60 * 10);
        } else {
            var output = fix_translated_message(translated_text);
            translation_cache[text] = output;
            message_out(property, output);
        }
    });

}

//line('ei.section.invalidConfirmation.linkInvalidOrExpired=You \'seem\' to have clicked on a confirmation link that is invalid or expired.  If you were trying to <a href="{0}">create a new account</a> or <a href="{1}">reset your password</a>, please try again.');
//line('# test');
//line('ei.section.myEnergyUse.error.costs.noData=Your costs are not yet available in this view. <a href="{0}">See your costs for the year &raquo;</a>');
//line("{0} is providing you new information on your {1} use through the {2} program. It's part of our ongoing efforts to help our customers save energy and money.");
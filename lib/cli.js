var CLI = require('cli'),
    Tramp = require('./tramp');

var options = CLI.parse({
    input:   ['input',  'Source language.  Defaults to English.',   'string',     'English'],
    output:  ['output', 'Output language.  Defaults to French.',    'string',     'French']
});

var file_contents,
    total_lines,
    current_line = -1;

CLI.withStdinLines(function(_file_content){
    file_contents = _file_content;
    total_lines = file_contents.length;

    process();
});


function process() {
    var data = split(read_line());
    if (data) {
        Tramp.translate(options, data, output_line);
    }
}

function read_line() {
    current_line++;
    return (current_line < total_lines) ? file_contents[current_line].trim() : false;
}

function continues_on_next_line(str) {
    return str.substr(str.length - 1) == '\\';
}

function multi_line_message(str) {
    if (str && continues_on_next_line(str)) {
        return str.substr(0, str.length - 1) + ' ' + multi_line_message(read_line());
    } else {
        return str;
    }
}

function split(str) {
    if (str === false) {
        return false;
    }

    if (!str.length) {
        return {};
    }

    if (str.substr(0, 1) == '#') {
        return {
            comment: str
        };
    }
    var equals_location = str.indexOf('='),
        message = multi_line_message(str.substr(equals_location + 1));

    return {
        property: str.substr(0, equals_location),
        message: fix_original_message(message)
    };
}

function fix_original_message(str) {
    // Translate doesn't handle single quotes
    return str.replace(/'/g, 'Õ').trim();
}

function output_line(text) {
    CLI.output(text + '\n');
    process();
}
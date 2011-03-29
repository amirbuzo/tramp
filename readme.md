# Tramp - TRAnslate Message Properties

A command line script for quick and dirty translations using Google Translate.

# Requirements

 - Node 0.4 or newer
 - npm
 - Message properties in the format listed below.

# Install

    npm install tramp

# Usage

    tramp [--input Language] [--output Language] < message.properties

## Example

    tramp --output Spanish < messages.properties > messages_sp.properties

# Languages

From the translate module:

<table><tbody><tr><td style="white-space: nowrap;">Afrikaans<br>Albanian<br>Arabic<br>Armenian<br>Azerbaijani<br>Basque<br>Belarusian<br>Bulgarian<br>Catalan<br>Chinese</td><td style="white-space: nowrap;">Croatian<br>Czech<br>Danish<br>Dutch<br>English<br>Estonian<br>Filipino<br>Finnish<br>French<br>Galician</td><td style="white-space: nowrap;">Georgian<br>German<br>Greek<br>Haitian Creole<br>Hebrew<br>Hindi<br>Hungarian<br>Icelandic<br>Indonesian<br>Irish</td><td style="white-space: nowrap;">Italian<br>Japanese<br>Korean<br>Latvian<br>Lithuanian<br>Macedonian<br>Malay<br>Maltese<br>Norwegian<br>Persian</td><td style="white-space: nowrap;">Polish<br>Portuguese<br>Romanian<br>Russian<br>Serbian<br>Slovak<br>Slovenian<br>Spanish<br>Swahili<br>Swedish</td><td style="white-space: nowrap;">Thai<br>Turkish<br>Ukrainian<br>Urdu<br>Vietnamese<br>Welsh<br>Yiddish</td></tr></tbody></table>

# Credits

 - Dylan Greene (dylang)
 - Translate Node module: https://github.com/Marak/translate.js
 - Google Translate

# Notes

 - If Google thinks you are abusing the system Tramp will autmatically wait a few minutes and then continue.
 - Comments, class names, ids, etc will not be translated.

## Message property format

    # Comments start with hashes
    # There are no block comments.

    # Blank lines are fine

    example=This is an example message that will get translated

    example.multiline=This example is so long that I decided to \
     make it go over multiple lines.  I didn't need to indent \
     these lines, I only did it to make it easier to read. \
     When this gets translated it will put on a single line.

    # HTML attributes will not be translated.
    example.html=<div class="brown cow">This is a brown cow</div>

    # String building is difficult to translate because context is lost
    example.variables=My name is {0} and I like to {1}.

## Traslated to French

    # Comments start with hashes
    # There are no block comments.

    # Blank lines are fine

    example=Ceci est un exemple de message qui se traduisent

    example.multiline=Cet exemple est si long que j&#39;ai décidé de la faire sur plusieurs lignes. Je na pas besoin de tiret ces lignes, je ne l&#39;ai fait pour le rendre plus facile à lire. Lorsque ce principe se traduit il sera mis sur une seule ligne.

    # HTML attributes will not be translated.
    example.html=<div class="brown cow"> Il s&#39;agit d&#39;une vache brune </div>

    # String building is difficult to translate because context is lost
    example.variables=Mon nom est {0} et je tiens à {1}.


# License

Copyright (C) 2011 by Dylan Greene

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
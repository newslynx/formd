Formd
===

Command-line utilty for turning a Google results spreadsheet into markdown.

## Installation

````
npm install -g formd
````

## Usage

````
formd path/to/survey-responses.csv
````

Or, if your spreadsheet has been set to "Publish to the web"

````
formd <google-spreadsheet-key>
````

That will create `responses.md` in the same directory as your input file, or if a Google key, the same directory as from where you're calling the command.


TODO, specify output file / output directory.
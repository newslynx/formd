#!/usr/bin/env node

var optimist = require('optimist'),
    path     = require('path'),
    io       = require('indian-ocean'),
    formd    = require('../src/index.js');

var argv = optimist.usage('Usage: $0')
    .options('h', {
      alias: 'help',
      describe: 'display this help text'
    })
    .check(function(argv) {
      if ( argv['help'] || !argv['_'].length ) throw '';
    })
    .argv;

function isLocalFile(inputPath){
  // If it returns a format, then it has a dot in the name and is a file
  if ( io.discernFormat(inputPath) ) return true;
  return false;
}

var input_path = argv['_'][0],
    is_google_form = true;

if ( isLocalFile(input_path) ) {
  input_path = path.resolve(input_path);
  is_google_form = false;
}

var output_path = path.dirname(input_path) + '/responses.md';
formd( input_path, output_path, is_google_form);
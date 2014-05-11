var fs = require('fs'),
		request = require('request'),
		dsv = require('dsv'),
		io = require('indian-ocean');


function fetchGoogleSpreadsheet(key, cb){
	request('https://docs.google.com/spreadsheet/pub?key='+key+'&output=csv', function(err, response, body){
		cb( err, dsv.csv.parse(body) )
	})
}
function fetchData(inputFilePath, isGoogleForm, cb){
	if (!isGoogleForm){
		// Read in data as json
		cb( io.readDataSync(inputFilePath) );
	} else {
		fetchGoogleSpreadsheet(inputFilePath, function(err, result){
			cb(result);
		});
	}
}

function convertToMarkdown(inputFilePath, outputFilePath, isGoogleForm){
	var markdown = '';
	fetchData(inputFilePath, isGoogleForm, function(results){
		// // Loop through each response
		results.forEach(function(question, i){
		// designating a new submission
		markdown += '## Submission ' + (i + 1) + '\n\n';
			// Loop through each question, printing the prompt and answer
			for (var prompt in question){
				var answer = question[prompt];
				markdown += '#### ' + prompt + '\n\n';
				markdown += '' + (answer) ? answer : 'NO RESPONSE.';
				markdown += '\n\n';
			}
		});
		fs.writeFileSync(outputFilePath, markdown);
		
	});
}

module.exports = convertToMarkdown;
const fs = require('node:fs');

const file = '4.1_1';

fs.readFile('dictionary.json', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const dictionary = JSON.parse(data);
  
  
	fs.readFile(file + '.txt', 'utf8', (err, fileText) => {
	  let expandedText = fileText;
	  
	  for(let i=0; i<dictionary['pairs'].length; i++) {
	  	let abbreviation = new RegExp('\\b' + dictionary['pairs'][i]['abbreviation'] + '\\b', 'g');
		let abbreviationPlural = new RegExp('\\b' + dictionary['pairs'][i]['abbreviation'] + 's\\b', 'g');
		let expanded = dictionary['pairs'][i]['expanded'];
		
	    expandedText = expandedText.replaceAll('(' + dictionary['pairs'][i]['abbreviation'] + ')', '');
		expandedText = expandedText.replaceAll('(' + dictionary['pairs'][i]['abbreviation'] + 's)', '');
		expandedText = expandedText.replaceAll(abbreviationPlural, expanded + 's');
		expandedText = expandedText.replaceAll(abbreviation, expanded);
	  }
	  
	  expandedText = expandedText.replaceAll('(s)', 's');
	  expandedText = expandedText.replaceAll('(forthcoming)', '');
	  expandedText = expandedText.replaceAll('(draft)', '');
	  expandedText = expandedText.replaceAll(' (e.g.,', ', for example ');
	  expandedText = expandedText.replaceAll(' (e.g. ', ', for example ');
	  expandedText = expandedText.replaceAll('(i.e.', '(for example');
	  
	  expandedText = expandedText.replaceAll('USD(A&S)', 'Under Secretary of Defense for Acquisition and Sustainment');
	  expandedText = expandedText.replaceAll('USD(R&E)', 'Under Secretary of Defense for Research and Engineering');
	  expandedText = expandedText.replaceAll('MIL-HDBK-', 'military handbook ');
	  
	  expandedText = expandedText.replaceAll('  ', ' ');
	  expandedText = expandedText.replaceAll('   ', ' ');
	  
	  expandedText = expandedText.replaceAll(' .', '.');
	  expandedText = expandedText.replaceAll(' ,', ',');
	  
		fs.writeFile(file + '.txt', expandedText, err => {
		  if (err) {
		    console.error(err);
		  } else {
		    console.log('complete\n\n');
			
			
			//finad two or more capital letters next to each other to detect abbreviations that may not be in dictionary yet
			const regexp = /[A-Z]{2,}/g;
			const matches = [...expandedText.matchAll(regexp)];
			
			for(let i=0; i<matches.length; i++) {
				console.log(matches[i][0]);
			}
		  }
		  
		  
		fs.writeFile(file + '_n.txt', '', err => {

		});
		  
		  
		});
	});
  
  
});




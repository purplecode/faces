var _ = require('lodash');

var polishCharacters = {
	'ą' : 'a',
	'ć' : 'c',
	'ę' : 'e',
	'ł' : 'l',
	'ń' : 'n',
	'ó' : 'o',
	'ś' : 's',
	'ż' : 'z',
	'ź' : 'z',
	'Ą' : 'A',
	'Ć' : 'C',
	'Ę' : 'E',
	'Ł' : 'L',
	'Ń' : 'N',
	'Ó' : 'O',
	'Ś' : 'S',
	'Ż' : 'Z',
	'Ź' : 'Z'
	};

exports.latinize = function(text){
	_.each(polishCharacters, function(character, equivalent) {
		text = text.replace(new RegExp(equivalent, 'g'), character);
	});
	return text;
};

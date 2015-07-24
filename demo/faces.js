db.faces.remove({});

var creatures = [
  'Maka Paka',
  'Igle Pigle',
  'Pinky Ponk',
  'Ninky Nonk',
  'Upsy Daisy'
];

creatures.forEach(function (creature) {
  db.faces.insert({
    "login": creature.toLowerCase().replace(/\s/g, ''),
    "id": creature.toLowerCase().replace(/\s/g, ''),
    "city": 'City of face (' + creature + ')',
    "address": "Night Garden",
    "forename": creature.split(' ')[0],
    "surname": creature.split(' ')[1],
    "fullname": creature,
    "mail": creature.toLowerCase().replace(/\s/g, '.') + '@nightgarden.com',
    "team": "British television series",
    "department": "BBC",
    "managerName": "Andrew Davenport",
    "managerLogin": "andrewdavenport",
    "title": "A creature",
    "phone": "+123456789",
    "photos": [
      creature.toLowerCase().replace(/\s/g, '-') + '.jpg'
    ]
  });
});

db.faces.createIndex({
  forename: "text",
  surname: "text",
  "login": "text",
  "mail": "text",
  "team": "text",
  "title": "text"
});

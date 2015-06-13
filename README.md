# Faces

Start recognizing people with whom you are working or studing with.

Application facilitates learning people's faces, combining their names and surnames with their photos.
It originates from the corporate environment, in which, after 3 years of working, 
I barely remembered some of my colleagues names.


## Installation

Prerequisites:
* node.js
* mongodb

Add the following sample data to `faces` database (can be changed in `app.js`)

```
db.faces.insert({ "forename" : "Maka", "surname" : "Paka", "photos" : [  "maka-paka.jpg" ]});
db.faces.insert({ "forename" : "Igle", "surname" : "Pigle", "photos" : [  "igi-pigiel.jpg" ]});
db.faces.insert({ "forename" : "Pinky", "surname" : "Ponk", "photos" : [  "pinky-ponk.jpg" ]});
db.faces.insert({ "forename" : "Ninky", "surname" : "Nonk", "photos" : [  "ninky-nonk.jpg" ]});
db.faces.insert({ "forename" : "Pontipines", "surname" : "", "photos" : [  "pontipines.jpg" ]});
db.faces.insert({ "forename" : "Wottingers", "surname" : "", "photos" : [  "wottingers.png" ]});
db.faces.insert({ "forename" : "Tombliboos", "surname" : "", "photos" : [  "tombliboos.jpg" ]});
db.faces.insert({ "forename" : "Upsy", "surname" : "Daisy", "photos" : [  "upsy-daisy.jpg" ]});

db.faces.createIndex({
  forename: "text",
  surname: "text",
  "login": "text",
  "mail": "text",
  "team": "text",
  "title": "text"
});
```

Run

```
node app.js
```

Open `http://localhost:3000` in your browser.

Enjoy!

## Screenshots

![](https://raw.github.com/purplecode/faces/master/doc/input.jpg)
**************************
![](https://raw.github.com/purplecode/faces/master/doc/texts.jpg)
**************************
![](https://raw.github.com/purplecode/faces/master/doc/pictures.jpg)
**************************



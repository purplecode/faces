# Faces

Start recognizing people with whom you are working or studing with.

Application facilitates learning people's faces, combining their names and surnames with their photos.
It originates from the corporate environment, in which, after 3 years of working, 
I barely remembered some of my colleagues names.


## Installation

Prerequisites:
* node.js
* mongodb

Run demo (creates `faces` database in mongodb)

```
jspm install
gulp less
demo.sh
```

Run demo using docker

```
docker-compose up
```

Run bundled production version:

```
jspm install
gulp less
gulp createBundle
PORT=3000 forever server/www
```

Open `http://localhost:3000` in your browser.

Enjoy!

## Screenshots

![](https://raw.github.com/purplecode/faces/master/demo/screen1.png)
**************************
![](https://raw.github.com/purplecode/faces/master/demo/screen2.png)
**************************
![](https://raw.github.com/purplecode/faces/master/demo/screen3.png)
**************************



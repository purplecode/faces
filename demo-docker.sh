#!/bin/sh

# install mongo shell
apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-3.0.list3
apt-get update
apt-get install -y mongodb

# fill the database
mongo --host $DB_1_PORT_27017_TCP_ADDR faces demo/faces.js

# copy the images
mkdir -p public/images/faces
cp demo/faces/*.jpg public/images/faces/

# install dependencies
npm install -g gulp
# it couses 'GitHub rate limit reached. To increase the limit use GitHub authentication' - moved to host
# npm install -g jspm
# jspm install
gulp less

# run server
PORT=3000 node server/www
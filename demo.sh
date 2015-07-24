#!/bin/sh

mongo faces demo/faces.js

mkdir -p public/images/faces

cp demo/faces/*.jpg public/images/faces/

PORT=3000 node server/www
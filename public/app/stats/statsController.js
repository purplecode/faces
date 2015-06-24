"use strict";
import _ from 'lodash';
import statsModule from './module';
import './styles.css!';

statsModule.controller('statsController', ($scope, Faces) => {

  Faces.getPopular().then((result) => {
    $scope.data = {
      data: {
        "cols": [
          {id: "t", label: "Name", type: "string"},
          {id: "s", label: "#wrong answers", type: "number"},
          {id: "s", label: "#correct answers", type: "number"}
        ],
        "rows": _.map(result, (entry) => {
          return {c:[{v:entry.face.fullname}, {v:entry.counts.wrong}, {v:entry.counts.correct}]}
        })
      },
      type: 'ColumnChart',
      options: {
        'title': 'Top most recognizable faces',
        "isStacked": "true",
        colors: ['#F44336', '#449D44']
      }
    }
  });


});

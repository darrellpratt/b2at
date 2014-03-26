'use strict';

// window.App.factory('ChangeRequest', function($resource) {
//   return $resource('/api/cr/:id', {
//     id: '@id'
//   }, {
//     update: {
//       method: 'PUT'
//     }
//   });
// });


window.App.factory('ChangeRequest', function($resource) {
  // var ChangeRequest;
  // ChangeRequest = $resource('/api/cr/:id', {
  //   id: '@id'
  // }, {
  //   update: {
  //     method: 'PUT'
  //   }
  // });
  //
  // return ChangeRequest;

  var ChangeRequest = $resource('/api/cr/:id', { id:'@id' });
  return ChangeRequest;

});

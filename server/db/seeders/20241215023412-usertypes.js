const usertypes = require ('../models/usertypes')
'use strict';

module.exports = {
  up: (models, mongoose) => {
   
      return models.usertypes.insertMany([
       {
        _id : "675e407e7a07dfcc53a032dc",
        usertypes : "Admin"
       },
       {
        _id : "675e408f7a07dfcc53a032dd",
        usertypes : "Users"
       },

       
      ]).then(res => {
      // Prints "1"
      console.log(res.insertedCount);
    });
   
  },

  down: (models, mongoose) => {
    
      return models.usertypes.deleteMany({
        _id :{
          $in :[
            "675e407e7a07dfcc53a032dc",
            "675e408f7a07dfcc53a032dd",


          ]
        }
      }).then(res => {
      // Prints "1"
      console.log(res.deletedCount);
      });
  }
};
require('dotenv').config();
const mongoose = require('mongoose');
const myApp = require("./myApp.js");


//MongoDB Connection \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
console.log('MONGO_URI from .env: ', process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.on('connected', () => console.log('Connected to MongoDB!'));
mongoose.connection.on('error', (err) => console.error('Connection error:', err));



// Test createAndSavePerson \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
// myApp.createAndSavePerson((err, data) => {
//   if (err) {
//     console.error("createAndSave Error:", err);
//     return;
//   }
//   console.log("Saved Person:", data);
// });


// Test createManyPeople \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
// myApp.createManyPeople(null, (err, data) => {
//   if (err) {
//     console.error("createManyPeople Error:", err);
//     return;
//   }
//   console.log("Saved Person:", data);
// });


// Test removeManyPeople \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

myApp.removeManyPeople((err, data) => {
  if (err) {
    console.error("removeManyPeople Error:", err);
    return;
  }
  console.log("Saved Person:", data);
});
 
// removeManyPeople adjusted to receive an array \\\\\\\\\\\\\\\\\\\
// const peopleToRemove = [
//     {name: "Joe Blow"},
//     {name: "Jane Doe"},
//     {name: "Interesting Man"}
// ];

// myApp.removeManyPeople(peopleToRemove, (err, data) => {
//   if (err) {
//     console.error("removeManyPeople Error:", err);
//     return;
//   }
//   console.log("Saved Person:", data);
// });
require('dotenv').config();
const mongoose = require('mongoose');


//MongoDB Connection \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
console.log('MONGO_URI from .env: ', process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://0077rjack_db:Cluster0_54321@cluster0.voojxmz.mongodb.net/Test?retryWrites=true&w=majority&appName=Cluster0', {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.on('connected', () => console.log('Connected to MongoDB!'));
mongoose.connection.on('error', (err) => console.error('Connection error:', err));
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

// Create a Model (personSchema then Person = mongoose.model) \\\\
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods: [String]
});

let Person = mongoose.model('Person', personSchema);
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

// Create and Save a Record of a Model \\\\\\\\\\\\\\\\\\\
const createAndSavePerson = (done) => {
  const person = new Person(
    {
      name: "Joe Cool",
      age: 60,
      favoriteFoods: ["Lasagne"]
    }
  );
  person.save((err, data) => {
    if(err) return done(err);
    done(null, data);
  })
  
};
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

// Create Many Records with model.create() \\\\\\\\\\\\\\\\
const arrayOfPeople = [
  {
    name: "Joe Blow",
    age: 35,
    favoriteFoods: ["Hot dogs", "Cheetos"]
  },
  {
    name: "Jane Doe",
    age: 22,
    favoriteFoods: ["Cereal"]
  },
  {
    name: "Interesting Man",
    age: 50,
    favoriteFoods: ["Modelo", "Tequila"]
  }
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if(err) return done(err);
    done(null, data);
  });
};
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

// Use Model.find() to Search Your Database \\\\\\\\\\\\\\
function personName () {
Person.find({name: "Jane Doe"})
};
const findPeopleByName = (personName, done) => {
  done(null /*, data*/);
};
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

// const findOneByFood = (food, done) => {
//   done(null /*, data*/);
// };

// const findPersonById = (personId, done) => {
//   done(null /*, data*/);
// };

// const findEditThenSave = (personId, done) => {
//   const foodToAdd = "hamburger";

//   done(null /*, data*/);
// };

// const findAndUpdate = (personName, done) => {
//   const ageToSet = 20;

//   done(null /*, data*/);
// };

// const removeById = (personId, done) => {
//   done(null /*, data*/);
// };

// const removeManyPeople = (done) => {
//   const nameToRemove = "Mary";

//   done(null /*, data*/);
// };

// const queryChain = (done) => {
//   const foodToSearch = "burrito";

//   done(null /*, data*/);
// };


/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
// exports.findOneByFood = findOneByFood;
// exports.findPersonById = findPersonById;
// exports.findEditThenSave = findEditThenSave;
// exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
// exports.removeById = removeById;
// exports.removeManyPeople = removeManyPeople;
// exports.queryChain = queryChain;

require('dotenv').config();
const mongoose = require('mongoose');


//MongoDB Connection \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
console.log('MONGO_URI from .env: ', process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.on('connected', () => console.log('Connected to MongoDB!'));
mongoose.connection.on('error', (err) => console.error('Connection error:', err));
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
// Create a Model (personSchema then Person = mongoose.model)

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
// Create and Save a Record of a Model

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
// Create Many Records with model.create()

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

const createManyPeople = (peopleArray, done) => {
  const dataToSave = peopleArray || arrayOfPeople;
  Person.create(dataToSave, (err, data) => {
    if(err) return done(err);
    done(null, data);
  });
};

//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
// Use Model.find() to Search Your Database

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (err, data) => {
    if(err) return done(err);
    done(null, data);
  });
};
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
// Use model.findOne() to Return a Single Matching Document from Your Database

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
// Use model.findById() to Search Your Database By _id

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    if(err) return done(err);
    done(null, data);
  })
  
};
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
// Perform Classic Updates by Running Find, Edit, then Save

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, person) => {
    if(err) return done(new Error(`findById failed: ${err.message}`));
    if(!person) return done(new Error(`Person not found`));

    person.favoriteFoods.push(foodToAdd);

    person.save((err, updatedPerson) => {
      if(err) return done(new Error(`Save failed: ${err.message}`));
      done(null, updatedPerson);
    });
  });
};
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//Perform New Updates on a Document Using model.findOneAndUpdate()

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, updatedPerson) => {
    if(err) return done(err);
    if(!updatedPerson) return done(new Error(`Person not found ${err.message}`));
    done(null, updatedPerson);
  });
};
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
// Delete One Document Using model.findByIdAndRemove

const removeById = (personId, done) => {
  Person.findOneAndRemove({_id: personId}, (err, deletedPerson) => {//findOneAndRemove is deprecated, replaced by findOneAndDelete
    if(err) return done(err);
    done(null, deletedPerson);
  })
};
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
// Delete Many Documents with model.remove()

const removeManyPeople = (done) => {
  const nameToRemove = "Mario";
  Person.remove({name: nameToRemove}, (err, peopleRemoved) => {
    if(err) return done(err);
    if(!peopleRemoved) done(new Error(`Name not found`));
    done(null, peopleRemoved);
  })
};

// removeManyPeople adjusted to receive an array \\\\\\\\\\\\\\\\
// const removeManyPeople = (arr, done) => {
//   const names = arr ? arr.map(person => person.name) : [];
//   Person.remove({ name: {$in: names} }, (err, peopleRemoved) => {
//     if(err) return done(err);
//     if(!peopleRemoved) done(new Error(`Name not found`));
//     done(null, peopleRemoved);
//   })
// };

//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
// Chain Search Query Helpers to Narrow Search Results

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person
  .find({favoriteFoods: foodToSearch})
  .sort("name")
  .limit(2)
  .select("-age")
  .exec((err, data) => {
    if(err) return done(err);
    done(null, data);
  })
  
};


/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findEdit = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;



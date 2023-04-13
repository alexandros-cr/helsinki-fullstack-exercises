import { useState, useEffect } from "react";

import Person from "./Person";
import InputNumber from "./InputNumber";
import personsService from './services/persons';

function SearchFilter ({ searchStr, setSearchStr}) {
  return (
    <div>
      Filter shown with <input
      value={searchStr}
      onChange={(event) => setSearchStr(event.target.value)}
      />
    </div>
  )
};

function AddPerson({persons, setPersons, newName, setNewName, newNumber, setNewNumber}) {
  const submitHandler = (event) => {
    event.preventDefault();
    
    const duplicate = persons.find(person => person.name === newName);
    
    if(duplicate) {
      alert(`${newName} already exists in the phonebook`);
      return;
    }

    const newPerson = { 
      name: newName,
      number: newNumber
    };

    personsService
      .addEntry(newPerson)
      .then(response => {
        setPersons(persons.concat(response));
        setNewName('');
        setNewNumber('');
      });
  };
  return (
    <form onSubmit={submitHandler}>
      <InputNumber label={'name'} newAttribute={newName} setNewAttribute={setNewName}/>
      <InputNumber label={'number'} newAttribute={newNumber} setNewAttribute={setNewNumber}/>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

function Persons({ persons, setPersons, searchStr }) {
  let regex = new RegExp(searchStr.toLowerCase());
  let filteredPersons = searchStr ? 
    persons.filter(person => regex.test(person.name.toLowerCase()))
    : persons;
  
  const generateDelHandler = (person) => {
    const id = person.id;
    const deleteHandler = () => {
      personsService
      .deleteEntry(id)
      .then(response => {
        personsService
          .getAll()
          .then(response => setPersons(response))
      });
    }
    return deleteHandler;
  };
  
  return (
    <div>
      {filteredPersons.map(person => <Person key={person.name} person={person}  deleteHandler={generateDelHandler(person)}/>)}
    </div>
  );
}

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchStr, setSearchStr] = useState('');

  useEffect(() => {
    personsService
      .getAll()
      .then(response => setPersons(response));
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchFilter searchStr={searchStr} setSearchStr={setSearchStr} />
      <h2>Add an Entry:</h2>
      <AddPerson persons={persons} setPersons={setPersons} 
                 newName={newName} setNewName={setNewName} 
                 newNumber={newNumber} setNewNumber={setNewNumber} 
      />
      <h2>Numbers</h2>
      <Persons persons={persons} searchStr={searchStr} setPersons={setPersons}/>
    </div>
  );
}

export default App;

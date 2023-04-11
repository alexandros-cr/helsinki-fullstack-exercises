import { useState } from "react";

import Person from "./Person";
import InputNumber from "./InputNumber";

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
    
    if(duplicate) alert(`${newName} already exists in the phonebook`);
    else {
      const newPerson = { 
        name: newName,
        number: newNumber
       };
      setPersons(persons.concat(newPerson));
    }
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

function Persons({ persons, searchStr }) {
  let regex = new RegExp(searchStr.toLowerCase());
  let filteredPersons = searchStr ? 
    persons.filter(person => regex.test(person.name.toLowerCase()))
    : persons;
  return (
    <div>
      {filteredPersons.map(person => <Person key={person.name} person={person} />)}
    </div>
  );
}

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchStr, setSearchStr] = useState('');

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
      <Persons persons={persons} searchStr={searchStr} />
    </div>
  );
}

export default App;

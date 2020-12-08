import React, { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import PersonList from "./components/PersonList";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([{ name: "loading", number: "data" }]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [regex, setRegex] = useState(new RegExp("", "i"));

  useEffect(() => {
    personService.getAll().then((personArray) => {
      setPersons(personArray);
    });
  }, []);

  const handleChangeName = (event) => {
    setNewName(event.target.value);
  };
  const handleChangeNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const findPerson = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );
    console.log(findPerson);
    if (findPerson !== undefined) {
      const confirmation = window.confirm(
        `${newName} is already added to phonebook replace the old number wit a new one?`
      );
      if (confirmation) {
        const updatedPerson = { ...findPerson, number: newNumber };
        personService
          .updatePerson(updatedPerson)
          .then((updatedPersonServer) => {
            setPersons(
              persons.map((person) =>
                person === findPerson ? updatedPersonServer : person
              )
            );
          });
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };
      personService.create(personObject).then((createdPerson) => {
        setPersons([...persons, createdPerson]);
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const handleDelete = (name, id) => {
    const confirmation = window.confirm(`Delete ${name}?`);
    if (confirmation) {
      personService.deletePerson(id);
      setPersons(persons.filter((person) => person.id !== id));
    }
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter setRegex={setRegex} />
      <h2>add a new</h2>
      <PersonForm
        handleSubmit={handleSubmit}
        handleChangeName={handleChangeName}
        handleChangeNumber={handleChangeNumber}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <PersonList persons={persons} regex={regex} deletePerson={handleDelete} />
    </div>
  );
};

export default App;

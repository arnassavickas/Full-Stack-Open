import React, { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import PersonList from "./components/PersonList";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([{ name: "loading", number: "data" }]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [regex, setRegex] = useState(new RegExp("", "i"));
  const [notification, setNotification] = useState({ text: null, color: null });

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
        setNotification({
          text: `${createdPerson.name} was added`,
          color: "green",
        });
        setPersons([...persons, createdPerson]);
        setNewName("");
        setNewNumber("");
      });
      setTimeout(() => {
        setNotification({ text: null, color: null });
      }, 4000);
    }
  };

  const handleDelete = (name, id) => {
    const confirmation = window.confirm(`Delete ${name}?`);
    if (confirmation) {
      personService
        .deletePerson(id)
        .then((response) => {
          setNotification({
            text: `${name} was successfully removed from the server`,
            color: "green",
          });
        })
        .catch((error) => {
          setNotification({
            text: `Information of ${name} has already been removed from the server`,
            color: "red",
          });
        });
      setTimeout(() => {
        setNotification({ text: null, color: null });
      }, 4000);
      setPersons(persons.filter((person) => person.id !== id));

      console.log("here");
    }
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification notification={notification} />
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

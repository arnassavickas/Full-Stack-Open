import React from "react";
import Person from "./Person";

const PersonList = ({ persons, regex, deletePerson }) => {
  const filteredList = persons.filter((person) => {
    return regex.test(person.name);
  });

  return (
    <table>
      <tbody>
        {filteredList.map((person) => (
          <Person key={person.name} person={person} deletePerson={deletePerson} />
        ))}
      </tbody>
    </table>
  );
};

export default PersonList;

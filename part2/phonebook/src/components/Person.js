import React from "react";

const Person = ({ person, deletePerson }) => {
  return (
    <tr key={person.name}>
      <td>{person.name}</td>
      <td>{person.number}</td>
      <td>
        <button onClick={() => deletePerson(person.name, person.id)}>delete</button>
      </td>
    </tr>
  );
};

export default Person;

import React from "react";

const Country = ({ country, clickHandlerShow, index }) => {
  return (
    <tr key={country.name}>
      <td>{country.name}</td>
      <td>
        <button onClick={() => clickHandlerShow(index)}>show</button>
      </td>
    </tr>
  );
};

export default Country;

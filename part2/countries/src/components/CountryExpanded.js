import React from "react";
import Weather from "./Weather"

const CountryExpanded = ({ country }) => {
  return (
    <div>
      <h2>{country.name}</h2>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h3>languages</h3>
      <ul>
        {country.languages.map((language) => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>
      <img src={country.flag} style={{ width: 200 }} alt="flag" />
      <Weather country={country} />
    </div>
  );
};

export default CountryExpanded;

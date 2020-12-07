import React from "react";
import Country from "./Country";
import CountryExpanded from "./CountryExpanded";

const CountriesList = ({ countries, regex, show, setShow }) => {
  const filteredList = countries.filter((country) => {
    return regex.test(country.name);
  });

  const clickHandlerShow = (index) => {
    setShow(index)
  };

  if (show !== -1) {
    return <CountryExpanded country={filteredList[show]} />
  }

  if (filteredList.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  } else if (filteredList.length === 1) {
    return <CountryExpanded country={filteredList[0]} />;
  }

  return (
    <table>
      <tbody>
        {filteredList.map((country, index) => (
          <Country
            key={country.name}
            country={country}
            clickHandlerShow={clickHandlerShow}
            index={index}
          />
        ))}
      </tbody>
    </table>
  );
};

export default CountriesList;

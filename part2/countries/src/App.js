import React, { useEffect, useState } from "react";
import Filter from "./components/Filter";
import CountriesList from "./components/CountriesList";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [regex, setRegex] = useState(new RegExp("", "i"));
  const [show, setShow] = useState(-1);

  useEffect(() => {
    console.log("effect");
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      console.log("promise fulfilled");
      setCountries(response.data);
    });
  }, []);

  return (
    <div>
      <Filter setRegex={setRegex} setShow={setShow} />
      <CountriesList
        countries={countries}
        regex={regex}
        setShow={setShow}
        show={show}
      />
    </div>
  );
};

export default App;

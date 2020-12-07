import React from "react";

const Filter = ({ setRegex, setShow }) => {
  const handleChangeFilter = (event) => {
    setRegex(new RegExp(event.target.value, "i"));
    setShow(-1);
  };

  return (
    <div>
      find countries <input onChange={handleChangeFilter} />
    </div>
  );
};

export default Filter;

import React from "react";

const Filter = ({ setRegex }) => {
  const handleChangeFilter = (event) => {
    setRegex(new RegExp(event.target.value, 'i'));
  };

  return (
    <div>
      filter shown with <input onChange={handleChangeFilter} />
    </div>
  );
};

export default Filter;

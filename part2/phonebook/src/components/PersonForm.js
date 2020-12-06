import React from "react";

const PersonForm = ({
  handleSubmit,
  handleChangeName,
  handleChangeNumber,
  newName,
  newNumber,
}) => (
  <form onSubmit={handleSubmit}>
    <div>
      name: <input onChange={handleChangeName} value={newName} />
    </div>
    <div>
      number: <input onChange={handleChangeNumber} value={newNumber} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

export default PersonForm;

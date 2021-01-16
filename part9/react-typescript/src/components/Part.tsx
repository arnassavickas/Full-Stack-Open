import React from 'react';

interface PartProps {
  name: string;
  exerciseCount: number;
}

const Part: React.FC<PartProps> = (props) => {
  return (
    <p>
      {props.name} {props.exerciseCount}
    </p>
  );
};

export default Part;

import React from 'react';

interface TotalProps {
  courseParts: CourseParts[];
}

interface CourseParts {
  name: string;
  exerciseCount: number;
}

const Total: React.FC<TotalProps> = (props) => {
  return (
    <p>
      Number of exercises{' '}
      {props.courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  );
};

export default Total;

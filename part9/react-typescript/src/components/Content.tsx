import React from 'react';
import Part from './Part';

interface ContentProps {
  courseParts: CoursePart[];
}

/* interface CourseParts {
  name: string;
  exerciseCount: number;
} */

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescription extends CoursePartBase {
  description: string;
}

interface CoursePartOne extends CoursePartDescription {
  name: 'Fundamentals';
}

interface CoursePartTwo extends CoursePartBase {
  name: 'Using props to pass data';
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartDescription {
  name: 'Deeper type usage';
  exerciseSubmissionLink: string;
}

interface CoursePartFour extends CoursePartDescription {
  name: 'A note about defining object types';
}

type CoursePart =
  | CoursePartOne
  | CoursePartTwo
  | CoursePartThree
  | CoursePartFour;

const Content: React.FC<ContentProps> = (props) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `unhandles discriminated union member: ${JSON.stringify(value)}`
    );
  };

  props.courseParts.forEach((part) => {
    switch (part.name) {
      case 'Fundamentals':
        break;
      case 'Using props to pass data':
        break;
      case 'Deeper type usage':
        break;
      case 'A note about defining object types':
        break;
      default:
        return assertNever(part);
    }
  });

  return (
    <div>
      {props.courseParts.map((course) => (
        <Part
          key={course.name}
          name={course.name}
          exerciseCount={course.exerciseCount}
        />
      ))}
    </div>
  );
};

export default Content;

import React from "react";


const Course = ({ course }) => (
  <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
);

const Header = (props) => <h2>{props.course}</h2>;

const Part = (props) => (
  <p>
    {props.part} {props.exercises}
  </p>
);

const Content = (props) => (
  <div>
    {props.parts.map((el) => (
      <Part part={el.name} exercises={el.exercises} key={el.id} />
    ))}
  </div>
);

const Total = (props) => {
  const quantity = props.parts.reduce((total, num) => total + num.exercises, 0);
  return <b>total of {quantity} exercises</b>;
};

export default Course

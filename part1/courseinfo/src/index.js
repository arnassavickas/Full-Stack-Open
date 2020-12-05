import React from "react";
import ReactDOM from "react-dom";

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  );
};

const Content = (props) => {
  const parts = props.parts.map((el) => {
    return <Part part={el.name} exercises={el.exercises} />;
  });
  return <div>{parts}</div>;
};

const Total = (props) => {
  const quantity = props.parts.reduce((total, num) => total + num.exercises, 0);
  return <p>Number of exercises {quantity}</p>;
};

ReactDOM.render(<App />, document.getElementById("root"));

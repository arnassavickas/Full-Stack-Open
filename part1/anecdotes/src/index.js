import "react-hot-loader";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { hot } from "react-hot-loader/root";

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(anecdotes.map((el) => 0));
  const [highest, setHighest] = useState(-1);

  const nextAnecdote = () => {
    let random;
    //do..while prevents showing the same anecdote after a button click
    do {
      random = Math.floor(Math.random() * anecdotes.length);
    } while (selected === random);
    setSelected(random);
  };

  const vote = () => {
    const copy = [...points];
    copy[selected] += 1;
    setPoints(copy);
    const highestIndex = points.indexOf(Math.max(...points));
    console.log(highestIndex);
    setHighest(highestIndex);
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[selected]}</div>
      <div>has {points[selected]} votes</div>
      <button onClick={vote}>vote</button>
      <button onClick={nextAnecdote}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      {/* starts showing anecdote only when firt vote arrives*/}
      <div>
        {highest === -1 ? "no top voded anecdotes yet" : anecdotes[highest]}
      </div>
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

export default hot(App);

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));

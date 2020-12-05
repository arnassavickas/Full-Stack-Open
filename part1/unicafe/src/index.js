import "react-hot-loader";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { hot } from "react-hot-loader/root";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const goodFeedback = () => {
    setGood(good + 1);
  };
  const neutralFeedback = () => {
    setNeutral(neutral + 1);
  };
  const badFeedback = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={goodFeedback} value={"good"} />
      <Button handleClick={neutralFeedback} value={"neutral"} />
      <Button handleClick={badFeedback} value={"bad"} />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

const Button = ({ handleClick, value }) => {
  return <button onClick={handleClick}>{value}</button>;
};

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = (good - bad) / total;

  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <div>No feedback given</div>
      </div>
    );
  }

  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <Statistic text={"good"} value={good} />
          <Statistic text={"neutral"} value={neutral} />
          <Statistic text={"bad"} value={bad} />
          <Statistic text={"total"} value={total} />
          <Statistic
            text={"average"}
            value={Number.parseFloat(average).toFixed(1)}
          />
          <Statistic
            text={"positive"}
            value={Number.parseFloat((good * 100) / total).toFixed(1) + " %"}
          />
        </tbody>
      </table>
    </div>
  );
};

const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

export default hot(App);

ReactDOM.render(<App />, document.getElementById("root"));

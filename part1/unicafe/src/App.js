import { useState } from 'react';

const Button = ({clickHandler, text}) => (<button onClick={clickHandler}>{text}</button>);

const StatisticLine = ({label, stat}) => {
    return (
        <tr>
            <td>{label}:</td>
            <td>{stat}</td>
        </tr>
    );
};

const Stats = ({good, neutral, bad}) => {
    let total = good + neutral + bad;

    const average = () => total ? (good - bad) / total : 0;
    const percentGood = () => total ? good / total * 100 : 0;
    
    if(!total) return;

    return (
        <>
            <h1>Statistics</h1>
            <table>
              <tbody>
                    <StatisticLine label={'Good'} stat={good} />
                    <StatisticLine label={'Neutral'} stat={neutral} />
                    <StatisticLine label={'Bad'} stat={bad} />
                    <StatisticLine label={'All'} stat={total} />
                    <StatisticLine label={'Average'} stat={average()} />
                    <StatisticLine label={'Positive'} stat={percentGood() + '%'} />
                </tbody>
            </table>
        </>
    );
};
 
const App = () => {
    const [good, setGood] = useState(0);
    const [bad, setBad] = useState(0);
    const [neutral, setNeutral] = useState(0);

    const handlerFactory = (setter, feedback) => () => setter(feedback + 1);

    return (
        <div>
            <h1>Give Feedback</h1>
            <Button clickHandler={handlerFactory(setGood, good)} text={'good'} />
            <Button clickHandler={handlerFactory(setBad, bad)} text={'bad'} />
            <Button clickHandler={handlerFactory(setNeutral, neutral)} text={'neutral'} />
            <Stats good={good} neutral={neutral} bad={bad} />
        </div>
    );
};

export default App;

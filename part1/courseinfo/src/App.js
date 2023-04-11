const Header = (props) => {
    return (
        <h1>{props.title}</h1>
    );
};

const Total = (props) => {
    let total = 0;
    for (let i = 0; i < props.course.parts.length; i++) {
        total += props.course.parts[i].exercises;
    }
    return (
        <p>Number of Exercises: {total}</p>
    );
};

const Line = (props) => {
    const line = props.line;
    return (
        <p>{line.name}: {line.exercises}</p>
    );
};

const Content = (props) => {
    const parts = props.parts;
    return (
        <>
        <Line line={parts[0]} />
        <Line line={parts[1]} />
        <Line line={parts[2]} />
        </>
    );
};

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            { 
                name: 'Fundamentals of React',
                exercises: 10, 
            },
            { 
                name: 'Using props to pass data',
                exercises: 7, 
            },
            { 
                name: 'State of a component',
                exercises: 14, 
            }
        ]
    };

    return (
        <>
            <Header title={course.name} />
            <Content parts={course.parts} />
            <Total course={course} /> 
        </>
    );
};

export default App;

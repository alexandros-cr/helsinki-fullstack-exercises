const Header = (props) => {
    return (
        <h1>{props.title}</h1>
    );
};

const Total = ({ course }) => {
    const total = course.parts.reduce((accum, curr) => accum + curr.exercises, 0); 
    return (
        <p><b>Total of {total} Exercises</b></p>
    );
};

const Part = ({ part }) => <>{part.name}: {part.exercises}</>;

const Content = ({ parts }) => <ul>{parts.map(part => <li key={part.id}><Part part={part} /></li>)}</ul>;

const Course = ({ course }) => {
    return (
        <>
            <Header title={course.name} />
            <Content parts={course.parts} />
            <Total course={course} /> 
        </>
    );
};
    
const App = () => {
    const courses = [{
        name: 'Half Stack application development',
        id: 1,
        parts: [
            { 
                name: 'Fundamentals of React',
                exercises: 10, 
                id: 1,
            },
            { 
                name: 'Using props to pass data',
                exercises: 7, 
                id: 2,
            },
            { 
                name: 'State of a component',
                exercises: 14, 
                id: 3,
            }
        ]
    }];
    return <ul>{courses.map((course) => <li key={course.id}><Course course={course} /></li>)}</ul>;
};

export default App;

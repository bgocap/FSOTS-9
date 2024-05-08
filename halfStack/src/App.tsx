import './App.css'

interface HeaderProps {
  title:string;
}

interface ContentProps {
  allParts:Array<{name:string,exerciseCount:number}>;
}
interface TotalProps {
  totalExercises: number;
}
const Header = (props:HeaderProps) =>{
  return <h1>{props.title}</h1>;
}

const Content = (props:ContentProps) =>{
  return (
    <>
      {props.allParts.map((item)=><p key={item.name}>{item.name} {item.exerciseCount}</p>)}
    </>
  )
}

const Total = (props:TotalProps) =>{
  return <p> Number of exercises {props.totalExercises}</p>
}

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <div>
      <Header title={courseName}/>
      <Content allParts = {courseParts}/>
      <Total totalExercises={totalExercises}/>
    </div>
  );
};

export default App

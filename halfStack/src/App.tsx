import './App.css'

interface HeaderProps {
  title:string;
}

interface ContentProps {
  allParts:Array<CoursePart>;
}
interface TotalProps {
  totalExercises: number;
}

interface CoursePartBase{
  name: string;
  exerciseCount: number;
}

interface description extends CoursePartBase{
  description: string;
}

interface CoursePartSpecial extends CoursePartBase, description {
  requirements: Array<string>;
  kind:"special"
}

interface CoursePartBasic extends CoursePartBase, description {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartBase, description {
  backgroundMaterial: string;
  kind: "background"
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is an awesome course part",
    kind: "basic"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3,
    kind: "group"
  },
  {
    name: "Basics of type Narrowing",
    exerciseCount: 7,
    description: "How to go from unknown to string",
    kind: "basic"
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
    kind: "background"
  },
  {
    name: "TypeScript in frontend",
    exerciseCount: 10,
    description: "a hard part",
    kind: "basic",
  },
  {
    name: "Backend development",
    exerciseCount: 21,
    description: "Typing the backend",
    requirements: ["nodejs", "jest"],
    kind: "special"
  }
];

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Header = (props:HeaderProps) =>{
  return <h1>{props.title}</h1>;
}

const Content = (props:ContentProps) =>{
  return (
    <>
      {props.allParts.map((item)=><Part key={item.name} part={item}/>)}
    </>
  )
}

const Total = (props: TotalProps) =>{
  return <p> Number of exercises {props.totalExercises}</p>
}

const Part = ( {part} : {part:CoursePart})=>{
  switch (part.kind){
    case "basic":
      return (<><h2>{part.name} {part.exerciseCount}</h2><p>{part.description}</p></>)
    case "group":
      return (<><h2>{part.name} {part.exerciseCount}</h2><p> project exercises: {part.groupProjectCount}</p></>)
    case "background":
      return (<><h2>{part.name} {part.exerciseCount}</h2><p>{part.description} <br></br> background material: {part.backgroundMaterial}</p></>)
    case "special":
      return (<><h2>{part.name} {part.exerciseCount}</h2><p>{part.description} <br/> required skills: {part.requirements.reduce((string,item)=>string.concat(item,", "),"")}</p></>)
    default : 
    return assertNever(part)
  
  }
}

const App = () => {
  const courseName = "Half Stack application development";

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

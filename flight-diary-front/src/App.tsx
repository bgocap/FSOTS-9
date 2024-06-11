import { useEffect, useState } from 'react'
import './App.css'
import diaryService from "./services/diaries"
import { DiaryEntry, Weather, Visibility } from './types';

function App() {
  const [date,setDate] = useState("")
  const [weather,setWeather] = useState("")
  const [visibility,setVisibility] = useState("")
  const [comment,setComment] = useState("")
  const [diaryEntries, setEntries] = useState<DiaryEntry[]>([]);

/*   const diaryCreation = async (newBlog: DiaryEntryFormValues)  => {
    const data = await diaryService.create(newBlog);
    const updatedEntries = diaryEntries.concat(data)
    setEntries(updatedEntries);
  }; */
  const submitEntry = async( event : React.SyntheticEvent)=>{
    event.preventDefault();
    const obj = {
      date: date,
      weather: weather as Weather,
      visibility: visibility as Visibility,
      comment:comment,
    };
    const newEntry = await diaryService.create(obj);
    setEntries(diaryEntries.concat(newEntry))
    setDate("");
    setComment("");
    setWeather("");
    setVisibility("");
  }

  useEffect(() => {
    const fetchDiaries = async () => {
      const entries = await diaryService.getAll();
      setEntries(entries);
    };
    void fetchDiaries();
  }, []);

  return (
    <>
    {/* <NewEntryForm submitEntryHandler={diaryCreation}/> */}
    <form onSubmit={(event)=>submitEntry(event)}>
        <label htmlFor="input">Date: </label>
        <input id="date" type="text"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
        <label htmlFor="input">Weather: </label>
        <input id="weather" type="text"
          value={weather}
          onChange={(event) => setWeather(event.target.value)}
        />
        <label htmlFor="input">Visibility: </label>
        <input id="date" type="text"
          value={visibility}
          onChange={(event) => setVisibility(event.target.value)}
        />
        <label htmlFor="input">Comment: </label>
        <input id="comment" type="text"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />
        <button type="submit">Create</button>
    </form>
    {diaryEntries.map((item)=>(
      <div key={item.id}>
        <h2>{item.date}</h2>
        <p>Visibility :{item.visibility}</p>
        <p>Weather :{item.weather}</p>
        {item.comment && <p>Comment: {item.comment}</p>}
        
      </div>
    ))}
    </>
  )
}

export default App

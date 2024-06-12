import { useEffect, useState } from 'react'
import axios from 'axios';
import './App.css'
import diaryService from "./services/diaries"
import { DiaryEntry, Weather, Visibility } from './types';

function App() {
  const [date,setDate] = useState("")
  const [weather,setWeather] = useState("")
  const [visibility,setVisibility] = useState("")
  const [comment,setComment] = useState("")
  const [diaryEntries, setEntries] = useState<DiaryEntry[]>([]);
  const [error, setError] = useState<string | null>(null);

  const submitEntry = async( event : React.SyntheticEvent)=>{
    event.preventDefault();
    const obj = {
      date: date,
      weather: weather as Weather,
      visibility: visibility as Visibility,
      comment:comment,
    };

    try {
      const newEntry = await diaryService.create(obj);
      setEntries(diaryEntries.concat(newEntry));
      setDate("");
      setComment("");
      setWeather("");
      setVisibility("");
      setError(null);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log("error status:",err.response?.status);
        setError(`${err.response?.data}`);
        setTimeout(() => {setError(null);}, 5000);
      } else {
        setError(`Unexpected error: ${err}`);
        setTimeout(() => {setError(null);}, 5000);
      }
    }
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
    <h2>Create Entries</h2>
    {error && <p style={{ color: 'red'}}>{error}</p>}
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
    <h2>Diary Entries</h2>
    {diaryEntries.map((item)=>(
      <div key={item.id}>
        <h3>{item.date}</h3>
        <p>Visibility :{item.visibility}</p>
        <p>Weather :{item.weather}</p>
        {item.comment && <p>Comment: {item.comment}</p>}
        
      </div>
    ))}
    </>
  )
}

export default App

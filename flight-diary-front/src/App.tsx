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

      <div>
      <label htmlFor="date">Date:</label>
      <input type="date" id="date" onChange={(event) => setDate(event.target.value)} value={date} />
      </div>
      
      <div> 
        Weather : 
        <input type="radio" id="Sunny" name="Sunny" onChange={() => setWeather('sunny')} checked={"sunny"===weather} />
        <label htmlFor="Sunny">Sunny</label>

        <input type="radio" id="Rainy" name="Rainy" onChange={() => setWeather('rainy')} checked={"rainy"===weather} />
        <label htmlFor="Rainy">Rainy</label>

        <input type="radio" id="Cloudy" name="Cloudy" onChange={() => setWeather('cloudy')} checked={"cloudy"===weather} />
        <label htmlFor="Cloudy">Cloudy</label>

        <input type="radio" id="Stormy" name="Stormy" onChange={() => setWeather('stormy')} checked={"stormy"===weather} />
        <label htmlFor="Stormy">Stormy</label>

        <input type="radio" id="Windy" name="Windy" onChange={() => setWeather('windy')} checked={"windy"===weather} />
        <label htmlFor="Windy">Windy</label>
      </div>
      
      <div>

        Visibility: 
        <input type="radio" id="Great" name="Great" onChange={() => setVisibility('great')} checked={"great"===visibility} />
        <label htmlFor="Great">Great</label>

        <input type="radio" id="Good" name="Good" onChange={() => setVisibility('good')} checked={"good"===visibility}  />
        <label htmlFor="Good">Good</label>

        <input type="radio" id="Ok" name="Ok" onChange={() => setVisibility('ok')} checked={"ok"===visibility} />
        <label htmlFor="Ok">Ok</label>

        <input type="radio" id="Poor" name="Poor" onChange={() => setVisibility('poor')} checked={"poor"===visibility}/>
        <label htmlFor="Poor">Poor</label>

      </div>
      
      <div>
      <label htmlFor="input">Comment: </label>
        <input id="comment" type="text"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />
      </div>
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

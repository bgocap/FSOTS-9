//import {  DiaryEntryFormValues, Weather } from '../types';
import { useState } from "react";

const NewEntryForm = ({submitEntryHandler}) =>{

    //const [newDiaryEntry, setnewDiaryEntry] = useState<DiaryEntryFormValues[]>([]);
    const [date,setDate] = useState("")
    const [weather,setWeather] = useState("")
    const [visibility,setVisibility] = useState("")

    const createEntry = (event: React.SyntheticEvent) =>{
        event.preventDefault()
        const createDiary : unknown = {
            date: date,
            weather: weather,
            visibility: visibility,
        }
        submitEntryHandler(createDiary);
    }


    return (
        <form onSubmit={(event)=>createEntry(event)}>
            <label htmlFor="input">Date: </label>
            <input id="date" type="text"
             value={date}
             onChange={(event) => setDate(event.target.value)}
            />
            <label htmlFor="weather-select">Weather: </label>
            <input id="date" type="select"
             value={weather}
             onChange={(event) => setWeather(event.target.value)}
            />
{/*             <select name="weather-select" id="weather-select" value={weather}  onChange={(event:React.FormEvent)=>{setWeather(event.target.value)}}>
                <option value="sunny">Sunny</option>
                <option value="rainy">Rainy</option>
                <option value="cloudy">Cloudy</option>
                <option value="stormy">Stormy</option>
                <option value="windy">Windy</option>
            </select> */}
            <label htmlFor="input">Visibility: </label>
            <input id="date" type="text"
             value={visibility}
             onChange={(event) => setVisibility(event.target.value)}
            />
            <button type="submit">Create</button>
        </form>
    )
}

export default NewEntryForm;
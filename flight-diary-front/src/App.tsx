import { useEffect, useState } from 'react'
import './App.css'
//import { DiaryEntry, Visibility } from './types';
import diaryService from "./services/diaries"
//import { NewEntryForm } from './components/NewEntryForm';
import { DiaryEntry } from './types';

function App() {
  const [diaryEntries, setEntries] = useState<DiaryEntry[]>([]);

/*   const diaryCreation = async (newBlog: DiaryEntryFormValues)  => {
    const data = await diaryService.create(newBlog);
    const updatedEntries = diaryEntries.concat(data)
    setEntries(updatedEntries);
  }; */

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
    {diaryEntries.map((item)=>(
      <div key={item.id}>
        <h2>{item.date}</h2>
        <p>Visibility :{item.visibility}</p>
        <p>Weather :{item.weather}</p>
      </div>
    ))}
    </>
  )
}

export default App

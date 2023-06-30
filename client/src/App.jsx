import './App.css'
import Auth from './Components/Auth/Auth'
import ListHeader from './Components/ListHeader/ListHeader'
import ListItem from './Components/ListItem/ListItem'
import Modal from './Components/Modal/Modal'
import ProgressBar from './Components/ProgressBar/ProgressBar'
import axios from 'axios';
import { useContext } from 'react';
import { themeContext } from './Contexts/TaskContext'
import { useEffect } from 'react'
function App() {
  const {tasks, setTasks} = useContext(themeContext);
  const getData = async () =>{
      const userEmail = 'subramani.xiic@gmail.com';
      console.log(import.meta.env.VITE_APP_SERVERURL);
      try{
      const response = await axios.get(`${import.meta.env.VITE_APP_SERVERURL}/todos/${userEmail}`)
      // console.log(response.data)
      setTasks(response.data)
    }catch(err){
      console.error(err)
    }
  }
  // const getData = async () =>{
  //   const userEmail = 'subramani.xiic@gmail.com';
  //   // console.log(userEmail)
  //   try{
  //   const response = await fetch(`${process.env.VITE_APP_SERVERURL}/todos/${userEmail}`);
  //   const json = await response.json();
  //   console.log(json)
  // }catch(err){
  //   console.error(err)
  // }

  // getData()
  useEffect(()=>getData,[])
  console.log(tasks)
  const sortedTasks = tasks?.sort((a,b)=> new Date(a.data) - new Date(b.date));
  return (
    <div className='app'>
    <ListHeader listname={'holiday tick list'}/>
    {
      sortedTasks?.map((task,index)=>{
        return(<ListItem key={tasks[index].id} task={task} mykey={tasks[index].id} mytitle={tasks[index].title}/>);
      })
    }
    </div>
  )
}

export default App

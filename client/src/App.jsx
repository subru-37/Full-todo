import './App.css'
import Auth from './Components/Auth/Auth'
import ListHeader from './Components/ListHeader/ListHeader'
import ListItem from './Components/ListItem/ListItem'
import Modal from './Components/Modal/Modal'
import ProgressBar from './Components/ProgressBar/ProgressBar'
import axios from 'axios';
import { useContext } from 'react';
import { themeContext } from './Contexts/TaskContext'
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
function App() {
  const {tasks, setTasks} = useContext(themeContext);
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const userEmail = cookies.email
  const getData = async () =>{
    const userAuth = cookies.AuthToken;
      try{
      const response = await axios.get(`${import.meta.env.VITE_APP_SERVERURL}/todos/${userAuth}`)
      setTasks(response.data)
    }catch(err){
      console.error(err)
    }
  }
  const authToken = cookies.AuthToken
  // const getData = async () =>{
  //   const userEmail = 'subramani.xiic@gmail.com';
  //   try{
  //   const response = await fetch(`${process.env.VITE_APP_SERVERURL}/todos/${userEmail}`);
  //   const json = await response.json();
  // }catch(err){
  //   console.error(err)
  // }

  // getData()
  useEffect(()=>{
    if(authToken){
      getData()
    }
  },[])
  const sortedTasks = tasks?.sort((a,b)=> new Date(a.data) - new Date(b.date));
  return (
    <div className='app'>
      {
        !authToken && <Auth/>
      }
      {
        authToken && <div> <ListHeader listname={'Your Task completion app!'}/>
        <p>Welcome Back {userEmail}</p>
        {
          sortedTasks?.map((task,index)=>{
            return(<ListItem key={tasks[index].id} task={task} mykey={tasks[index].id} mytitle={tasks[index].title}/>);
          })
        }</div>
      }
    </div>
  )
}

export default App

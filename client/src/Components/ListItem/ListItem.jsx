import React from 'react'
import './ListItem.css';
import ProgressBar from '../ProgressBar/ProgressBar';
import TickIcon from '../TickIcon/TickIcon';
import { useContext } from 'react';
import { themeContext } from '../../Contexts/TaskContext';
import { useCookies } from 'react-cookie';
import axios from 'axios';
const ListItem = (props) => {
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const {setShowModal, setMode,setKey,key,setData,setTasks,tasks} = useContext(themeContext);
  const getData = async () =>{
    const userEmail = cookies.email
    try{
    const response = await axios.get(`${import.meta.env.VITE_APP_SERVERURL}/todos/${userEmail}`)
    // console.log(response.data)
    setTasks(response.data)
  }catch(err){
    console.error(err)
  }
}
  async function deleteItem(){
    setKey(props.mykey);
    // console.log(props.mykey);
    try{
      const response = await axios.delete(`${import.meta.env.VITE_APP_SERVERURL}/todos/${props.mykey}`);
      console.log(response);
      if (response.status === 200){
        console.log('worked!!!');
        setShowModal(false);
        setData({user_email: cookies.email,
        title: '', 
        progress: 50,
        date: new Date()});
        getData();
      }
    }
    catch(err){
      console.log(err)
    }
  }
  return (
    <li className='list-item'>
      <div className='content'>
      <div style={{display:'flex', alignItems:'center', flexDirection:'row'}}>
      <TickIcon/>
      <p>{props.task.title}</p>
      </div>
      <ProgressBar progress={props.task.progress}/>
      </div>
      <div className='list-button'>
        <button className='edit' onClick={()=>{setMode('edit');setShowModal(true);setKey(props.mykey)}}>EDIT</button>
        <button className='delete' onClick={()=>{deleteItem();}}>DELETE</button>
      </div>
    </li>
  )
}

export default ListItem
import React from 'react'
import './Modal.css';
import { useContext } from 'react';
import { themeContext } from '../../Contexts/TaskContext';
import axios from 'axios';
import { useCookies } from 'react-cookie';
const Modal = (props) => {
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const {setData,mode,data,setShowModal,showModal,tasks,key,setKey,setTasks} = useContext(themeContext);
  if (mode=== 'edit'){
    const mydata = tasks.filter((obj)=>{
      const id = obj.id;
      if (id === key){
        return obj;
      }
    })
  //   setData((preValue)=>{
  //     return{
  //     ...preValue,
  //     title: mydata[0].title,
  //     progress: mydata[0].progress
  //   };
  // })
  }
  function handleChange(event) {
    const { name, value } = event.target;
    setData((preValue) => {
      return {
        ...preValue,
        [name]: value
      };
    }
    );
  }
  async function editData(e){
    e.preventDefault();
    const userAuth = cookies.AuthToken;
    // console.log(data,userAuth);
    try{
      const response = await axios.put(`${import.meta.env.VITE_APP_SERVERURL}/todos/${key}`,{
        auth: userAuth,
        title: data.title,
        progress: data.progress,
        date: data.date
      });
      if (response.status === 200){
        
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
  const getData = async () =>{
    const userAuth = cookies.AuthToken;
      try{
      const response = await axios.get(`${import.meta.env.VITE_APP_SERVERURL}/todos/${userAuth}`)
      setTasks(response.data)
    }catch(err){
      console.error(err)
    }
  }
  async function postData(event){
    event.preventDefault();
    const userAuth = cookies.AuthToken;
    try{
      const response = await axios.post(`${import.meta.env.VITE_APP_SERVERURL}/todos/`,{
        auth: userAuth,
        title: data.title,
        progress: data.progress,
        date: data.date
      });
    // const response = fetch('${import.meta.env.VITE_APP_SERVERURL}/todos/',{
    //     method:'POST',
    //     headers: {'Content-Type': 'application/json'},
    //     body: JSON.stringify(data)
    //   })
      if (response.status === 200){
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
    <div className='overlay' style={{display: showModal ? 'flex': 'none'}}>
      <div className='modal'>
        <div className='form-title'>
          <h3>{mode} your task</h3>
          <button onClick={()=>setShowModal(false)}>X</button>
        </div>
        <form>
          <input
          required
          maxLength={30}
          placeholder='Your task'
          name='title'
          value={data.title}
          onChange={handleChange}
          />
          <br/>
          <label htmlFor="range">Drag to select your current progress</label>
          <input type="range" min={0} max={100} value={data.progress} onChange={handleChange} name='progress'/>
          <label htmlFor="range">{data.progress}%</label>
          <input className={mode} type="submit" onClick={mode==='create'? postData:editData}/>
        </form>
      </div>
    </div>
  )
}

export default Modal
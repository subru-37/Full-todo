import React from 'react'
import './Modal.css';
import { useContext } from 'react';
import { themeContext } from '../../Contexts/TaskContext';
import axios from 'axios'
const Modal = (props) => {
  const {setData,mode,data,setShowModal,showModal,tasks,key,setKey,setTasks} = useContext(themeContext);
  if (mode=== 'edit'){
    const mydata = tasks.filter((obj)=>{
      const id = obj.id;
      if (id === key){
        return obj;
      }
    })
    console.log(mydata[0].title)
  //   setData((preValue)=>{
  //     return{
  //     ...preValue,
  //     title: mydata[0].title,
  //     progress: mydata[0].progress
  //   };
  // })
  }
  console.log(mode)
  function handleChange(event) {
    const { name, value } = event.target;
    console.log(name,value);
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
    try{
      const response = await axios.put(`${import.meta.env.VITE_APP_SERVERURL}/todos/${key}`,data);
      console.log(response);
      if (response.status === 200){
        console.log('worked!!!');
        
        setShowModal(false);
        setData({user_email: 'subramani.xiic@gmail.com',
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
    const userEmail = 'subramani.xiic@gmail.com'
    try{
    const response = await axios.get(`${import.meta.env.VITE_APP_SERVERURL}/todos/${userEmail}`)
    // console.log(response.data)
    setTasks(response.data)
  }catch(err){
    console.error(err)
  }
}
  async function postData(event){
    event.preventDefault();
    console.log('piost')
    try{
      const response = await axios.post(`${import.meta.env.VITE_APP_SERVERURL}/todos/`,data);
    // const response = fetch('${import.meta.env.VITE_APP_SERVERURL}/todos/',{
    //     method:'POST',
    //     headers: {'Content-Type': 'application/json'},
    //     body: JSON.stringify(data)
    //   })
      console.log(response)
      if (response.status === 200){
        console.log('worked!!!');
        setShowModal(false);
        setData({user_email: 'subramani.xiic@gmail.com',
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
          require="true"
          maxLength={30}
          placeholder='Your task'
          name='title'
          value={data.title}
          onChange={handleChange}
          />
          <br/>
          <label htmlFor="range">Drag to select your current progress</label>
          <input type="range" min={0} max={100} value={data.progress} onChange={handleChange} name='progress'/>
          <input className={mode} type="submit" onClick={mode==='create'? postData:editData}/>
        </form>
      </div>
    </div>
  )
}

export default Modal
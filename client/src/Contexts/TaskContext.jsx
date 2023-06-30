import React, { useEffect } from 'react'
import { useState,useContext,createContext } from 'react';
export const themeContext = createContext();
const TaskContext = ({children}) => {
    const [tasks, setTasks] = useState(null);
    const [mode, setMode] = useState('create');
    const [data, setData] = useState({
      user_email: 'subramani.xiic@gmail.com',
      title: null, 
      progress: 50,
      date: new Date()
    });
    const [showModal, setShowModal] = useState(false);
    const [key,setKey] = useState('')
    console.log(mode);
    // useEffect(()=>{
     
    // },[mode])
  return (
    <themeContext.Provider value={{tasks,setTasks,setMode, data,setData,mode,showModal, setShowModal,key,setKey}}>
        {children}
    </themeContext.Provider>
  )
}

export default TaskContext
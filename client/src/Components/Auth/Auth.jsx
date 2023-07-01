import React, { useState } from 'react'
import './Auth.css';
import axios from 'axios';
import {useCookies} from 'react-cookie'
const Auth = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null)
  console.log(cookies)
  const [isLogIn, setislogIn] = useState(false); 
  const [form,setForm] = useState({
    email: '',
    password: ''
  })
  const [cpass, setCpass] = useState('')
  function handlechange(event){
    const {name, value} = event.target;
    setForm((preValue)=>{
      console.log(name,value)
      return{
        ...preValue, 
        [name]: value
      };
    })
  }
  async function handleSubmit(e,endpoint){
    e.preventDefault();
    console.log(endpoint)
    if (!isLogIn && form.password !== cpass){
      setError('Make sure your passwords match')
      return
    }
    const response = await axios.post(`${import.meta.env.VITE_APP_SERVERURL}/${endpoint}`,form);
    console.log(response.data)
    if(response.data.detail){
      setError(response.data.detail)
    }else{
      setCookie('email', response.data.email)
      setCookie('AuthToken', response.data.token)
      window.location.reload()
    }
  }
  const [error,setError] = useState('');
  function viewLogin(status){
    setError(null)
    setislogIn(status)
  }
  return (
    <div className='container'>
      <div className='box'>
        <form>
          <h2>
            {isLogIn ? 'Please Log in' : 'Please Sign up!!'}
          </h2>
          <input type="email" placeholder='email' onChange={handlechange} name="email"/>
          <input type="password" placeholder='password' onChange={handlechange} name="password"/>
          {!isLogIn && <input type="password" placeholder='confirm password' onChange={(e)=>{setCpass(e.target.value)}}/>}
          <input type="submit" className='create' onClick={()=>handleSubmit(event,isLogIn ? 'login': 'signup')}/>
          {error && <p>{error}</p>}
        </form>
        <div className='auth-options'>
          <button onClick={()=>viewLogin(false)} style={{backgroundColor: isLogIn ? 'white': 'rgb(188,188,188)'}}>Sign Up!</button>
          <button onClick={()=>viewLogin(true)} style={{backgroundColor: !isLogIn ? 'white': 'rgb(188,188,188)'}}>Sign In!</button>
        </div>
      </div>
    </div>
  )
}

export default Auth
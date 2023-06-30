import React, { useState } from 'react'

const Auth = () => {
  const isLogIn = false;
  const [error,setError] = useState('');
  return (
    <div className='container'>
      <div className='box'>
        <form>
          <h2>
            {isLogIn ? 'Please Log in' : 'Please Sign up!!'}
          </h2>
          <input type="email" placeholder='email'/>
          <input type="password" placeholder='password'/>
          {!isLogIn && <input type="password" placeholder='confirm password'/>}
          <input type="submit" className='create'/>
          {error && <p>{error}</p>}
        </form>
      </div>
    </div>
  )
}

export default Auth
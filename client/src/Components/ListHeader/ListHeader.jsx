import React, { useContext } from 'react'
import './ListHeader.css'
import Modal from '../Modal/Modal'
import { themeContext } from '../../Contexts/TaskContext';
import { useCookies } from 'react-cookie';
const ListHeader = (props) => {
  const {showModal, setShowModal,setMode, mode} = useContext(themeContext);
  const [cookies, setCookie, removeCookie] = useCookies(null)

  const Signout = () => {
    removeCookie('email')
    removeCookie('AuthToken')
    window.location.reload()
  }
  return (
    <div className='list-header'>
        <h1>{props.listname}</h1>
        <div className='buttons'>
          <button className='create' onClick={()=>{setShowModal(true); setMode('create');}}>ADD NEW NOTES</button>
          <button className='signout' onClick={Signout}>Sign Out!</button>
        </div>
        <Modal/> 
    </div>
  )
}

export default ListHeader
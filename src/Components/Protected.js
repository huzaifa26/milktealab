import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import {  Outlet } from 'react-router-dom';

function Protected() {
  const navigate=useNavigate();
  useEffect(() =>{
    console.log(localStorage.getItem("user") === null);
      if (localStorage.getItem("user") === null) {
        navigate('/');
        return
      }
  },[])

  return (
    <Outlet/>
  )
}
export default Protected;
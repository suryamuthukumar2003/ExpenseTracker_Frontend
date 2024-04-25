import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'


const Login = () => {
  const[cookies,setCookie]=useCookies([]);
  const nav=useNavigate();
  function handlesubmit(e){
      e.preventDefault();
      const email=document.querySelector(".email").value;
      const password=document.querySelector(".password").value;
      fetch('http://localhost:8000/user/login',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            emailID:email,
            password:password
        })
      }).then(res=>res.json()).then(data=>{
        const {status,accesstoken}=data;
        if(status.toLowerCase()==="success"){
            setCookie('token',accesstoken,{maxAge:3600})
            const error=document.querySelector(".error");
            error.textContent="Login successful!!"
            error.style.display="block"
            setTimeout(()=>{
                nav('/Expense')
            },1000)
        }else{
            const error=document.querySelector(".error");
            error.style.display="block"
        }
      })
  }
  return (
    <div className="loginform">
    <form  id='loginform' onSubmit={handlesubmit}>
    <input type="email" className="email" placeholder='Enter Email'required/>
    <input type="password" className="password" placeholder='Enter
Password' required/>
    <button type="submit">Login</button>
    <p className="error">User Not Found, Try to Register</p>
    </form>

</div>
  )
}

export default Login
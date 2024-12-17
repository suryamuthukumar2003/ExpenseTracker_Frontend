
import { Link, useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { useState } from 'react';
function Signup() {
  const[cookie,setCookie]=useCookies([]);
  const[showToggle,setShowToggle]=useState(false)
  const nav=useNavigate();
  async function handleSubmit(e){
    e.preventDefault();
      const username=document.querySelector(".username").value;
      const email=document.querySelector(".email").value;
      const password=document.querySelector(".password").value;
      await fetch(`${import.meta.env.VITE_API_URL}/user/new`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
          userName:username,
          emailID:email,
          password:password
        })
      }).then(res=>res.json()).then(data=>{
        const {status,accessToken,userDetails}=data;
        if(status.toLowerCase()==="success"){
            setCookie('token',accessToken,{maxAge:3600})
            setCookie('userID',userDetails.userID, {maxAge:3600})
            const error=document.querySelector(".error");
            error.textContent="Register successful!!"
            error.style.display="block"
            setTimeout(()=>{
                nav('/expense')
            },1000)
        }else{
            const error=document.querySelector(".error");
            error.style.visibility="visible"
        }
      })
  }


  return (
    <div className='d-flex justify-content-center align-items-center' style={{height:"100vh",width:"100%"}}>
      <div className="">
      <form  id='signupform' className='p-5' onSubmit={handleSubmit}>
    <input type="text" className="username" placeholder='Enter User Name' autoComplete='off'/>
    <input type="email" className="email" placeholder='Enter Email'required autoComplete='off'/>
    <input type={showToggle?"text":"password"} className="password" placeholder='Enter Password' required autoComplete='off'/>
    <div style={{display:"flex"}}>
    <input type='checkbox' id='password' style={{marginRight:"5px"}} onClick={()=>setShowToggle((prev)=>!prev)}/>
    <label htmlFor='password'>Show Password</label>
    </div>
    <button type="submit" autoComplete='off' style={{width:"70%"}}>Sign Up</button>
    <Link to="/">Already have an account</Link>
    <p className="error" style={{marginTop:"10px",visibility:"hidden"}}>User already exist</p>
    </form>
      </div>
</div>
  )
}

export default Signup
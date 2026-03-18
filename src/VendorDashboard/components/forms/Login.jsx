import { useState } from 'react'


import { API_URL } from "../../data/apiPath";
const Login = ({showWelcomeHandler}) => {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const loginHandler=async(e)=>{
    e.preventDefault();
    try{
      const response=await fetch(`${API_URL}/vendor/login`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({email,password})
      })
      const data=await response.json();
     
      if(response.ok){
        console.log("loged in succesfull");
      alert("loged in succesfull");
      setEmail("");
      setPassword("");
      localStorage.setItem('loginToken',data.token);
      localStorage.removeItem('firmId');
      localStorage.removeItem('firmName');
      showWelcomeHandler();

      
      const vendorId=data.vendorId;

       if(!vendorId){
          console.error("Vendor ID not found");
          return;
       }
      const vendorResponse=await fetch(`${API_URL}/vendor/single-vendor/${vendorId}`)
      const vendorData=await vendorResponse.json();
      if(vendorResponse.ok && vendorData.vendorFirmId){
        const vendorFirmId=vendorData.vendorFirmId;
        const vendorFirmName=vendorData.vendorFirmName;
          console.log("checking for firmId",vendorFirmId);
         console.log("my firm name is", vendorFirmName);
         localStorage.setItem('firmId',vendorFirmId);
         if(vendorFirmName){
          localStorage.setItem('firmName',vendorFirmName);
         }
        window.location.reload();
      }
    } else {
      alert(data.error || "login failed");
    }

    }catch(error){
      console.error(error);
      alert("not logined");
    }
  }

  return (
    <div className='loginSection'>
        <form className='authForm' onSubmit={loginHandler}>
        <h3>Vendor Login</h3>
            <label>Email</label><br />
            <input type='email' name='email' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='enter your Email'/><br/>
            <label>Password</label><br/>
            <input type='password' name='password' value={password}  onChange={(e)=>setPassword(e.target.value)} placeholder='enter your password'/><br/>
            <div className="btnSubmit">
                <button type='submit'>Submit</button>
            </div>
        </form>
    
    </div>
  )
}

export default Login

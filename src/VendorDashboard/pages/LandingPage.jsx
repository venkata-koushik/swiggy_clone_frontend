import React,{useState,useEffect} from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/SideBar'
import Login from '../components/forms/Login'
import Register from '../components/forms/Register'
import AddFirm from '../components/forms/AddFirm'
import AddProduct from '../components/forms/AddProduct';

import Welcome from '../components/Welcome';
import AllProducts from '../components/AllProducts'


 
const LandingPage = () => {
  const [showLogin,setShowLogin] = useState(false);
   const [showRegister,setShowRegister]=useState(false);
  const [showFirm,setshowFirm]=useState(false);
  const [showProduct,setshowProduct]=useState(false);
   const [showWelcome,setShowWelcome]=useState(false);
  const [showAllProducts,setShowAllProducts] = useState(false);
  const [showLogout,setShowLogout]=useState(false);
  const [showFirmTitle,setShowFirmTitle] = useState(true);
  

  useEffect(()=>{
    const loginToken = localStorage.getItem('loginToken');
    if(loginToken){
      setShowLogout(true);
      setShowWelcome(true);
    }else{
      setShowLogout(false);
    }
  },[]);

  useEffect(()=>{
    const firmName=localStorage.getItem('firmName');
    const firmId = localStorage.getItem('firmId')
      if(firmName || firmId ){
          setShowFirmTitle(false)
          setShowWelcome(true)
      }

  },[]);

const logoutHandler=()=>{

  const confirmLogout = window.confirm("Are you sure you want to logout?");
  if(!confirmLogout) return;

  localStorage.removeItem('loginToken');
  localStorage.removeItem('firmId');
  localStorage.removeItem('firmName');

  setShowLogout(false)
      setShowFirmTitle(true)
      setShowWelcome(false)

}

const showLoginHandler=()=>{
  setShowLogin(true);
    setShowRegister(false);
    setshowFirm(false);
    setshowProduct(false);
     setShowWelcome(false);
     setShowAllProducts(false);
    setShowLogout(false);
}

const showRegisterHandler=()=>{
  setShowRegister(true);
  setShowLogin(false);
  setshowFirm(false);
  setshowProduct(false);
   setShowWelcome(false);
   setShowAllProducts(false);
  setShowLogout(false);
}
const showFirmHandler=()=>{
  if(showLogout){
  setshowFirm(true);
  setShowRegister(false);
   setShowLogin(false);
   setshowProduct(false);
    setShowWelcome(false);
    setShowAllProducts(false);
    setShowLogout(true);
  }else{
    alert("please login ");
     setShowLogin(true);


  }

}
const showProductHandler=()=>{
  if(showLogout){
  setshowProduct(true);
   setshowFirm(false);
  setShowRegister(false);
   setShowLogin(false);
    setShowWelcome(false);
    setShowAllProducts(false);
    setShowLogout(true);
  }else{
    alert("set")
  }
    

}
const showWelcomeHandler=()=>{
  setShowWelcome(true);
  setshowProduct(false);
   setshowFirm(false);
  setShowRegister(false);
   setShowLogin(false);
    setShowAllProducts(false);
    setShowLogout(true);

}
const showAllProductsHandler = ()=>{
  const loginToken=localStorage.getItem('loginToken');
  if(loginToken){
    setShowRegister(false)
    setShowLogin(false)
    setshowFirm(false)
    setshowProduct(false)
    setShowWelcome(false)
    setShowAllProducts(true)
    setShowLogout(true);

}else{
    alert("please login")
    setShowLogin(true)
 }
}

  return (
   <>
   <section className='landingSection'>
     <Navbar showLoginHandler={showLoginHandler} showRegisterHandler={showRegisterHandler}
     showLogout={showLogout}
     logoutHandler={logoutHandler}/>

     <div className="collectionSection">

      <Sidebar showFirmHandler={showFirmHandler} showProductHandler={showProductHandler} 
               showAllProductsHandler={showAllProductsHandler} showFirmTitle={showFirmTitle}/>
         
     {showFirm   && showLogout && < AddFirm/> }
      {showLogin &&  <Login showWelcomeHandler={showWelcomeHandler}/>} 
      {showRegister && <Register showLoginHandler={showLoginHandler}/>}
   {showProduct && showLogout &&  <AddProduct showProductHandler={showProductHandler}/>}
   {showWelcome && <Welcome/>}
   {showAllProducts && showLogout && <AllProducts />}
     </div>
    
   </section>
   </>
  )
}

export default LandingPage

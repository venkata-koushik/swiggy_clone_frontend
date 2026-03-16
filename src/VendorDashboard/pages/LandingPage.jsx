import React,{useState,useEffect} from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Login from '../components/forms/Login'
import Register from '../components/forms/Register'
import AddFirm from '../components/forms/AddFirm'
import AddProduct from '../components/forms/AddProduct';

import Welcome from '../components/Welcome';
import AllProducts from '../components/AllProducts'


 
const LandingPage = () => {
  const [showLogin,setshowLogin] = useState(false);
   const [showRegister,setshowRegister]=useState(false);
  const [showFirm,setshowFirm]=useState(false);
  const [showProduct,setshowProduct]=useState(false);
   const [showWelcome,setShowWelcome]=useState(false);
  const [showAllProducts,setShowAllProducts] = useState(false);
  const [showLogOut,setShowLogOut]=useState(false);
  const [showFirmTitle,setShowFirmTitle] = useState(true);
  

  useEffect(()=>{
    const loginToken = localStorage.getItem('loginToken');
    if(loginToken){
      setShowLogOut(true);
      setShowWelcome(true);
    }else{
      setShowLogOut(false);
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

const logOutHandler=()=>{

  const confirmLogout = window.confirm("Are you sure you want to logout?");
  if(!confirmLogout) return;

  localStorage.removeItem('loginToken');
  localStorage.removeItem('firmId');
  localStorage.removeItem('firmName');

  setShowLogOut(false)
      setShowFirmTitle(true)
      setShowWelcome(false)

}

const showLoginHandler=()=>{
  setshowLogin(true);
    setshowRegister(false);
    setshowFirm(false);
    setshowProduct(false);
     setShowWelcome(false);
     setShowAllProducts(false);
    setShowLogOut(false);
}

const showRegisterHandler=()=>{
  setshowRegister(true);
  setshowLogin(false);
  setshowFirm(false);
  setshowProduct(false);
   setShowWelcome(false);
   setShowAllProducts(false);
  setShowLogOut(false);
}
const showFirmHandler=()=>{
  if(showLogOut){
  setshowFirm(true);
  setshowRegister(false);
   setshowLogin(false);
   setshowProduct(false);
    setShowWelcome(false);
    setShowAllProducts(false);
    setShowLogOut(true);
  }else{
    alert("please login ");
     setshowLogin(true);


  }

}
const showProductHandler=()=>{
  if(showLogOut){
  setshowProduct(true);
   setshowFirm(false);
  setshowRegister(false);
   setshowLogin(false);
    setShowWelcome(false);
    setShowAllProducts(false);
    setShowLogOut(true);
  }else{
    alert("set")
  }
    

}
const showWelcomeHandler=()=>{
  setShowWelcome(true);
  setshowProduct(false);
   setshowFirm(false);
  setshowRegister(false);
   setshowLogin(false);
    setShowAllProducts(false);
    setShowLogOut(true);

}
const showAllProductsHandler = ()=>{
  const loginToken=localStorage.getItem('loginToken');
  if(loginToken){
    setshowRegister(false)
    setshowLogin(false)
    setshowFirm(false)
    setshowProduct(false)
    setShowWelcome(false)
    setShowAllProducts(true)
    setShowLogOut(true);

}else{
    alert("please login")
    setshowLogin(true)
 }
}

  return (
   <>
   <section className='landingSection'>
     <Navbar showLoginHandler={showLoginHandler} showRegisterHandler={showRegisterHandler}
     showLogOut={showLogOut}
     logOutHandler={logOutHandler}/>

     <div className="collectionSection">

      <Sidebar showFirmHandler={showFirmHandler} showProductHandler={showProductHandler} 
               showAllProductsHandler={showAllProductsHandler} showFirmTitle={showFirmTitle}/>
         
     {showFirm   && showLogOut && < AddFirm/> }
      {showLogin &&  <Login showWelcomeHandler={showWelcomeHandler}/>} 
      {showRegister && <Register showLoginHandler={showLoginHandler}/>}
   {showProduct && showLogOut &&  <AddProduct showProductHandler={showProductHandler}/>}
   {showWelcome && <Welcome/>}
   {showAllProducts && showLogOut && <AllProducts />}
     </div>
    
   </section>
   </>
  )
}

export default LandingPage

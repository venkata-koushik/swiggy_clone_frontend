const Navbar = ({showLoginHandler,showRegisterHandler,showLogout,logoutHandler}) => {
  const firmName=localStorage.getItem('firmName');
  return (
   <div className="navSection">
    <div className="company">
      Vendor Dashboard
    </div>
    <div className='firstName'>
      <h3>Firm Name: {firmName}</h3>

    </div>
    <div className="userAuth">
      {!showLogout ?
       <>     
       <span onClick={showLoginHandler}>Login</span>
       <span>/</span>
      <span onClick={showRegisterHandler}>Register</span>
      </>:<span onClick={logoutHandler}>LogOut</span> }
     

    </div>
   </div>
  )
}

export default Navbar

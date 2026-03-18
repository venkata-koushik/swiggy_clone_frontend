import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <>
    <div className='errorSection'>
    <Link to="/" style={{fontSize:'1.5 rem' , color:'darkblue'}}>
         <h3> go back </h3>
    </Link>
        <h1>404</h1>
        <div> page not found</div>
    </div>
    </>
  )
}

export default NotFound

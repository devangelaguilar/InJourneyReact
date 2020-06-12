import React,{useContext} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {UserContext} from "../App";

const NavBar = () =>{
    const {state, dispatch} = useContext(UserContext);
    const history = useHistory();
    const renderList = () => {
        if(state){
            return[
                <li key="1"><Link to="/profile">Profile</Link></li>,
                <li key="2"><Link to="/create">Upload a Photo</Link></li>,
                <li key="3"><button className="btn waves-effect waves-light #64b5f6 blue lighten-2" onClick={() => {
                    localStorage.clear() 
                    dispatch({type: 'CLEAR'})
                    history.push("/signin")
                }}>Log Out</button></li>
            ]
        }
        else{
            return [
                <li key="4"><Link to="/signin">Log In</Link></li>,
                <li key="5"><Link to="/signup">Sign Up</Link></li>
            ]
        }
    }
    return (
        <nav>
        <div className="nav-wrapper white">
          <Link to={state?"/":"/signin"} className="band-logo left">
              <img src="https://res.cloudinary.com/injourney/image/upload/v1591964391/Logo_IJ_d3lutw.png" width="50" height="50" id="logo"></img>
          </Link>
          <ul id="nav-mobile" className="right">
              {renderList()}
          </ul>
        </div>
      </nav>
    )
}

export default NavBar
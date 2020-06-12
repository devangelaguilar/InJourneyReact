import React,{useState, useContext} from 'react';
import {Link, useHistory} from 'react-router-dom';
import M from 'materialize-css'
import {UserContext} from "../../App"

const Login = () =>{
    const {state, dispatch} = useContext(UserContext);
    const history = useHistory();
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const PostData = () =>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "Invalid Email",classes:"#c62828 red darken-3"})
        }
        fetch("/signin",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                password,
                email
            })
        }).then(res => res.json()).then(data =>{
            console.log(data);
            if(data.error){
                M.toast({html: data.error})
            }
            else{
                localStorage.setItem("jwt", data.token)
                localStorage.setItem("user", JSON.stringify(data.user))
                dispatch({type:"USER", payload: data.user})
                M.toast({html: "Success"})
                history.push('/');
            }
        }).catch(error =>{
            console.log(error);
        });
    }
    return (
        <div className="myCard">
            <div className="card auth-card">
                <img src="https://res.cloudinary.com/injourney/image/upload/v1591964391/Logo_IJ_d3lutw.png" width="150" height="150" id="logo" />
                <input type="email" placeholder="Email" className="input-field" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" placeholder="Password" className="input-field" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button className="btn waves-effect waves-light #64b5f6 blue lighten-2" onClick={() => PostData()}>Log In</button>
                <h5>
                    <Link to="/signup">Don't have an account?</Link>
                </h5>
            </div>
        </div>
    )
}

//window.location.reload();
export default Login
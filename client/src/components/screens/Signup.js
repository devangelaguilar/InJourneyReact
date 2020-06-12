import React,{useState} from 'react';
import {Link, useHistory} from 'react-router-dom'
import M from 'materialize-css'

const Signup = () =>{
    const history = useHistory();
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const PostData = () =>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "Invalid Email",classes:"#c62828 red darken-3"})
        }
        fetch("/signup",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                password,
                email
            })
        }).then(res => res.json()).then(data =>{
            if(data.error){
                M.toast({html: data.error})
            }
            else{
                M.toast({html: data.message})
                history.push('/signin');
            }
        }).catch(error =>{
            console.log(error);
        });
    }

    return (
        <div className="myCard">
            <div className="card auth-card">
            <img src="https://res.cloudinary.com/injourney/image/upload/v1591964391/Logo_IJ_d3lutw.png" width="150" height="150" id="logo" />
                <input type="text" placeholder="Name" className="input-field" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="email" placeholder="Email" className="input-field" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" placeholder="Password" className="input-field" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button className="btn waves-effect waves-light #64b5f6 blue lighten-2" onClick={() => PostData()}>Sign Up</button>
                <h5>
                    <Link to="/signin">Already have an account?</Link>
                </h5>
            </div>
        </div>    )
}

export default Signup
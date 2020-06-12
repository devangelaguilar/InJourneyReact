import React,{useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import M from 'materialize-css'

const CreatePost = () =>{
    const history = useHistory();
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [image, setImage] = useState("");
    const [url, setUrl] = useState("");
    useEffect(() => {
        if(url){
            fetch("/createpost",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")  
                },
                body: JSON.stringify({
                    title,
                    body,
                    pic: url
                })
            }).then(res => res.json()).then(data =>{
                console.log(data);
                if(data.error){
                    M.toast({html: data.error})
                }
                else{
                    M.toast({html: "Success"})
                    history.push('/');
                }
            }).catch(error =>{
                console.log(error);
            });
        }
    },[url])

    const postDetails = () =>{
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "InJourney");
        data.append("cloud_name", "injourney");
        fetch("https://api.cloudinary.com/v1_1/injourney/image/upload", {
            method: "POST",
            body: data
        }).then(res => res.json()).then(data => {
            setUrl(data.url);
        }).catch(error =>{
            console.log(error);
        });
    }

    return (
        <div className="card input-filed" style={{margin: "10px", maxWidth: "500ox", padding: "20px", textAlign: "center"}}>
            <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)}></input>
            <input type="text" placeholder="Body" value={body} onChange={(e) => setBody(e.target.value)}></input>
            <form action="#">
                <div className="file-field input-field">
                    <div className="btn">
                        <span>Upload Image</span>
                        <input type="file" onChange={(e) => setImage(e.target.files[0])}/>
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text"/>
                    </div>
                </div>
            </form>
            <button className="btn waves-effect waves-light #64b5f6 blue darken-2" onClick={() => postDetails()}>Post</button>
        </div>
    )
}

export default CreatePost
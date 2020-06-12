import React ,{useEffect, useState, useContext} from 'react';
import {UserContext} from "../../App"

const Profile = () =>{
    const [myPics, setPics] = useState([])
    const {state, dispatch} = useContext(UserContext)
    console.log(state)
    useEffect(() => {
        fetch("/myposts", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json()).then(result => {
            setPics(result.myposts)
        })
    }, [])
    return (
        <div style={{maxWidth: "550px", margin:"0px auto"}}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-around',
                margin: "18px 0px",
                borderBottom: "1px solid grey"
            }}>
                <div>
                    <img style={{width:"160px", height:"160px", borderRadius:"80px"}} 
                    src="https://res.cloudinary.com/injourney/image/upload/v1591985921/file_1868163_wwbuol.webp"/>
                </div>
                <div>
                    <h4>{state?state.name:"loading"}</h4>
                    <div style={{display:"flex", justifyContent:"space-between", width:"108%"}}>
                        <h5>n posts</h5>
                        <h5>n followers</h5>
                        <h5>n following</h5>
                    </div>
                </div>
            </div>
            <div className="gallery">
                {
                    myPics.map(item =>{
                        return(
                            <img key={item._id} className="item" src={item.photo} alt={item.title} />
                        )
                    }) 
                }
            </div>
        </div>
    )
}
export default Profile
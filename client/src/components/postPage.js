import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import { UserContext } from "../UserContext";

export default function PostPage(props){
    const [postInfo, setPostInfo] = useState(null); 
    const {userInfo} = useContext(UserContext);
    const params = useParams(); // useParams cannot be called inside a callback function 
    useEffect(() => {
        fetch('http://localhost:4000/post/'+params.id).then(res => {
            res.json().then(postInfo => {
                setPostInfo(postInfo); 
            })
        })
    }, [])

    if(!postInfo) return ''; 

    return (
        <div className="post-page">
          <h1>{postInfo.title}</h1>
          <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
          <div className="author">by @{postInfo.author.username}</div>
          { userInfo.id === postInfo.author._id && (
            <div className="edit-post">
                <Link className="edit-btn" to={`/edit/${postInfo._id}`}>Edit</Link>
            </div>
          )}
          <div className="image">
            <img src={`http://localhost:4000/${postInfo.cover}`} alt=""/>
          </div>
          <div className="content" dangerouslySetInnerHTML={{__html:postInfo.content}} />
        </div>
      );
}
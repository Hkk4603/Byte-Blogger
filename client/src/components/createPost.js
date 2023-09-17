import { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { Navigate } from "react-router-dom";
import Editor from "../Editor";


export default function CreatePost (){
    const [title, setTitle] = useState(''); 
    const [summary, setSummary] = useState(''); 
    const [content, setContent] = useState(''); 
    const [files, setFiles] = useState(''); 
    const [redirect, setRedirect] = useState(false); 
    async function createNewPost(e){
        const data = new FormData(); 
        data.set('title', title); 
        data.set('summary', summary); 
        data.set('content', content); 
        data.set('file', files[0]);         
        e.preventDefault(); 
        const response = await fetch('http://localhost:4000/post', {
            method: 'POST',
            body: data,
            credentials: 'include'
        })

        if(response.ok){
            setRedirect(true); 
        }
    }

    if(redirect){
        return <Navigate to={'/'} />
    }

    return (
        <div className="form-container createPost-container">
            <form action="" onSubmit={createNewPost} encType="multipart/form-data">
                <input type="title" placeholder="Title" value={title} onChange={(e) => {setTitle(e.target.value)}}/>
                <input type="summary" placeholder="Summary" value={summary} onChange={(e) => {setSummary(e.target.value)}}/>
                <input type="file" onChange={(e) => setFiles(e.target.files)}/>
                {/* // implement inserting image as a part of content in ReactQuill */}
                <Editor value={content} onChange={setContent} />
                <input type="submit" value="Create Post" />
            </form>
        </div>
    )
}
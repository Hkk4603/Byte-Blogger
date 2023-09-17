import { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom"
import Editor from "../Editor";
import 'react-quill/dist/quill.snow.css';

export default function EditPost() {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        fetch('http://localhost:4000/post/' + id).then(response => {
            response.json().then(postInfo => {
                setTitle(postInfo.title);
                setSummary(postInfo.summary);
                setContent(postInfo.content);
            })
        })
    }, []
    )

    async function updatePost(e) {
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('id', id);
        if (files?.[0]) {
            data.set('file', files[0]);
        }
        e.preventDefault();
        const response = await fetch('http://localhost:4000/post', {
            method: 'PUT',
            body: data,
            credentials: 'include',
        });
        if (response.ok) {
            setRedirect(true);
        }
    }

    if (redirect) {
        return <Navigate to={'/post/' + id} />
    }

    return (
        <div>
            <div className="form-container createPost-container">
                <form action="" onSubmit={updatePost} encType="multipart/form-data">
                    <input type="title" placeholder="Title" value={title} onChange={(e) => { setTitle(e.target.value) }} />
                    <input type="summary" placeholder="Summary" value={summary} onChange={(e) => { setSummary(e.target.value) }} />
                    <input type="file" onChange={(e) => setFiles(e.target.files)} />
                    {/* // implement inserting image as a part of content in ReactQuill */}
                    <Editor onChange={setContent} value={content} />
                    <input type="submit" value="UpdatePost Post" />
                </form>
            </div>
        </div>
    );
}
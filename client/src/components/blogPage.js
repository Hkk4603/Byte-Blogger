import { useEffect, useState } from "react";
import Post from "./post";

const BlogPage = () => {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        fetch('http://localhost:4000/post').then(res => {
            res.json().then(posts => setPosts(posts))
        })
    }, [])


    return (
        <section>
            {posts.length>0 && posts.map((post) => {
                return <Post key={post.createdAt} {...post} />
            })}
        </section>
    );
}

export default BlogPage; 
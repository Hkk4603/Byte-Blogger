import {format} from 'date-fns'
import { Link } from 'react-router-dom';

export default function Post(props) {
    return (
        <div className="post">
            <Link to={`/post/${props._id}`}>
                <img src={`http://localhost:4000/${props.cover}`} alt="img" />
            </Link>
            <div className="content-container">
                <Link to={`/post/${props._id}`}>
                    <h2>{props.title}</h2>
                </Link>
                <p className="info">
                    <a href="/" className="author">{props.author.username}</a>
                    {/*we can also use formatISO9075() instead of format()*/}
                    <time>{format(new Date(props.createdAt), 'MMM d, yyyy HH:mm')}</time>
                </p>
                <p>{props.summary}</p>
            </div>
        </div>
    );
}
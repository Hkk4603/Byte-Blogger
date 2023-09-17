import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function Navbar() {
    const {userInfo, setUserInfo} = useContext(UserContext);
    // read about useEffect
    useEffect(() => {
        fetch('http://localhost:4000/profile', {
            credentials: 'include', // understand this line
        }).then(response => {
            // we can consume response.json() only once therefore we cannot have console.log(response.json()) in this block again
            // this will lead to "Failed to execute 'json' on 'Response': body stream already read"
            response.json().then(userInfo => {
                setUserInfo(userInfo)
            })
        })
    }, [])

    function logout(){
        fetch('http://localhost:4000/logout', {
            method: 'POST',
            credentials: 'include',
        })
        setUserInfo(null)
    }

    const username = userInfo.username; 

    return (
        <header>
            <Link to="/" className="logo">ByteBlogger</Link>
            <nav>
                {!username && (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
                {username && (
                    <>
                        <Link to={'/create'}>Create new Posts</Link>
                        <a href="/" onClick={logout}>Logout</a>
                    </>
                )}
            </nav>
        </header>
    );
}
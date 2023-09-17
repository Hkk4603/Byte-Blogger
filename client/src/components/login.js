import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [redirect, setRedirect] = useState(false)
    const {setUserInfo} = useContext(UserContext); 
    const login = async (e) => {
        e.preventDefault(); 

        const response = await fetch('http://localhost:4000/login', {
            method: 'POST', 
            body: JSON.stringify({username, password}), 
            headers: {'Content-type': 'application/json'},
            credentials: 'include',
        })

        if(response.ok){
            response.json().then(userInfo => {
                setUserInfo(userInfo); 
                setRedirect(true); 
            })
        }else{
            alert('wrong credentials!')
        }
    }

    if(redirect){
        return <Navigate to={'/'} />
    }

    return (
        <div className="form-container">
            <h2>LOGIN</h2>
            <form action="" onSubmit={login}>
                <input type="text"
                    placeholder="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input type="submit" value="Signin" />
            </form>
        </div>
    );
}
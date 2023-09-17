// 1. one way of doing this is by using actions and method and name attribute in each input field

// import {useState} from 'react'

// export default function Register() {
//     return (
//         <div className="form-container">
//             <h2>REGISTER</h2>
//             <form action="http://localhost:4000/register" method="POST">
//                 <input type="text" placeholder="username" name="username" />
//                 <input type="password" placeholder="password" name="password" />
//                 <input type="submit" value="Signup" />
//             </form>
//         </div>
//     );
// }

// 2. The second was is to use fetch function in js

import { useState } from 'react'
import { Navigate } from 'react-router-dom';

export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false); 
    async function register(e) {
        e.preventDefault();

        const response = await fetch("http://localhost:4000/register", {
            method: "POST",
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        })
        
        if (response.status !== 200)
            alert('Registration failed. Try again!')
        else{
            alert('Registration successful')
            setRedirect(true)
        }
    }

    if(redirect){
        return <Navigate to={'/login'} />
    }

    return (
        <div className="form-container">
            <h2>REGISTER</h2>
            <form onSubmit={register}>
                <input type="text" placeholder="username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <input type="password" placeholder="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <input type="submit" value="Signup" />
            </form>
        </div>
    );
}

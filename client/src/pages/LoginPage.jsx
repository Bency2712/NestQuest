/* eslint-disable react/no-unescaped-entities */
// Importing necessary modules and components
import { Link, Navigate } from "react-router-dom";  // React Router's Link and Navigate components for navigation
import { useContext, useState } from "react";  // React hooks for context and state
import axios from "axios";  // HTTP client for making requests
import { UserContext } from "../UserContext";  // Custom UserContext for managing user data

// Functional component for the Login page
export default function LoginPage() {
    // State variables for managing email, password, and redirection
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    // Accessing user context to set user data
    const { setUser } = useContext(UserContext);

    // Handling login form submission
    async function handleLoginSubmit(ev) {
        ev.preventDefault();
        try {
            // Sending a login request to the server
            const response = await axios.post('/login', { email, password });

            // Setting user context with the received data
            setUser(response.data);

            // Showing a success message and triggering redirection
            alert('Login Successful');
            setRedirect(true);
        } catch (e) {
            if(e.response && e.response.status === 429){
                alert(e.response.data.payload);
            }
            else{
            // Showing an error message on login failure
            alert('Login Failed');
            }
        }
    }

    // Redirecting to the home page if login was successful
    if (redirect) {
        return <Navigate to={'/'} />;
    }

    // Rendering the login form
    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                {/* Login form */}
                <h1 className="text-4xl text-center mb-4">Login</h1>
                <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
                    {/* Email input */}
                    <input
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={ev => setEmail(ev.target.value)}
                    />

                    {/* Password input */}
                    <input
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={ev => setPassword(ev.target.value)}
                    />

                    {/* Login button */}
                    <button className="primary">Login</button>

                    {/* Link to register page */}
                    <div className="text-center py-2 text-gray-500">
                        Don't have an account yet? <Link className="underline text-black" to={'/register'}>Register now</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

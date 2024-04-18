import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutForm = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:8881/logout', {
                method: 'POST',
                credentials: 'include' // Include credentials for session-based authentication
            });
            if (response.ok) {
                // Clear any stored user authentication information
                // For example, clear localStorage.setItem('authToken', '');
                navigate('/login'); // Redirect to the login page
            } else {
                throw new Error('Logout failed');
            }
        } catch (error) {
            console.error('There was a problem with your logout operation:', error);
        }
    };

    return (
        <form>
            <button className="logout-button" type="button" onClick={handleLogout}>
                Logout
            </button>
        </form>
    );
};

export default LogoutForm;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Sidebar from '../components/common/Sidebar';
import DashboardContent from '../components/common/DashboardContent';

const Create = () => {
    const [name, setName] = useState('');
	const [first_name, setFirstname] = useState('');
	const [last_name, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    
    const [isSuccess, setIsSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
    
        const currentdate = new Date();
        const created_at =
        currentdate.getFullYear() + "-" +
        ('0' + (currentdate.getMonth() + 1)).slice(-2) + "-" +
        ('0' + currentdate.getDate()).slice(-2) + " " +
        ('0' + currentdate.getHours()).slice(-2) + ":" +
        ('0' + currentdate.getMinutes()).slice(-2) + ":" +
        ('0' + currentdate.getSeconds()).slice(-2);



        const userData = { name, first_name, last_name, email, phone,password,created_at };
        console.log(userData);

        fetch('http://localhost:8881/admin/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            // Reset form fields
            setName('');
			setFirstname('');
			setLastname('');
            setEmail('');
            setPhone('');
            setPassword('');
            // Show success message
            setIsSuccess(true);
            // Redirect back after a delay
            setTimeout(() => {
            setIsSuccess(false); // Hide success message
            
			navigate('/admin/users')
              // navigate('/success');
            }, 3000); // Change the delay (in milliseconds) as needed
        })
        .catch(error => {
            console.error('There was a problem with your fetch operation:', error);
            // You could display an error message to the user here
        });
    }

    return (
        <>
        <div className="wrapper">
<Sidebar/>
<DashboardContent />
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='bg-white rounded w-50 p-3'>
                <h2>Add User ddfdf</h2>
                {isSuccess ? (
                    <div className="alert alert-success" role="alert">
                        Record inserted successfully!
                    </div>
                ) : null}
                <form onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <label htmlFor="name">Full Name</label>
                        <input type="text" className="form-control" placeholder="Enter Full name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
					 <div className="mb-2">
                        <label htmlFor="first_name">First Name</label>
                        <input type="text" className="form-control" placeholder="Enter First name" value={first_name} onChange={(e) => setFirstname(e.target.value)} />
                    </div>
					 <div className="mb-2">
                        <label htmlFor="last_name">Last Name</label>
                        <input type="text" className="form-control" placeholder="Enter Last name" value={last_name} onChange={(e) => setLastname(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="email">Email address</label>
                        <input type="email" className="form-control" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    
                    <div className="mb-2">
                        <label htmlFor="phone">Phone</label>
                        <input type="tel" className="form-control" placeholder="Enter phone number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </div>
                    
                    <div className="mb-2">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete='off'/>
                    </div>
                    
                 
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
        </div>
</>
    );
}

export default Create;

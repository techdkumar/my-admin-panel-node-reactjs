import React, { useState,  useEffect } from 'react';

import {Link, useNavigate } from 'react-router-dom';

import Topbar from './Topbar';
import Footer from './Footer';
const DashboardContent = () => {
	
	
	const [collapsed, setCollapsed] = useState(false);
	const [theme, setTheme] = useState('light');
  
	const [data, setData] = useState([]);
  
  useEffect(() => {
      fetch('http://localhost:8881/users')
          .then(res => res.json())
          .then(data => setData(data))
          .catch(err => console.error(err));
  }, []);

	const navigate = useNavigate();



  useEffect(() => {
    const localTheme = localStorage.getItem('theme');
    if (localTheme) {
      setTheme(localTheme);
    }
  }, []);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };
  
  //Deleting records
  const handleDelete = (id) => {
    alert(`Deleting user with ID: ${id}`);
    fetch(`http://localhost:8880/delete/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
       return response.json();
	    navigate('/');
    })
    .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
        // You could display an error message to the user here
    });
}

  
  
  
  
    return (
        <div className="main">
            {/* Navbar */}
          
                {/* Navbar content */}
            <Topbar />
            {/* Main content */}
            <main className="content px-3 py-2">
                {/* Container for main content */}
				<div className="container-fluid">
                    <div className="mb-3" style={{ display: "flex", justifyContent: "space-between" }}>
					<h4>Admin Dashboard</h4>
					{/*<h4><Link to="/create" className='btn btn-sm btn-success'>Add +</Link></h4>*/}
				</div>
					
                    <div className="row">
                        <div className="col-12 col-md-6 d-flex">
                            <div className="card flex-fill border-0 illustration">
                                <div className="card-body p-0 d-flex flex-fill">
                                    <div className="row g-0 w-100">
                                        <div className="col-6">
                                            <div className="p-3 m-1">
                                                <h4>Welcome Back, Admin</h4>
                                                <p className="mb-0">Admin Dashboard, Dtech PVT LTD</p>
                                            </div>
                                        </div>
                                        <div className="col-6 align-self-end text-end">
                                           {/* <img src="image/customer-support.jpg" className="img-fluid illustration-img"
                                                alt=""> */} 
												 <img src={process.env.PUBLIC_URL + '/assets/images/customer-support.jpg'} alt="Logo" height="30" width="30"  className="img-fluid illustration-img" style={{ opacity: 0.8, marginRight: '10px' }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 d-flex">
                            <div className="card flex-fill border-0">
                                <div className="card-body py-4">
                                    <div className="d-flex align-items-start">
                                        <div className="flex-grow-1">
                                            <h4 className="mb-2">
                                                $ 78.00
                                            </h4>
                                            <p className="mb-2">
                                                Total Earnings
                                            </p>
                                            <div className="mb-0">
                                                <span className="badge text-success me-2">
                                                    +9.0%
                                                </span>
                                                <span className="text-muted">
                                                    Since Last Month
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                   
                </div>
            </main>
			 <a href="#" className="theme-toggle">
                <i className="fa-regular fa-moon"></i>
                <i className="fa-regular fa-sun"></i>
            </a>
			{/* <div id="sidebar" className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <button id="sidebar-toggle" onClick={toggleSidebar}>Toggle Sidebar</button>
      <button className="theme-toggle" onClick={toggleTheme}>Toggle Theme</button>
      <div>{theme === 'light' ? 'Light Theme' : 'Dark Theme'}</div>
    </div>*/}
			 <Footer />
        </div>
    );
};

export default DashboardContent;

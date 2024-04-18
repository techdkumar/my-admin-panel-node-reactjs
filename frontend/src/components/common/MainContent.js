import React, { useState,  useEffect } from 'react';

import {Link, useNavigate } from 'react-router-dom';

import Topbar from './Topbar';
import Footer from './Footer';
const MainContent = () => {
	
	
	const [collapsed, setCollapsed] = useState(false);
	const [theme, setTheme] = useState('light');
  
	const [data, setData] = useState([]);
  
  useEffect(() => {
      fetch('http://localhost:8881/users')
          .then(res => res.json())
         .then(data => {
			setData(data);
			document.title = 'User List'; // Set the page title here
			})
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
    fetch(`http://localhost:8881/delete/${id}`, {
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
		<>
  <Topbar />
  <div className="row">
    <div className="card border-0">
      <div className="card-header" style={{ display: "flex", justifyContent: "space-between" }}>
        <h5 className="card-title">
          User List
        </h5>
		<h4><Link to="/admin/create" className='btn btn-sm btn-success'>Add +</Link></h4>
      </div>
	  
      <div className="card-body">
        {data.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">Created At</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((d, i) => (
                <tr key={d.id}>
                  <th scope="row">{i + 1}</th>
                  <td>{d.name}</td>
                  <td>{d.first_name}</td>
                  <td>{d.last_name}</td>
                  <td>{d.email}</td>
                  <td>{d.phone}</td>
                  <td>{/*new Date(d.created_at).toISOString().replace('T', ' ').replace(/\.\d{3}Z/, '')*/}
				  {new Date(d.created_at).toLocaleDateString()}</td>
                  <td style={{ display: "flex", gap: "5px" }}>
                    <Link to={`/admin/update/${d.id}`} className='btn btn-sm btn-primary'>Update</Link>
                    <button onClick={(e) => handleDelete(d.id)} className='btn btn-sm btn-danger'>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">Created At</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={7}><p>No records found</p></td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  </div>
</>

				
    );
};

export default MainContent;

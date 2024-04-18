import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Topbar = () => {
	const [isLoggedin, setIsLoggedin] = useState(false);
	const navigate = useNavigate();

	
const logout = () => {
        localStorage.removeItem('token-info');
        setIsLoggedin(false);
        navigate('/'); // Redirect to login page
    };


  return (
			  <nav className="navbar navbar-expand px-3 border-bottom">
                <button className="btn" id="sidebar-toggle" type="button">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="navbar-collapse navbar">
                    <ul className="navbar-nav">
                        <li className="nav-item dropdown">
                            <a href="#" data-bs-toggle="dropdown" className="nav-icon pe-md-0">
                                  {/*<img src="image/profile.jpg" className="avatar img-fluid rounded" alt="">*/}
								     <img src={process.env.PUBLIC_URL + '/assets/images/profile.jpg'} alt="Logo" height="30" width="30"  className="avatar img-fluid rounded" style={{ opacity: 0.8, marginRight: '10px' }} />
                            </a>
                            <div className="dropdown-menu dropdown-menu-end">
                                <a href="#" className="dropdown-item">Profile</a>
                                <a href="#" className="dropdown-item">Setting</a>
                                <a href="javascript:void(0);" className="dropdown-item" onClick={logout}>logout</a>
							
            
                            </div>
                        </li>
                    </ul>
                </div>
				 </nav>
           
  );
};

export default Topbar;

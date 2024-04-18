import React, { useState } from 'react';

const Sidebar = () => {
   /*  const [activeItem, setActiveItem] = useState('dashboard'); // Default active item

    const handleItemClick = (itemName) => {
        setActiveItem(itemName);
    }; */
	 const [activeItem, setActiveItem] = useState(null);

	  const handleItemClick = (itemName) => {
		setActiveItem(itemName);
	  };

    return (
        <aside id="sidebar" className="js-sidebar">
            <div className="h-100">
                <div className="sidebar-logo">
                    <a href="#"> <img src={process.env.PUBLIC_URL + '/assets/images/logo.png'} alt="Logo" height="30" width="30"  className="img-fluid illustration-img" style={{ opacity: 0.8, marginRight: '10px' }} /></a>
                </div>
                <ul className="sidebar-nav">
                    <li className="sidebar-header">
                        Admin Elements
                    </li>
                    <li className={`sidebar-item ${activeItem === 'dashboard' ? 'active' : ''}`}>
                        <a href="/admin/dashboard" className="sidebar-link" onClick={() => handleItemClick('dashboard')}>
                            <i className="fa fa-dashboard pe-2"></i>
                            Dashboard
                        </a>
                    </li>
                    {/* Add more sidebar items similarly */}
					 <li className={`sidebar-item ${activeItem === 'profile' ? 'active' : ''}`}>
						<a href="#" className="sidebar-link collapsed" data-bs-target="#profile" data-bs-toggle="collapse"
						  aria-expanded="false" onClick={() => handleItemClick('profile')}>
						  <i className="fa-solid fa-file-lines pe-2"></i>
						  Manage - Profile
						</a>
						<ul id="profile" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
						  <li className="sidebar-item">
							<a href="#" className="sidebar-link">View Profile</a>
						  </li>
						  <li className="sidebar-item">
							<a href="#" className="sidebar-link">Change Password</a>
						  </li>
						</ul>
					  </li>
					<li className="sidebar-item">
                        <a href="#" className="sidebar-link collapsed" data-bs-target="#users" data-bs-toggle="collapse"
                            aria-expanded="false"><i className="fa-solid fa-sliders pe-2"></i>
                            Manage - Users
                        </a>
                        <ul id="users" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                            <li className="sidebar-item">
                                <a href="/admin/users" className="sidebar-link">Users</a>
                            </li>
							{/*<Link to={`${key}/${v}`} onClick={e => onClickHandler(e, key, v)}>
							  <li>{v}</li>
							</Link>*/}
                           
                        </ul>
                    </li>
                </ul>
            </div>
        </aside>
    );
};

export default Sidebar;

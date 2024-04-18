
import React, { useContext, useEffect } from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter as Router, Routes, Route, Navigate, Redirect, Switch} from "react-router-dom";




import "./App.css"; //Assuming you have some custom styles

import AdminLogin from "./pages/auth/AdminLogin";
import Dashboard from './layout/Dashboard';
import Home from './pages/Home';
import Create  from "./pages/Create";
import Update  from "./pages/Update";


// Containers
//const AdminLayout = React.lazy(() => import('./layout/AdminLayout'))


function DhananjayApp() {
	return (
		
		 <Router>
      <div className="App" style={{ backgroundImage: "url(./circle.jpg)" }}>
        <Routes>
          <Route exact path="/" element={<AdminLogin />} />
		<Route exact path="/admin/dashboard" element={<Dashboard />} />
		<Route exact path="/admin/users" element={<Home />} />
		 <Route path='/admin/create' element={ <Create />}></Route>
		 <Route path='/admin/update/:id' element={ <Update />}></Route>
         
        </Routes>
      </div>
    </Router> 
	/*  <div className="App">
      <Dashboard />
    </div>
		 */
		
	);
}

export default DhananjayApp;



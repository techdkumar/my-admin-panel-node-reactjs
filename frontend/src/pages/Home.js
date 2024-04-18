import React from 'react';

import Topbar from '../components/common/Topbar';
import Sidebar from '../components/common/Sidebar';
import MainContent from '../components/common/MainContent';
import Create  from "../pages/Create";
const Home = () => {
    return (
        <div className="wrapper">
		 
            <Sidebar />
           
           
          <div>
           <MainContent />
        </div>
		
			
        </div>
    );
};

export default Home;




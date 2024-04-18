import React from 'react';

import Sidebar from '../components/common/Sidebar';
import DashboardContent from '../components/common/DashboardContent';

const Dashboard = () => {
    return (
        <div className="wrapper">
		 
            <Sidebar />
            <DashboardContent />
        			
        </div>
    );
};

export default Dashboard;

import React from 'react';

import Sidebar from '../components/common/Sidebar';
import DashboardContent from '../components/common/DashboardContent';


const Dashboard = () => {
    return (
        <div className="wrapper">
		 
            <Sidebar />
            <DashboardContent />
           
            {/* Include Bootstrap and custom JavaScript */}
            {/*<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha2/dist/js/bootstrap.bundle.min.js"></script>
            <script src="js/script.js"></script>*/}
			
        </div>
    );
};

export default Dashboard;

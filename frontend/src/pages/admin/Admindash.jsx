import React from 'react';
import Sidebar from './Adminside.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign, faUser, faChartLine, faUsers } from '@fortawesome/free-solid-svg-icons';
import Table from './Table.jsx';
import UserList from '../../components/admin/Userlist.jsx';
const Admindash= () => {
    const tableData = [
        { username: 'user1', providersname: 'provider1', service: 'service1' },
        { username: 'user2', providersname: 'provider2', service: 'service2' },
        { username: 'user3', providersname: 'provider3', service: 'service3' },
    ];
    return (
        <div className="flex h-screen">
        <Sidebar />
        <div className="p-4 flex-1">
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div className="p-4 bg-white shadow rounded-lg flex items-center">
                    <FontAwesomeIcon icon={faDollarSign} className="text-3xl text-green-500 mr-4" />
                    <div>
                        <h2 className="text-lg font-bold">Total Money Earned</h2>
                        <p className="text-2xl">$5000</p>
                    </div>
                </div>
                <div className="p-4 bg-white shadow rounded-lg flex items-center">
                    <FontAwesomeIcon icon={faUser} className="text-3xl text-blue-500 mr-4" />
                    <div>
                        <h2 className="text-lg font-bold">Total Visitors</h2>
                        <p className="text-2xl">150</p>
                    </div>
                </div>
                <div className="p-4 bg-white shadow rounded-lg flex items-center">
                    <FontAwesomeIcon icon={faChartLine} className="text-3xl text-purple-500 mr-4" />
                    <div>
                        <h2 className="text-lg font-bold">Sales</h2>
                        <p className="text-2xl">45</p>
                    </div>
                </div>
                <div className="p-4 bg-white shadow rounded-lg flex items-center">
                    <FontAwesomeIcon icon={faUsers} className="text-3xl text-yellow-500 mr-4" />
                    <div>
                        <h2 className="text-lg font-bold">New Clients</h2>
                        <p className="text-2xl">12</p>
                    </div>
                </div>
            </div>
            <UserList/>
            <div className="p-4 bg-white shadow rounded-lg">
                <h2 className="text-lg font-bold mb-2 flex">New Clients</h2>
                <div className="p-4 bg-white shadow rounded-lg">
                <Table data={tableData} />
            </div>

            </div>
        </div>
    </div>
    );
};

export default Admindash;

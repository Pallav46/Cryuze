import React from 'react';
import { FaDollarSign, FaChartLine, FaUserPlus } from 'react-icons/fa';

const stats = [
    {
        id: 1,
        title: 'Total Money Earned',
        value: '$12,345',
        icon: <FaDollarSign className="text-white" />,
        color: 'bg-green-500',
    },
    {
        id: 2,
        title: 'Today\'s Sales',
        value: '123',
        icon: <FaChartLine className="text-white" />,
        color: 'bg-blue-500',
    },
    {
        id: 3,
        title: 'New Clients',
        value: '45',
        icon: <FaUserPlus className="text-white" />,
        color: 'bg-yellow-500',
    },
];

const StatCard = ({ title, value, icon, color }) => (
    <div className={`font-urbanist flex items-center p-4 rounded-lg shadow-lg ${color} text-white`}>
        <div className="p-3 rounded-full bg-white bg-opacity-25">
            {icon}
        </div>
        <div className="ml-4">
            <p className="text-lg font-semibold">{title}</p>
            <p className="text-2xl">{value}</p>
        </div>
    </div>
);

const Summarycomponent = () => {
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-8 dark:text-gray-200">Provider Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {stats.map(stat => (
                    <StatCard
                        key={stat.id}
                        title={stat.title}
                        value={stat.value}
                        icon={stat.icon}
                        color={stat.color}
                    />
                ))}
            </div>
        </div>
    );
};

export default Summarycomponent;


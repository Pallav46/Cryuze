import React from 'react';

const Table = ({ data }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border">
                <thead>
                    <tr className="w-full bg-gray-200 text-gray-900 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-left">Username</th>
                        <th className="py-3 px-6 text-left">Provider's  Name</th>
                        <th className="py-3 px-6 text-left">Service</th>
                    </tr>
                </thead>
                <tbody className="text-gray-900 text-sm font-light">
                    {data.map((row, index) => (
                        <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="py-3 px-6 text-left whitespace-nowrap text-black-bold ">{row.username}</td>
                            <td className="py-3 px-6 text-left">{row.providersname}</td>
                            <td className="py-3 px-6 text-left">{row.service}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;

import React, { useState } from 'react';

const users = [
    { id: 1, name: 'Alice', image: 'https://i.pravatar.cc/150?img=1' },
    { id: 2, name: 'Bob', image: 'https://i.pravatar.cc/150?img=2' },
    { id: 3, name: 'Charlie', image: 'https://i.pravatar.cc/150?img=3' },
    { id: 4, name: 'David', image: 'https://i.pravatar.cc/150?img=4' },
    { id: 5, name: 'Eve', image: 'https://i.pravatar.cc/150?img=5' },
    { id: 6, name: 'Frank', image: 'https://i.pravatar.cc/150?img=6' },
    { id: 7, name: 'Grace', image: 'https://i.pravatar.cc/150?img=7' },
    { id: 43, name: 'David', image: 'https://i.pravatar.cc/150?img=4' },
    { id: 53, name: 'Eve', image: 'https://i.pravatar.cc/150?img=5' },
    { id: 63, name: 'Frank', image: 'https://i.pravatar.cc/150?img=6' },
    { id: 734, name: 'Grace', image: 'https://i.pravatar.cc/150?img=7' },
    { id: 4333, name: 'David', image: 'https://i.pravatar.cc/150?img=4' },
    { id: 533, name: 'Eve', image: 'https://i.pravatar.cc/150?img=5' },
    { id: 633, name: 'Frank', image: 'https://i.pravatar.cc/150?img=6' },
    { id: 734, name: 'Grace', image: 'https://i.pravatar.cc/150?img=7' },
    // Add more users as needed
];

const UserList = () => {
    const [showAll, setShowAll] = useState(false);

    const visibleUsers = showAll ? users : users.slice(0, 5);

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Users</h1>
            <div className="flex flex-wrap space-x-4 ">
                {visibleUsers.map(user => (
                    <div key={user.id} className="flex flex-col items-center w-50">
                        <img
                            src={user.image}
                            alt={user.name}
                            className="w-16 h-16 rounded-full"
                        />
                        <p className="mt-2 text-center">{user.name}</p>
                    </div>
                ))}
            </div>
            <button
                onClick={() => setShowAll(!showAll)}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
                {showAll ? 'Show Less' : 'More'}
            </button>
        </div>
    );
};

export default UserList;

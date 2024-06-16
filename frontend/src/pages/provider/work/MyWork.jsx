import { Link } from 'react-router-dom';
import useProviderGetAllWork from '../../../hooks/provider/useProviderGetAllWork';

const MyWork = () => {
    const { data, error, loading } = useProviderGetAllWork();

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen">Error: {error.message}</div>;
    }

    return (
        <div className="container mx-auto py-8">
            <h2 className="text-2xl font-bold mb-4">My Work List</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {data.map(work => (
                    <li key={work._id} className="bg-white rounded-lg shadow-md p-4">
                        <div>
                            <h3 className="text-lg font-bold mb-2">{work.subCategory.name}</h3>
                            <p className="text-gray-600 mb-1">Status: {work.status}</p>
                            <p className="text-gray-600 mb-1">Customer: {work.customer.name}</p>
                            <p className="text-gray-600 mb-1">Service Provider ID: {work.serviceProvider}</p>
                            <p className="text-gray-600 mb-2">Created At: {new Date(work.createdAt).toLocaleString()}</p>
                            <Link to={`/providers/work/${work._id}`} className="text-blue-500 hover:text-blue-700">
                                View Details
                            </Link>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MyWork;
import { Link } from 'react-router-dom';
import useProviderGetAllWork from '../../../hooks/provider/useProviderGetAllWork';
import Sidebar from '../../../components/provider/Sidebar';
import DarkMode from '../../../components/provider/DarkMode';
const MyWork = () => {
    const { data, error, loading } = useProviderGetAllWork();

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen">Error: {error.message}</div>;
    }

    return (
        <>
      <div  className='flex '>

        <Sidebar/>
        <div className="container mx-auto py-8 dark:bg-gray-800">
            <DarkMode />
            <h2 className="text-2xl font-bold mb-4 dark:text-white">My Work List</h2>            
                    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {data.map(work => (
                        <li key={work._id} className="bg-white rounded-lg shadow-md p-4 dark:bg-gray-900">
                            <div>
                                <h3 className="text-lg font-bold mb-2 dark:text-white">{work.subCategory.name}</h3>
                                <p className="text-gray-600 mb-1 dark:text-gray-50">Status: {work.status}</p>
                                <p className="text-gray-600 mb-1 dark:text-gray-50">Customer: {work.customer.name}</p>
                                <p className="text-gray-600 mb-1 dark:text-gray-50">Service Provider ID: {work.serviceProvider}</p>
                                <p className="text-gray-600 mb-2 dark:text-gray-50">Created At: {new Date(work.createdAt).toLocaleString()}</p>
                                <Link to={`/providers/work/${work._id}`} className="text-blue-500 hover:text-blue-700">
                                    View Details
                                </Link>
                            </div>
                        </li>
                    ))}
                </ul>
                
            {
                    data.length==0 &&(
                    <div className="text-center text-gray-600">No work found</div>
                )
            }
           
        </div>
      </div>
        </>
    );
};

export default MyWork;
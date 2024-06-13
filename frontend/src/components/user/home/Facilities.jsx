import {FaCarSide, FaHeadphonesAlt, FaWallet, FaCheckCircle} from "react-icons/fa"

const FacilitiesData=[
    {
        id:1,
        icon: <FaCarSide className='text-4xl md:text-5xl text-red-500'/>,
        title: "Fast Services",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex esse veniam inventore?",
    },
    {
        id:2,
        icon: <FaHeadphonesAlt className='text-4xl md:text-5xl text-red-500'/>,
        title: "Online Support 24/7",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex esse veniam inventore?",
    },
    {
        id:3,
        icon: <FaWallet className='text-4xl md:text-5xl text-red-500'/>,
        title: "Wallet Friendly",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex esse veniam inventore?",
    },
    {
        id:4,
        icon: <FaCheckCircle className='text-4xl md:text-5xl text-red-500'/>,
        title: "Secure Payment",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex esse veniam inventore?",
    }
]

function Facilities() {
  return (
    <div>
        <div className='container my-14 md:my-20'>
            <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 gap-y-8'>
                {
                    FacilitiesData.map((data)=>(
                        <div key={1} className='flex flex-col items-start sm:flex-row gap-4'>
                            {data.icon}
                            <div>
                                <h1 className='lg:text-xl font-bold'>{data.title}</h1>
                                <h1 className='text-gray-400 text-sm'>{data.description}</h1>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    </div>
    
  )
}

export default Facilities

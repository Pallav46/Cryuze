import { FaMobileAlt } from 'react-icons/fa'
import { FaFacebook, FaInstagram, FaLinkedin, FaLocationArrow } from 'react-icons/fa6'

const FooterLinks = [
    {
        title:"Providers Home",
        links:"/providers/dashboard",
    },
    {
        title:"Providers Login",
        links:"/providers/login",
    },
    {
        title:"Providers Signup",
        links:"/providers/register",
    },
]
const FooterLinks2 = [
    {
        title:"My Orders",
        links:"/myOrders",
    },
    {
        title:"All Orders",
        links:"/allOrders",
    },
    {
        title:"History",
        links:"/history",
    },
]


function Footer() {
  return (
    <div className='dark:bg-gray-900 bg-gray-100 text-black dark:text-white'>
      <div className="container">
        <div className="grid md:grid-cols-3 pb-20 pt-5">
            <div className="py-8 px-4 ">
                <a href='#' className='text-black dark:text-white font-semibold tracking-widest text-2xl uppercase sm:text-3xl'>
                    X Company
                </a>
                <p className='text-gray-600 lg:pr-24 pt-3 dark:text-white/70'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam alias cum</p>
                <p className='text-gray-500 mt-4'>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
            </div>
            <div className='col-span-2 grid grid-cols-2 sm:grid-cols-3 md:pl-10'>
                <div className='py-8 px-4'>
                    <h1 className='text-xl font-bold sm:text-left mb-3'>Providers Site</h1>
                    <ul className='space-y-3'>
                        {
                            FooterLinks.map(
                                (data, index)=>(
                                    <li key={index}>
                                        <a href={data.links} className='text-gray-600 hover:text-black duration-300 hover:dark:text-white dark:text-gray-400'>
                                            {data.title}
                                        </a>
                                    </li>
                                )
                            )
                        }
                    </ul>
                </div>
                <div className='py-8 px-4'>
                    <h1 className='text-xl font-bold sm:text-left mb-3'>Quick Links</h1>
                    <ul className='space-y-3'>
                        {
                            FooterLinks2.map(
                                (data, index)=>(
                                    <li key={index}>
                                        <a href={data.links} className='text-gray-600 hover:text-black duration-300 hover:dark:text-white dark:text-gray-400'>
                                            {data.title}
                                        </a>
                                    </li>
                                )
                            )
                        }
                    </ul>
                </div>
                <div className='py-8 px-4 col-span-2 sm:col-auto'>
                <h1 className='text-xl font-bold sm:text-left mb-3'>Address</h1>
                    <div>
                        <div className='flex items-center gap-3'>
                            <FaLocationArrow/>
                            <div>
                                <p>Indian Institute of Technology</p>
                                <p>Kharagpur, West Bengal</p>
                                <p>721302</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-3 mt-6'>
                            <FaMobileAlt/>
                            <p>+91 123456789</p>
                        </div>
                        <div className='flex items-center gap-3 mt-6'>
                            <a href='/#'>
                                <FaInstagram className='text-3xl hover:text-pink-600 duration-300'/>
                            </a>
                            <a href='/#'>
                                <FaFacebook className='text-3xl hover:text-blue-600 duration-300'/>
                            </a>
                            <a href='/#'>
                                <FaLinkedin className='text-3xl hover:text-blue-600 duration-300'/>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Footer

import { useState, useEffect } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, FaUsers, FaUserTie } from 'react-icons/fa';
import Navbar from '../../../components/user/navbar/Navbar';
import Footer from '../../../components/user/footer/Footer';

const AnimatedCounter = ({ end, duration }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 16); // 60 FPS

    const timer = setInterval(() => {
      start += increment;
      setCount(Math.floor(start));

      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end, duration]);

  return <span>{count}+</span>;
};

const About = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [formError, setFormError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setFormError('Please fill out all fields.');
    } else {
      // Handle form submission logic here
      console.log('Form submitted:', formData);
      // Reset form after submission
      setFormData({ name: '', email: '', message: '' });
      setFormError('');
    }
  };

  const contributors = [
    { name: "Om Tewari", role: "Founder & CEO", linkedin: "https://linkedin.com/in/omtewari", image: "https://via.placeholder.com/150" },
    { name: "Samrat Koushik", role: "Founder & CTO", linkedin: "https://linkedin.com/in/samratkoushik", image: "https://via.placeholder.com/150" },
    { name: 'Dev Bawari', role: 'Senior Frontend Developer', github: "https://github.com/devbawari", image: "https://via.placeholder.com/150" },
    { name: 'Anshuman Arya', role: 'Frontend Developer', github: "https://github.com/anshumanarya", image: "https://via.placeholder.com/150" },
    { name: 'Pallav Kumar', role: 'Senior Backend Developer', github: "https://github.com/pallavkumar", image: "https://via.placeholder.com/150" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <Navbar />
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-indigo-900 dark:text-indigo-500 sm:text-5xl sm:tracking-tight lg:text-6xl">About Our Organization</h1>
          <p className="mt-5 max-w-xl mx-auto text-lg text-gray-600 dark:text-gray-400">
            We are a dynamic team of innovators committed to delivering cutting-edge solutions that transform businesses.
          </p>
        </div>

        <div className="mt-20">
          <h2 className="text-3xl font-extrabold text-indigo-900 dark:text-indigo-500">Our Mission</h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            To empower businesses with innovative technology solutions that drive growth, efficiency, and success in the digital age.
          </p>
        </div>

        <div className="mt-20 bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
          <div className="p-8">
            <h2 className="text-3xl font-extrabold text-center text-indigo-900 dark:text-indigo-500 mb-8">Our Growth</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="text-center">
                <FaUsers className="mx-auto h-12 w-12 text-indigo-600 dark:text-indigo-400" />
                <p className="mt-4 text-5xl font-extrabold text-gray-900 dark:text-gray-100">
                  <AnimatedCounter end={10000} duration={2000} />
                </p>
                <p className="mt-2 text-lg leading-6 font-medium text-gray-500 dark:text-gray-400">Total Users</p>
              </div>
              <div className="text-center">
                <FaUserTie className="mx-auto h-12 w-12 text-indigo-600 dark:text-indigo-400" />
                <p className="mt-4 text-5xl font-extrabold text-gray-900 dark:text-gray-100">
                  <AnimatedCounter end={500} duration={2000} />
                </p>
                <p className="mt-2 text-lg leading-6 font-medium text-gray-500 dark:text-gray-400">Service Providers</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <h2 className="text-3xl font-extrabold text-indigo-900 dark:text-indigo-500">Our Team</h2>
          <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {contributors.map((member, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <img src={member.image} alt={member.name} className="w-32 h-32 rounded-full mx-auto" />
                  <div className="mt-4 text-center">
                    <h3 className="text-xl font-semibold text-indigo-900 dark:text-indigo-500">{member.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{member.role}</p>
                    <div className="mt-2 flex justify-center space-x-3">
                      {member.linkedin && (
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300">
                          <FaLinkedin className="h-5 w-5" />
                        </a>
                      )}
                      {member.github && (
                        <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300">
                          <FaGithub className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20">
          <h2 className="text-3xl font-extrabold text-indigo-900 dark:text-indigo-500 text-center">Contact Us</h2>
          <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <div className="flex items-center">
                <FaEnvelope className="h-6 w-6 text-indigo-400 dark:text-indigo-500" />
                <span className="ml-3 text-lg text-gray-600 dark:text-gray-400">info@organization.com</span>
              </div>
              <div className="mt-4 flex items-center">
                <FaPhone className="h-6 w-6 text-indigo-400 dark:text-indigo-500" />
                <span className="ml-3 text-lg text-gray-600 dark:text-gray-400">+123 456 7890</span>
              </div>
              <div className="mt-4 flex items-center">
                <FaMapMarkerAlt className="h-6 w-6 text-indigo-400 dark:text-indigo-500" />
                <span className="ml-3 text-lg text-gray-600 dark:text-gray-400">123 Tech Street, Innovation City, 12345</span>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              {formError && (
                <div className="text-red-500 dark:text-red-400">{formError}</div>
              )}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className={`mt-1 block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 rounded-md ${formError ? 'border-red-500' : ''}`}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className={`mt-1 block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 rounded-md ${formError ? 'border-red-500' : ''}`}
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                <textarea
                  name="message"
                  id="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className={`mt-1 block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 rounded-md ${formError ? 'border-red-500' : ''}`}
                ></textarea>
              </div>
              <div>
                <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default About;
import React, { useState } from 'react';
import '../styles/Register.css';
import { Link } from 'react-router-dom';

const Register=()=> {
  const [currentTab, setCurrentTab] = useState('register');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [services, setServices] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
    const [location, setLocation] = useState('');
    const [Password, setPassword] = useState('');
  const serviceOptions = [
    { name: 'Plumbing', image: 'https://th.bing.com/th/id/OIP.hMEof5CObAgDETy---FEfgHaEK?rs=1&pid=ImgDetMain' },
    { name: 'Electrician', image: 'https://th.bing.com/th/id/OIP.hMEof5CObAgDETy---FEfgHaEK?rs=1&pid=ImgDetMain'  },
    { name: 'Cleaning', image: 'https://th.bing.com/th/id/OIP.hMEof5CObAgDETy---FEfgHaEK?rs=1&pid=ImgDetMain'  },
    { name: 'Landscaping', image: 'https://th.bing.com/th/id/OIP.hMEof5CObAgDETy---FEfgHaEK?rs=1&pid=ImgDetMain'  },
    { name: 'Catering', image: 'https://th.bing.com/th/id/OIP.hMEof5CObAgDETy---FEfgHaEK?rs=1&pid=ImgDetMain' }
  ];

  const handleServiceClick = (service) => {
    setServices(prevServices =>
      prevServices.includes(service)
        ? prevServices.filter(s => s !== service)
        : [...prevServices, service]
    );
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log('Login Submitted', { loginEmail, loginPassword });
  };

  return (
    <div className="container">
          <h2>Register as a Service Provider</h2>
          <form onSubmit={handleRegisterSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number:</label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="location">Location:</label>
              <input
                type="location"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Confirm Password:</label>
              <input
                type="password"
                id="password"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
             
            <div className="form-group">
              <label>Services you want to provide:</label>
              <div className="service-grid">
                {serviceOptions.map(service => (
                  <div
                    key={service.name}
                    className={`service-box ${services.includes(service.name) ? 'selected' : ''}`}
                    onClick={() => handleServiceClick(service.name)}
                  >
                    <img src={service.image} alt={service.name} />
                    <span>{service.name}</span>
                  </div>
                ))}
              </div>
            </div>
            
          </form>
            <button type="submit">Register</button>
            <Link to="/login"><button >Login</button></Link>
        </div>
    );
    }

    

export default Register;


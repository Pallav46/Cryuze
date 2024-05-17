// import React from 'react';

const Login = () => {
  return (
    <div>
      <h2>Login</h2>
      <form>
        <label htmlFor="email">
          Email:
          <input
            type="text"
            id="email"
            name="email"
            required
          />
        </label>
        
        <label htmlFor="password">
          Password:
          <input
            type="password"
            id="password"
            name="password"
            required
          />
        </label>
        
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;

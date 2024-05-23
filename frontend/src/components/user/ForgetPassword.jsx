import React, { useState } from 'react';
import { Button, Label, TextInput } from 'flowbite-react';

function ForgetPassword() {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!email) {
      setErrorMessage('Please enter your email.');
    } else {
      setErrorMessage('');
    }
  };

  return (
    <div className="w-[100%] absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] flex align-middle justify-center rounded-3xl">
      <div className="border-2 p-[2vw] rounded-3xl scale-[1.2] bg-zinc-800">
        <form onSubmit={handleSubmit}>
          <div className="mb-2 block">
            <Label htmlFor="email3" value="Your email" className='text-white font-bold' />
          </div>
          <TextInput
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@gmail.com"
            required
            className='w-[35vh]'
          />
          <Button type="submit" className='mt-[2vw]'>Submit</Button>
          {errorMessage && <div className="text-red-500 text-sm font-semibold">{errorMessage}</div>}
        </form>
      </div>
    </div>
  );
}

export default ForgetPassword;
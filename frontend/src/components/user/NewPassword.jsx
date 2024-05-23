import React, { useState } from 'react';
import { Button, Label, TextInput } from 'flowbite-react';

function NewPassword() {
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      setError(true);
    } else {
      setError(false);
    }
  };

  return (
    <div className="w-[100%] absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] flex align-middle justify-center">
      <form className="flex w-[30vh] flex-col gap-4 border-2 p-[2vw] rounded-3xl scale-[1.2] bg-zinc-800" onSubmit={handleSubmit}>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password" value="New password" className='text-white font-bold'/>
          </div>
          <TextInput 
            id="password" 
            type="password" 
            required 
            shadow 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="repeat-password" value="Repeat password" className='text-white font-bold' />
          </div>
          <TextInput 
            id="repeat-password" 
            type="password" 
            required 
            shadow 
            value={repeatPassword} 
            onChange={(e) => setRepeatPassword(e.target.value)} 
          />
        </div>
        {error && <p className="text-red-500">Passwords do not match.</p>}
        <Button type="submit">Save Password</Button>
      </form>
    </div>
  );
}

export default NewPassword;
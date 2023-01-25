import React, { useState } from 'react';
import './LoginForm.css';

function LoginForm() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(name, password);
  }

  return (
    <div className="container">
      <form className="login-form" onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}

export default LoginForm;
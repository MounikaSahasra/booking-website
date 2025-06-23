import React, { useState } from 'react';
import './Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase'; // Adjust if needed

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      // Fetch user from Firestore
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();

        if (userData.isAdmin) {
          navigate('/admin-dashboard'); // 🚨 Make sure route matches App.js
        } else {
          navigate('/user-dashboard');  // 🚨 Match route in App.js
        }
      } else {
        setError('User data not found in Firestore.');
      }
    } catch (err) {
      console.error(err);
      setError('Invalid email or password');
    }
  };

  return (
    <div className="login-page">
      <div className="overlay"></div>
      <div className="login-container">
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input 
              type="email" 
              className="form-control" 
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email" 
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input 
              type="password" 
              className="form-control" 
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password" 
              required
            />
          </div>
          {error && <div className="text-danger mb-2">{error}</div>}
          <button type="submit" className="btn btn-primary w-100">Sign In</button>
        </form>
      </div>
    </div>
  );
}

export default Login;

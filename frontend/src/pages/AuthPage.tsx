import React, { useState } from 'react';
import { useAuthCRUD } from '../hooks/useAuthCRUD';

interface AuthComponentProps {}

const AuthComponent: React.FC<AuthComponentProps> = () => {
  const { login, signup, isLoading } = useAuthCRUD();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [mode, setMode] = useState<'login' | 'signup'>('login'); // to toggle between login and signup modes
  const [error, setError] = useState<string | null>(null);

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signup(email, password, username);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const switchMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
    setError(null); // clear any previous error message
  };

  return (
    <div>
      <h2>{mode === 'login' ? 'Login' : 'Sign Up'}</h2>
      <form onSubmit={mode === 'login' ? handleLoginSubmit : handleSignupSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        {mode === 'signup' && (
          <div>
            <label>Username:</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
        )}
        <button type="submit" disabled={isLoading}>
          {mode === 'login' ? 'Login' : 'Sign Up'}
        </button>
        {mode === 'login' ? (
          <p>
            Don't have an account? <button type="button" onClick={switchMode}>Sign Up</button>
          </p>
        ) : (
          <p>
            Already have an account? <button type="button" onClick={switchMode}>Login</button>
          </p>
        )}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default AuthComponent;

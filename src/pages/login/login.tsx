import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import axios from 'axios';

interface User {
  name: string;
  pass: string;
  favorites: any[];
}

function Login() {
  const { setUser } = useContext(UserContext);
  const [name, setName] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const ownUsername = "emily";
    const ownPassword = "emilyspass";

    if (name === ownUsername && pass === ownPassword) {
      const user: User = {
        name: ownUsername,
        pass: ownPassword,
        favorites: [],
      };

      setUser(user);
      navigate('/home');
    } else {
      try {
        const response = await axios.post('https://dummyjson.com/auth/login', {
          username: name,
          password: pass,
        });

        const user: User = {
          name: response.data.username,
          pass: pass.trim(),
          favorites: [],
        };

        setUser(user);
        navigate('/home');
      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          console.error('Error response:', err.response.data);
          setError(err.response.data.message || 'Invalid username or password');
        } else {
          console.error('Error:', err);
          setError('An error occurred. Please try again.');
        }
      }
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div>
          <label>
            Username:<br />
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Password:<br />
            <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} />
          </label>
        </div>
        <br />
        <button type="submit">Login</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
}

export default Login;

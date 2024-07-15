import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import UserProvider from './context/userContext';
import Login from './pages/login/login';
import Home from './pages/home/home';
import Favorites from './pages/favorites/favorites';
import UserDetails from './pages/userDetails/userDetails';
import CharacterDetails from './pages/characterDetails/characterDetails';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <UserProvider>
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user-details" element={<UserDetails />} />
          <Route path="/home" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/character/:id" element={<CharacterDetails />} />
      </Routes>

      </UserProvider>
    </Router>
  );
}

export default App;

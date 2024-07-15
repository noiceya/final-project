import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import './home.css'

interface Champion {
  id: string;
  name: string;
  title: string;
  image: {
    full: string;
  };
}

function Home() {
  const { user, logout, toggleFavorite } = useContext(UserContext);
  const [champions, setChampions] = useState<Champion[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.name.trim()) {
      navigate('/');
    }

    async function fetchChampions() {
      try {
        const response = await axios.get('https://ddragon.leagueoflegends.com/cdn/11.24.1/data/en_US/champion.json');
        const championsData = response.data.data;
        const championsArray = Object.keys(championsData).map((key) => championsData[key]);
        setChampions(championsArray);
      } catch (error) {
        console.error('Error fetching champions:', error);
      }
    }
    fetchChampions();
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleProfileClick = () => {
    navigate('/user-details');
  };

  const handleChampionClick = (championId: string) => {
    navigate(`/character/${championId}`);
  };

  return (
    <div className="container home">
      <h1 className="text-center">League of Legends Champions</h1>
      <div className="text-center mt-3 mb-3">
      <button className="btn" onClick={handleProfileClick}>My Profile
        </button>
        <button className="btn" onClick={handleLogout}>Logout</button>
      </div>
      <div className="row">
        {champions.map((champion) => (
          <div key={champion.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
            <div className="card">
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/11.24.1/img/champion/${champion.image.full}`}
                alt={champion.name}
                className="card-img-top"
                onClick={() => handleChampionClick(champion.id)}
              />
              <div id="addToFav"
                className={`card-body text-center ${user.favorites.includes(champion.id) ? 'bg-danger text-white' : ''}`}
                onClick={() => toggleFavorite(champion.id)}
                style={{ cursor: 'pointer' }}
              >
                {user.favorites.includes(champion.id) ? 'Remove from favorites' : 'Add to favorites'}
              </div>
              <div className="card-body">
                <h5 className="card-title">{champion.name}</h5>
                <p className="card-text">{champion.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;

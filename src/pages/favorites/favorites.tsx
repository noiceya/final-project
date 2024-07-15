import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../context/userContext';

interface Champion {
  id: string;
  name: string;
  title: string;
  image: {
    full: string;
  };
}

const Favorites: React.FC = () => {
  const { user, toggleFavorite } = useContext(UserContext);
  const [favoriteChampions, setFavoriteChampions] = useState<Champion[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchChampions() {
      try {
        const response = await axios.get('https://ddragon.leagueoflegends.com/cdn/11.24.1/data/en_US/champion.json');
        const championsData = response.data.data;
        const championsArray = Object.keys(championsData).map((key) => championsData[key]);
        const filteredChampions = championsArray.filter((champion) =>
          user.favorites.includes(champion.id)
        );
        setFavoriteChampions(filteredChampions);
      } catch (error) {
        console.error('Error fetching champions:', error);
      }
    }

    if (user && user.favorites.length > 0) {
      fetchChampions();
    }
  }, [user]);

  const handleChampionClick = (championId: string) => {
    navigate(`/character/${championId}`);
  };

  return (
    <div className="container favorite">
      <h1 className="text-center">Favorite Champions</h1>
      <div className="row">
        {favoriteChampions.map((champion) => (
          <div key={champion.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
            <div className="card">
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/11.24.1/img/champion/${champion.image.full}`}
                alt={champion.name}
                className="card-img-top"
                onClick={() => handleChampionClick(champion.id)}
              />
              <div
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

export default Favorites;

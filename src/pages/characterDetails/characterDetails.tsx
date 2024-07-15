import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../context/userContext'; // Adjust the path as necessary
import './characterDetails.css';

interface Champion {
  id: string;
  name: string;
  title: string;
  lore: string;
  image: {
    full: string;
  };
}

const CharacterDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [champion, setChampion] = useState<Champion | null>(null);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user || !user.name.trim()) {
      navigate('/login');
      return;
    }
  }, [user, navigate]);

  useEffect(() => {
    if (!id) {
      console.error('Champion ID is undefined');
      navigate('/home');
      return;
    }

    async function fetchChampionDetails() {
      try {
        const response = await axios.get(`https://ddragon.leagueoflegends.com/cdn/11.24.1/data/en_US/champion/${id}.json`);
        const championData = response.data.data[id as keyof typeof response.data.data];
        setChampion(championData);
      } catch (error) {
        console.error('Error fetching champion details:', error);
      }
    }

    fetchChampionDetails();
  }, [id, navigate]);

  useEffect(() => {
    const originalBackgroundImage = document.body.style.backgroundImage;
    const originalBackgroundSize = document.body.style.backgroundSize;
    const originalBackgroundPosition = document.body.style.backgroundPosition;

    if (champion) {
      document.body.style.setProperty('background-image', `url(https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_0.jpg)`);
      document.body.style.setProperty('background-size', 'cover');
      document.body.style.setProperty('background-position', 'center');
    }

    return () => {
      document.body.style.setProperty('background-image', originalBackgroundImage);
      document.body.style.setProperty('background-size', originalBackgroundSize);
      document.body.style.setProperty('background-position', originalBackgroundPosition);
    };
  }, [champion]);

  if (!champion) {
    return <div>Loading...</div>;
  }

  return (
    <div className="character-details">
      <div className="champ-info">
        <h1 className="champName">{champion.name}</h1>
        <h2 className="champTitle">{champion.title}</h2>
        <p className="champlore">{champion.lore}</p>
      </div>
    </div>
  );
};

export default CharacterDetails;

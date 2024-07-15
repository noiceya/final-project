import React, { useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import './userDetails.css';

function UserDetails() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.name.trim()) {
      navigate('/');
    }
    document.body.style.backgroundColor = 'white';
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, [user, navigate]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container-pfp">
      <h2>Hi {user.name}</h2>
      <h3>These are your favourite champions</h3>
      <div className="favorites-container">
        {user.favorites && user.favorites.length > 0 ? (
          user.favorites.map((championId) => (
            <div key={championId} className="favorite-champion">
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/11.24.1/img/champion/${championId}.png`}
                alt={championId}
                className="favorite-champion-image"
              />
              <p>{championId}</p>
            </div>
          ))
        ) : (
          <div className="no-favorites-message">
            You don't have any favourite champions yet.
          </div>
        )}
      </div>
      <Link to="/home" id="goHomeBtn">Go to Home</Link>
    </div>
  );
}

export default UserDetails;

import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const ServiceCard = ({ service }) => {
  const navigate = useNavigate();
  const { favoriteIds, toggleFavorite } = useAppContext();
  const isFavorite = favoriteIds.includes(service.id);

  const handleFavorite = (event) => {
    event.stopPropagation();
    toggleFavorite(service.id);
  };

  return (
    <article className="service-card" onClick={() => navigate('/booking', { state: { service } })}>
      <button className={`favorite-button ${isFavorite ? 'active' : ''}`} type="button" onClick={handleFavorite}>
        {isFavorite ? 'Saved' : 'Save'}
      </button>
      <img src={service.image} alt={service.name} />
      <div className="service-card-body">
        <div>
          <h3>{service.name}</h3>
          <p>{service.description}</p>
        </div>
        <div className="service-meta">
          <span>${service.price}</span>
          <small>{service.duration}</small>
        </div>
      </div>
    </article>
  );
};

export default ServiceCard;

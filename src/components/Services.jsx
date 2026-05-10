import { useAppContext } from '../context/AppContext';
import ServiceCard from './ServiceCard';

const Services = () => {
  const { services } = useAppContext();

  return (
    <section className="services" id="services">
      <div className="section-heading">
        <span className="eyebrow">Beauty menu</span>
        <h2>Services made for soft glam days</h2>
        <p>Pick a treatment, see pricing up front, and move straight into booking.</p>
      </div>
      <div className="services-grid">
        {services.map(service => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </section>
  );
};

export default Services;

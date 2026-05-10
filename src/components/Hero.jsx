import { Link } from 'react-router-dom';

function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-copy">
        <span className="eyebrow">Luxury salon booking</span>
        <h1>Glow up appointments, styled beautifully.</h1>

        <p>
          Browse signature services, choose your stylist, reserve a time, and
          manage salon bookings from one soft, polished app.
        </p>

        <div className="hero-actions">
          <Link className="button primary" to="/booking">Book Appointment</Link>
          <a className="button ghost" href="#services">Explore Services</a>
        </div>

        <div className="hero-stats" aria-label="Salon highlights">
          <span><strong>4.9</strong> rating</span>
          <span><strong>1.2k+</strong> clients</span>
          <span><strong>12</strong> stylists</span>
        </div>
      </div>

      <div className="hero-visual">
        <img src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80" alt="Zaynab's Salon beauty styling preview" />
        <div className="floating-card">
          <span>Next slot</span>
          <strong>Today, 3:30 PM</strong>
          <small>Rose Glow Facial</small>
        </div>
      </div>
    </section>
  );
}

export default Hero;

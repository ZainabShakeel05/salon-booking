import Hero from '../components/Hero';
import Services from '../components/Services';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <main>
      <Hero />
      <Services />
      <section className="feature-band">
        <div>
          <span className="eyebrow">Full app features</span>
          <h2>Everything a salon needs to feel booked, not busy.</h2>
        </div>
        <div className="feature-grid">
          <article>
            <span>01</span>
            <h3>Smart booking</h3>
            <p>Service, date, time, notes, stylist preference, and instant confirmation.</p>
          </article>
          <article>
            <span>02</span>
            <h3>Client profiles</h3>
            <p>Track contact details, favorites, preferences, and visit history.</p>
          </article>
          <article>
            <span>03</span>
            <h3>Admin flow</h3>
            <p>Filter bookings, update status, and watch daily salon activity at a glance.</p>
          </article>
        </div>
      </section>
      <section className="match-teaser">
        <div>
          <span className="eyebrow">A little magic</span>
          <h2>Not sure what to book?</h2>
          <p>Try Beauty Match or build a Beauty Mood Board. The app recommends a service and sends the full look plan into booking.</p>
        </div>
        <div className="teaser-actions">
          <Link className="button primary" to="/mood-board">Build Mood Board</Link>
          <Link className="button ghost" to="/match">Find My Match</Link>
        </div>
      </section>
      <section className="packages-section">
        <div className="section-heading">
          <span className="eyebrow">Packages</span>
          <h2>Pretty plans for repeat clients</h2>
        </div>
        <div className="package-grid">
          <article>
            <h3>Glow Monthly</h3>
            <p>Facial, manicure, and member-only booking priority.</p>
            <strong>$129/mo</strong>
          </article>
          <article>
            <h3>Bridal Bloom</h3>
            <p>Trial makeup, final glam, hair styling, and skin prep calendar.</p>
            <strong>$399</strong>
          </article>
          <article>
            <h3>Weekend Glam</h3>
            <p>Blowout, soft glam makeup, lashes, and photo-ready finishing.</p>
            <strong>$175</strong>
          </article>
        </div>
      </section>
    </main>
  );
};

export default Home;

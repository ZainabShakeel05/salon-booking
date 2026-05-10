import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const MySalon = () => {
  const { appointments, deleteAppointment, favoriteIds, services, currentUser } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();
  const favoriteServices = services.filter(service => favoriteIds.includes(service.id));
  const myAppointments = appointments.filter(appointment => appointment.customerId === currentUser.id);
  const upcomingAppointments = [...myAppointments].sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`));
  const visits = myAppointments.filter(appointment => appointment.status === 'confirmed').length;
  const loyaltyProgress = Math.min(100, visits * 20);

  return (
    <main className="my-salon-page">
      <section className="my-salon-header">
        <div>
          <span className="eyebrow">Client space</span>
          <h1>My Salon</h1>
          <p>Hi {currentUser.name}. See your saved services, booking history, loyalty progress, and quick actions in one place.</p>
          {location.state?.updated && <strong className="toast-note">Appointment updated.</strong>}
          {location.state?.denied && <strong className="form-error inline-error">Admin access is only available to admin users.</strong>}
        </div>
        <Link className="button primary" to="/booking">New Booking</Link>
      </section>

      <section className="profile-grid">
        <article className="profile-card">
          <span>Loyalty glow</span>
          <strong>{visits}/5 visits</strong>
          <div className="progress-track">
            <div style={{ width: `${loyaltyProgress}%` }} />
          </div>
          <p>Confirm five visits to unlock a complimentary mini nail refresh.</p>
        </article>
        <article className="profile-card">
          <span>Saved services</span>
          <strong>{favoriteServices.length}</strong>
          <p>Use Save on service cards to build your personal beauty shelf.</p>
        </article>
        <article className="profile-card">
          <span>Total bookings</span>
          <strong>{myAppointments.length}</strong>
          <p>Bookings are stored locally in your browser for this demo app.</p>
        </article>
      </section>

      <section className="saved-services">
        <div className="section-heading">
          <span className="eyebrow">Beauty shelf</span>
          <h2>Saved favorites</h2>
        </div>
        {favoriteServices.length === 0 ? (
          <div className="empty-state">
            <h2>No saved services yet</h2>
            <p>Go to Home and save the treatments you want to try next.</p>
          </div>
        ) : (
          <div className="mini-service-grid">
            {favoriteServices.map(service => (
              <article key={service.id}>
                <img src={service.image} alt={service.name} />
                <h3>{service.name}</h3>
                <p>{service.duration} · ${service.price}</p>
                <button type="button" onClick={() => navigate('/booking', { state: { service } })}>Book</button>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="client-appointments">
        <div className="section-heading">
          <span className="eyebrow">Appointments</span>
          <h2>Your booking timeline</h2>
        </div>
        {upcomingAppointments.length === 0 ? (
          <div className="empty-state">
            <h2>No bookings yet</h2>
            <p>Take the Beauty Match quiz or book a service to start your timeline.</p>
          </div>
        ) : (
          <div className="appointment-cards">
            {upcomingAppointments.map(appointment => (
              <article key={appointment.id}>
                <div>
                  <span className={`pill ${appointment.status}`}>{appointment.status}</span>
                  <h3>{appointment.service}</h3>
                  <p>{appointment.date} at {appointment.time} with {appointment.stylist}</p>
                  <small>{appointment.occasion || appointment.notes || 'No extra details added'}</small>
                </div>
                <div className="appointment-actions">
                  <button type="button" onClick={() => navigate('/booking', { state: { appointment } })}>Reschedule</button>
                  <button className="danger-button" type="button" onClick={() => deleteAppointment(appointment.id)}>Cancel</button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default MySalon;

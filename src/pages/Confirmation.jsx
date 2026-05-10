import { Link, useLocation, useNavigate } from 'react-router-dom';

const Confirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <main className="confirmation">
      <span className="success-mark">OK</span>
      <span className="eyebrow">You are booked</span>
      <h1>Appointment confirmed beautifully.</h1>
      <p>Thank you for booking with Zaynab&apos;s Salon. Your appointment #{location.state?.appointmentId || 'new'} is saved and ready to manage from your client space.</p>
      <div className="confirmation-actions">
        <button onClick={() => navigate('/')}>Back Home</button>
        <Link className="button ghost" to="/my-salon">My Salon</Link>
        <Link className="button ghost" to="/admin">Admin</Link>
      </div>
    </main>
  );
};

export default Confirmation;

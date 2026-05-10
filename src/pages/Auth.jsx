import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Auth = ({ mode }) => {
  const isSignup = mode === 'signup';
  const { login, signup } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const redirectTo = location.state?.from || '/my-salon';
  const redirectState = location.state?.bookingState || null;

  const handleChange = (event) => {
    setFormData(current => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const result = isSignup ? signup(formData) : login(formData);

    if (!result.ok) {
      setError(result.message);
      return;
    }

    navigate(result.user.role === 'admin' ? '/admin' : redirectTo, { replace: true, state: redirectState });
  };

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div>
          <span className="eyebrow">{isSignup ? 'Create account' : 'Welcome back'}</span>
          <h2>{isSignup ? "Join Zaynab's Salon" : "Login to Zaynab's Salon"}</h2>
          <p>
            {isSignup
              ? 'Save favorites, manage appointments, and build your personal beauty timeline.'
              : 'Customers can manage bookings. Admins can open the salon dashboard.'}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {isSignup && (
            <label>
              Name
              <input name="name" type="text" placeholder="Your name" value={formData.name} onChange={handleChange} required />
            </label>
          )}
          <label>
            Email
            <input name="email" type="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} required />
          </label>
          <label>
            Password
            <input name="password" type="password" placeholder="Your password" value={formData.password} onChange={handleChange} required minLength="4" />
          </label>
          {error && <strong className="form-error">{error}</strong>}
          <button type="submit">{isSignup ? 'Create Account' : 'Login'}</button>
        </form>

        <div className="auth-switch">
          {isSignup ? (
            <p>Already have an account? <Link to="/login">Login</Link></p>
          ) : (
            <>
              <p>New customer? <Link to="/signup">Create an account</Link></p>
              <small>Demo admin: admin@salonpro.com / admin123</small>
            </>
          )}
        </div>
      </section>
    </main>
  );
};

export default Auth;

import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useAppContext } from '../context/AppContext';

const BookingForm = () => {
  const { services, addAppointment, updateAppointment, currentUser } = useAppContext();
  const location = useLocation();
  const navigate = useNavigate();
  const editingAppointment = location.state?.appointment;
  const matchedService = location.state?.service;
  const moodBoard = location.state?.moodBoard;

  const [formData, setFormData] = useState({
    name: editingAppointment?.name || currentUser?.name || '',
    phone: editingAppointment?.phone || '',
    service: matchedService?.id || services.find(service => service.name === editingAppointment?.service)?.id || '',
    date: editingAppointment?.date ? new Date(`${editingAppointment.date}T12:00:00`) : null,
    time: editingAppointment?.time || '',
    stylist: editingAppointment?.stylist || '',
    notes: editingAppointment?.notes || moodBoard?.notes || '',
    occasion: editingAppointment?.occasion || moodBoard?.occasion || '',
    reminder: editingAppointment?.reminder || 'sms'
  });

  const timeSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];
  const stylists = ['Any available stylist', 'Ariana - Hair artist', 'Mina - Skin specialist', 'Zara - Makeup artist', 'Lina - Nail stylist'];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, date });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const service = services.find(s => s.id === Number(formData.service));
    const appointment = {
      name: formData.name,
      phone: formData.phone,
      service: service.name,
      price: service.price,
      date: formData.date.toISOString().split('T')[0],
      time: formData.time,
      stylist: formData.stylist || 'Any available stylist',
      notes: formData.notes,
      occasion: formData.occasion,
      reminder: formData.reminder,
      moodBoard
    };

    if (editingAppointment) {
      updateAppointment(editingAppointment.id, appointment);
      navigate('/my-salon', { state: { updated: true } });
      return;
    }

    const appointmentId = addAppointment(appointment);
    navigate('/confirmation', { state: { appointmentId } });
  };

  return (
    <main className="booking-page">
      <section className="booking-intro">
        <span className="eyebrow">Reserve your chair</span>
        <h1>{editingAppointment ? 'Reschedule your glow' : 'Book a beauty appointment'}</h1>
        <p>Choose your service, preferred stylist, time, and any special notes. Your appointment appears instantly in the salon dashboard.</p>
        <div className="booking-perks">
          <span>No waiting calls</span>
          <span>Flexible slots</span>
          <span>Local saved bookings</span>
        </div>
      </section>

      <section className="booking-form">
        <h2>{editingAppointment ? 'Update details' : 'Appointment details'}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name
            <input type="text" name="name" placeholder="Your full name" value={formData.name} onChange={handleChange} required />
          </label>
          <label>
            Phone
            <input type="tel" name="phone" placeholder="+1 555 000 0000" value={formData.phone} onChange={handleChange} required />
          </label>
          <label>
            Service
            <select name="service" value={formData.service} onChange={handleChange} required>
              <option value="">Select service</option>
              {services.map(service => (
                <option key={service.id} value={service.id}>{service.name} - ${service.price}</option>
              ))}
            </select>
          </label>
          <label>
            Stylist
            <select name="stylist" value={formData.stylist} onChange={handleChange}>
              <option value="">Any available stylist</option>
              {stylists.map(stylist => (
                <option key={stylist} value={stylist}>{stylist}</option>
              ))}
            </select>
          </label>
          <label>
            Date
            <DatePicker selected={formData.date} onChange={handleDateChange} minDate={new Date()} placeholderText="Select date" required />
          </label>
          <label>
            Time
            <select name="time" value={formData.time} onChange={handleChange} required>
              <option value="">Select time</option>
              {timeSlots.map(slot => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </select>
          </label>
          <label className="full-field">
            Notes
            <textarea name="notes" placeholder="Hair length, skin concerns, event type..." value={formData.notes} onChange={handleChange} rows="4" />
          </label>
          <label>
            Occasion
            <input type="text" name="occasion" placeholder="Brunch, wedding, photoshoot..." value={formData.occasion} onChange={handleChange} />
          </label>
          <label>
            Reminder
            <select name="reminder" value={formData.reminder} onChange={handleChange}>
              <option value="sms">SMS reminder</option>
              <option value="call">Phone call</option>
              <option value="email">Email reminder</option>
            </select>
          </label>
          <button type="submit">{editingAppointment ? 'Save Changes' : 'Confirm Booking'}</button>
        </form>
      </section>
    </main>
  );
};

export default BookingForm;

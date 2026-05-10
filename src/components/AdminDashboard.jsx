import { useState } from 'react';
import { useAppContext } from '../context/AppContext';

const AdminDashboard = () => {
  const { appointments, updateAppointmentStatus, updateAppointmentPayment, deleteAppointment } = useAppContext();
  const [filter, setFilter] = useState('all');

  const filteredAppointments = filter === 'all' ? appointments : appointments.filter(app => app.status === filter);
  const confirmed = appointments.filter(app => app.status === 'confirmed').length;
  const pending = appointments.filter(app => app.status === 'pending').length;
  const revenue = appointments
    .filter(app => app.paymentStatus === 'paid')
    .reduce((total, app) => total + (app.price || 0), 0);

  const handleStatusChange = (id, status) => {
    updateAppointmentStatus(id, status);
  };

  const handlePaymentChange = (id, paymentStatus) => {
    updateAppointmentPayment(id, paymentStatus);
  };

  return (
    <main className="admin-dashboard">
      <section className="admin-header">
        <div>
          <span className="eyebrow">Salon manager</span>
          <h1>Today&apos;s beauty desk</h1>
          <p>Track appointments, confirm clients, and keep the studio schedule calm.</p>
        </div>
        <label className="filter-control">
          Filter
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </label>
      </section>

      <div className="admin-stats">
        <article><span>Total bookings</span><strong>{appointments.length}</strong></article>
        <article><span>Confirmed</span><strong>{confirmed}</strong></article>
        <article><span>Pending</span><strong>{pending}</strong></article>
        <article><span>Est. revenue</span><strong>${revenue}</strong></article>
      </div>

      <section className="appointments-panel">
        {filteredAppointments.length === 0 ? (
          <div className="empty-state">
            <h2>No appointments yet</h2>
            <p>New client bookings will appear here as soon as they reserve a slot.</p>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Client</th>
                <th>Service</th>
                <th>Stylist</th>
                <th>Date</th>
                <th>Status</th>
                <th>Payment</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map(app => (
                <tr key={app.id}>
                  <td>
                    <strong>{app.name}</strong>
                    <span>{app.phone}</span>
                  </td>
                  <td>
                    <strong>{app.service}</strong>
                    <span>{app.notes || 'No special notes'}</span>
                  </td>
                  <td>{app.stylist || 'Any stylist'}</td>
                  <td>
                    <strong>{app.date}</strong>
                    <span>{app.time}</span>
                  </td>
                  <td>
                    <select className={`status ${app.status}`} value={app.status} onChange={(e) => handleStatusChange(app.id, e.target.value)}>
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td>
                    <select className={`status ${app.paymentStatus || 'unpaid'}`} value={app.paymentStatus || 'unpaid'} onChange={(e) => handlePaymentChange(app.id, e.target.value)}>
                      <option value="unpaid">Unpaid</option>
                      <option value="deposit">Deposit</option>
                      <option value="paid">Paid</option>
                    </select>
                  </td>
                  <td>
                    <button className="danger-button" onClick={() => deleteAppointment(app.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </main>
  );
};

export default AdminDashboard;

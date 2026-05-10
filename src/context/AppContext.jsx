import { createContext, useContext, useState } from 'react';

const AppContext = createContext();
const ADMIN_EMAIL = 'admin@salonpro.com';
const ADMIN_PASSWORD = 'admin123';

const getStoredUsers = () => {
  const stored = localStorage.getItem('salonUsers');
  const users = stored ? JSON.parse(stored) : [];
  const hasAdmin = users.some(user => user.email === ADMIN_EMAIL);

  if (hasAdmin) {
    return users;
  }

  const seededUsers = [
    ...users,
    {
      id: 'admin-1',
      name: 'Salon Admin',
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      role: 'admin'
    }
  ];
  localStorage.setItem('salonUsers', JSON.stringify(seededUsers));
  return seededUsers;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [users, setUsers] = useState(getStoredUsers);
  const [currentUser, setCurrentUser] = useState(() => {
    const stored = localStorage.getItem('salonCurrentUser');
    return stored ? JSON.parse(stored) : null;
  });

  const [services] = useState([
    {
      id: 1,
      name: 'Signature Hair Styling',
      price: 50,
      duration: '45 min',
      description: 'Fresh cut, blowout, and soft finish tailored to your face shape.',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=900&q=80'
    },
    {
      id: 2,
      name: 'Rose Glow Facial',
      price: 80,
      duration: '60 min',
      description: 'Hydrating cleanse, massage, mask, and dewy-skin finishing care.',
      image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=80'
    },
    {
      id: 3,
      name: 'Soft Glam Makeup',
      price: 100,
      duration: '75 min',
      description: 'Elegant party, bridal trial, or camera-ready makeup with lashes.',
      image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80'
    },
    {
      id: 4,
      name: 'Blush Manicure',
      price: 40,
      duration: '40 min',
      description: 'Nail shaping, cuticle care, polish, and glossy hand treatment.',
      image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=900&q=80'
    },
    {
      id: 5,
      name: 'Bridal Beauty Plan',
      price: 220,
      duration: '2 hr',
      description: 'Full bridal consult with hair, skin prep, makeup, and final styling.',
      image: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=900&q=80'
    },
    {
      id: 6,
      name: 'Spa Pedicure',
      price: 55,
      duration: '50 min',
      description: 'Relaxing soak, scrub, massage, polish, and heel-softening care.',
      image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=900&q=80'
    }
  ]);

  const [appointments, setAppointments] = useState(() => {
    const stored = localStorage.getItem('appointments');
    return stored ? JSON.parse(stored) : [];
  });

  const getFavoriteKey = (user = currentUser) => user ? `favoriteServices:${user.id}` : 'favoriteServices:guest';

  const [favoriteIds, setFavoriteIds] = useState(() => {
    const stored = localStorage.getItem(getFavoriteKey());
    return stored ? JSON.parse(stored) : [];
  });

  const saveAppointments = (updated) => {
    setAppointments(updated);
    localStorage.setItem('appointments', JSON.stringify(updated));
  };

  const saveFavorites = (updated) => {
    setFavoriteIds(updated);
    localStorage.setItem(getFavoriteKey(), JSON.stringify(updated));
  };

  const saveCurrentUser = (user) => {
    setCurrentUser(user);
    localStorage.setItem('salonCurrentUser', JSON.stringify(user));
    const storedFavorites = localStorage.getItem(getFavoriteKey(user));
    setFavoriteIds(storedFavorites ? JSON.parse(storedFavorites) : []);
  };

  const signup = ({ name, email, password }) => {
    const normalizedEmail = email.trim().toLowerCase();
    const exists = users.some(user => user.email === normalizedEmail);

    if (exists) {
      return { ok: false, message: 'An account already exists with this email.' };
    }

    const user = {
      id: `user-${Date.now()}`,
      name: name.trim(),
      email: normalizedEmail,
      password,
      role: 'customer'
    };
    const updatedUsers = [...users, user];
    setUsers(updatedUsers);
    localStorage.setItem('salonUsers', JSON.stringify(updatedUsers));
    saveCurrentUser(user);
    return { ok: true, user };
  };

  const login = ({ email, password }) => {
    const normalizedEmail = email.trim().toLowerCase();
    const user = users.find(account => account.email === normalizedEmail && account.password === password);

    if (!user) {
      return { ok: false, message: 'Email or password is incorrect.' };
    }

    saveCurrentUser(user);
    return { ok: true, user };
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('salonCurrentUser');
    const storedFavorites = localStorage.getItem('favoriteServices:guest');
    setFavoriteIds(storedFavorites ? JSON.parse(storedFavorites) : []);
  };

  const addAppointment = (appointment) => {
    const newAppointment = {
      ...appointment,
      id: Date.now(),
      customerId: currentUser?.id || 'guest',
      customerName: currentUser?.name || appointment.name,
      customerEmail: currentUser?.email || '',
      status: 'pending',
      paymentStatus: 'unpaid',
      createdAt: new Date().toISOString()
    };
    const updated = [...appointments, newAppointment];
    saveAppointments(updated);
    return newAppointment.id;
  };

  const updateAppointmentStatus = (id, status) => {
    const updated = appointments.map(app => app.id === id ? { ...app, status } : app);
    saveAppointments(updated);
  };

  const updateAppointmentPayment = (id, paymentStatus) => {
    const updated = appointments.map(app => app.id === id ? { ...app, paymentStatus } : app);
    saveAppointments(updated);
  };

  const updateAppointment = (id, appointment) => {
    const updated = appointments.map(app => app.id === id ? { ...app, ...appointment } : app);
    saveAppointments(updated);
  };

  const deleteAppointment = (id) => {
    const updated = appointments.filter(app => app.id !== id);
    saveAppointments(updated);
  };

  const toggleFavorite = (serviceId) => {
    const updated = favoriteIds.includes(serviceId)
      ? favoriteIds.filter(id => id !== serviceId)
      : [...favoriteIds, serviceId];
    saveFavorites(updated);
  };

  return (
    <AppContext.Provider value={{
      services,
      users,
      currentUser,
      appointments,
      favoriteIds,
      signup,
      login,
      logout,
      addAppointment,
      updateAppointment,
      updateAppointmentStatus,
      updateAppointmentPayment,
      deleteAppointment,
      toggleFavorite
    }}>
      {children}
    </AppContext.Provider>
  );
};

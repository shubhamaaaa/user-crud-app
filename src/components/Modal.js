
import { useState, useEffect } from 'react';

function Modal({ isOpen, onClose, user, onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    username: '',
    address: { street: '', city: '' },
    company: { name: '' },
    website: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setFormData({
        ...user,
        username: user.username || `USER-${user.name.split(' ')[0]}` // Autofill username if new
      });
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
        username: '', // Autofilled later
        address: { street: '', city: '' },
        company: { name: '' },
        website: ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('address.')) {
      const key = name.split('.')[1];
      setFormData({
        ...formData,
        address: { ...formData.address, [key]: value }
      });
    } else if (name.startsWith('company.')) {
      const key = name.split('.')[1];
      setFormData({
        ...formData,
        company: { ...formData.company, [key]: value }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name || formData.name.length < 3) {
      newErrors.name = 'Name is required and must be at least 3 characters long.';
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailPattern.test(formData.email)) {
      newErrors.email = 'Valid email is required.';
    }

    // Phone validation 
    const phonePattern = /^[0-9]{10}$/; // Example: 10 digit phone number
    if (!formData.phone || !phonePattern.test(formData.phone)) {
      newErrors.phone = 'Valid phone number is required (10 digits).';
    }

    // Username validation 
    if (!formData.username || formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters long.';
    }

    // Address validation
    if (!formData.address.street || !formData.address.city) {
      newErrors.address = 'Street and city are required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(formData);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
        <h2 className="text-xl font-bold mb-4">{user ? 'Edit User' : 'Create User'}</h2>
        <form onSubmit={handleSubmit}>
          {/* Form fields */}
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              disabled
              className="w-full p-2 border rounded-lg bg-gray-100"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Address</label>
            <input
              type="text"
              name="address.street"
              value={formData.address.street}
              onChange={handleChange}
              placeholder="Street"
              className="w-full p-2 border rounded-lg mb-2"
            />
            <input
              type="text"
              name="address.city"
              value={formData.address.city}
              onChange={handleChange}
              placeholder="City"
              className="w-full p-2 border rounded-lg"
            />
            {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Company</label>
            <input
              type="text"
              name="company.name"
              value={formData.company.name}
              onChange={handleChange}
              placeholder="Company Name"
              className="w-full p-2 border rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Website</label>
            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>

          <div className="flex justify-end">
            <button 
              type="button" 
              onClick={onClose} 
              className="mr-4 bg-gray-500 text-white px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
              {user ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Modal;

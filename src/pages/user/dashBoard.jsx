import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchAddresses,addAddress,deleteAddress,updateAddress } from '../../services/dashboardService';
import "../../styles/dashBoard.css";
import "react-toastify/dist/ReactToastify.css";


function Dashboard() {
  const [formData, setFormData] = useState({
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: ''
  });

  const [addresses, setAddresses] = useState([]);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedForOrderIndex, setSelectedForOrderIndex] = useState(null);
  const [hideDashboard, setHideDashboard] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem('email');
    fetchAddresses(email)
      .then(data => setAddresses(data))
      .catch(error => console.error(error));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const email = localStorage.getItem('email');
      await addAddress(email, formData);
      fetchAddresses(email)
        .then(data => setAddresses(data))
        .catch(error => console.error(error));
      setFormData({
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        postalCode: '',
      });
      setShowAddForm(false);
    } catch (error) {
      console.error('Error adding address:', error);
    }
  };

  const handleDelete = async (index) => {
    try {
      const email = localStorage.getItem('email');
      const addressId = addresses[index]._id;
      await deleteAddress(email, addressId);
      fetchAddresses(email)
        .then(data => setAddresses(data))
        .catch(error => console.error(error));
      setSelectedAddressIndex(null);
    } catch (error) {
      console.error('Error deleting address:', error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (selectedAddressIndex !== null) {
      try {
        const email = localStorage.getItem('email');
        const addressId = addresses[selectedAddressIndex]._id;
        await updateAddress(email, addressId, formData);
        fetchAddresses(email)
          .then(data => setAddresses(data))
          .catch(error => console.error(error));
        setSelectedAddressIndex(null);
        setFormData({
          addressLine1: '',
          addressLine2: '',
          city: '',
          state: '',
          postalCode: '',
        });
        setShowUpdateForm(false);
      } catch (error) {
        console.error('Error updating address:', error);
      }
    }
  };

  const handleSelectAddress = (index) => {
    setSelectedAddressIndex(index);
    const selectedAddress = addresses[index];
    setFormData({
      addressLine1: selectedAddress.addressLine1,
      addressLine2: selectedAddress.addressLine2,
      city: selectedAddress.city,
      state: selectedAddress.state,
      postalCode: selectedAddress.postalCode
    });
    setShowUpdateForm(true);
  };

  const handleSelectForOrder = (index) => {
    setSelectedForOrderIndex(index);
  };

  const handlePlaceOrder = async () => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    const userId = localStorage.getItem('userId');
    const selectedAddress = addresses[selectedForOrderIndex];

    const orderDetails = {
      items: cart.map(item => ({
        productId: item._id,
        quantity: item.quantity,
        total: item.price * item.quantity
      })),
      address: selectedAddress
    };

    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/orders?userId=${userId}`, orderDetails, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      toast.success("Order placed Successfully");
      setHideDashboard(true);
      navigate('/profile');
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  return (
    <>
    {!hideDashboard && (
      <div className='dashBoard'>
        <div className='address-section'>
          <h2>Delivery Addresses</h2>
          {addresses && addresses.length > 0 ? (
            <ul className='address-list'>
              {addresses.map((address, index) => (
                <li key={index} className={`address-card ${selectedAddressIndex === index ? 'selected' : ''}`}>
                  <div className="address-header">
                    <input
                      type="radio"
                      name="selectAddress"
                      checked={selectedForOrderIndex === index}
                      onChange={() => handleSelectForOrder(index)}
                    />
                    <div className="address-info">
                      <p>{address.addressLine1}</p>
                      <p>{address.addressLine2}</p>
                      <p>{address.city}, {address.state} - {address.postalCode}</p>
                    </div>
                    <button className="edit-btn" onClick={() => handleSelectAddress(index)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDelete(index)}>Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No addresses found</p>
          )}
          {showUpdateForm && selectedAddressIndex !== null && (
            <div className='update-section'>
              <h2>Update Address</h2>
              <form onSubmit={handleUpdate} className='address-form'>
                <input type="text" name="addressLine1" value={formData.addressLine1} onChange={handleChange} placeholder="Address Line 1" required />
                <input type="text" name="addressLine2" value={formData.addressLine2} onChange={handleChange} placeholder="Address Line 2" />
                <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" required />
                <input type="text" name="state" value={formData.state} onChange={handleChange} placeholder="State" required />
                <input type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} placeholder="Postal Code" required />
                <div className='form-buttons'>
                  <button type="submit">Update</button>
                  <button type="button" onClick={() => setShowUpdateForm(false)}>Cancel</button>
                </div>
              </form>
            </div>
          )}
        </div>
        {showAddForm ? (
          <form onSubmit={handleSubmit} className='address-form'>
            <input type="text" name="addressLine1" value={formData.addressLine1} onChange={handleChange} placeholder="Address Line 1" required />
            <input type="text" name="addressLine2" value={formData.addressLine2} onChange={handleChange} placeholder="Address Line 2" />
            <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" required />
            <input type="text" name="state" value={formData.state} onChange={handleChange} placeholder="State" required />
            <input type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} placeholder="Postal Code" required />
            <div className='form-buttons'>
              <button type="submit">Add Address</button>
              <button type="button" onClick={() => setShowAddForm(false)}>Cancel</button>
            </div>
          </form>
        ) : (
          <button className='add-address' onClick={() => setShowAddForm(true)}>
            <i className="fas fa-plus"></i> Add a new address
          </button>
        )}
        {selectedForOrderIndex !== null && (
          <div className="placeorder">
            <button onClick={handlePlaceOrder}>Place Order</button>
          </div>
        )}
      </div>
       )}
    </>
  );
}

export default Dashboard;

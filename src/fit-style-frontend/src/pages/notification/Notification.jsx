import React, { useState, useEffect } from 'react';
import './Notification.css';

import { onMessage } from 'firebase/messaging';
import { messaging } from '../../config/firebase/Firebase';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

   // Load notifications from local storage on mount
  useEffect(() => {
    const storedNotifications = JSON.parse(localStorage.getItem('notifications')) || [];
    setNotifications(storedNotifications);
  }, []);

  // Save notifications to local storage when notifications state changes
  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      setNotifications((prev) => [...prev, payload.notification]);
    });
    const handleClickOutside = (event) => {
        if (!event.target.closest('.notification-wrapper')) {
          setIsOpen(false);
        }
      };
  
      document.addEventListener('click', handleClickOutside);
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
  }, []);

  const handleIconClick = () => {
    setIsOpen(!isOpen);
  };

  const handleClearNotifications = () => {
    setNotifications([]);
    setIsOpen(false);
  };

  const handleRemoveNotification = (index) => {
    setNotifications((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="notification-wrapper">
      <div className="notification-icon" onClick={handleIconClick}>
        <span className="icon">&#128276;</span>
        {notifications.length > 0 && <span className="badge">{notifications.length}</span>}
      </div>
      {isOpen && (
        <div className="notification-dropdown">
          <div className="dropdown-header">
            <h4>알림</h4>
            <button onClick={handleClearNotifications} className="clear-btn">Clear All</button>
          </div>
          {notifications.length === 0 ? (
            <p className="no-notifications">새로운 알림이 없습니다</p>
          ) : (
            notifications.map((notification, index) => (
              <div key={index} className="notification-item">
                <div className="notification-content">
                  <h5>{notification.title}</h5>
                  <p>{notification.body}</p>
                </div>
                <button onClick={() => handleRemoveNotification(index)} className="remove-btn">Remove</button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Notification;

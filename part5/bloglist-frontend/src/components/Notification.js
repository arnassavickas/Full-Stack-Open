import React from 'react';

const Notification = ({ notification }) => {
  if (notification.text === null) {
    return null;
  }
  return (
    <div
      id="notification"
      style={{
        backgroundColor: '#DDDDDD',
        border: `1px solid ${notification.color}`,
        padding: 10,
        marginBottom: '1rem',
        borderRadius: 10,
        fontSize: 20,
        fontFamily: 'monospace',
        color: notification.color,
      }}
    >
      {notification.text}
    </div>
  );
};

export default Notification;

import React, { useEffect, useState } from 'react';

const Toast = ({ message, visible, onClose }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (visible) {
      setShow(true); // Trigger slide-in animation

      const displayTimer = setTimeout(() => setShow(false), 2000); // Slide out after 2s

      const hideTimer = setTimeout(() => onClose(), 3500); // Remove after 3.5s total (1.5s slide-in + 2s display + 1.5s slide-out)

      return () => {
        clearTimeout(displayTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [visible, onClose]);

  return (
    <div
      className={`fixed bottom-5 right-5 bg-red-500 text-white p-3 rounded shadow-lg transition-all duration-1500 transform ${
        show ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}
    >
      {message}
    </div>
  );
};

export default Toast;

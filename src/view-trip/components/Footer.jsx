import React from 'react';
import { FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className='my-7 font-bold'>
      <h2 className='text-center'>
        Created By <a href="https://www.linkedin.com/in/sharanu-kumusagi" target="_blank" rel="noopener noreferrer">
          Sharanu Kumusagi <FaLinkedin className="inline ml-2 text-blue-600" />
        </a>
      </h2>
      <h2 className='text-center'>
        <a href="https://www.instagram.com/sharanu_srk" target="_blank" rel="noopener noreferrer">
          Follow on Instagram <FaInstagram className="inline ml-2 text-pink-500" />
        </a>
      </h2>
    </div>
  );
};

export default Footer;

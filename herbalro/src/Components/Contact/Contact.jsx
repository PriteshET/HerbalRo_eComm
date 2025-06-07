import React, { useState } from 'react';
import './Contact.css';
import iconmessage from '../../assets/message.png';
import mobile from '../../assets/phone.png';
import mail from '../../assets/mail.png';
import location from '../../assets/location.png';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Star } from 'lucide-react';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(0);
  const [formDisabled, setFormDisabled] = useState(false);

  const handleSubmit = (e) => {
      if (!rating) {
      alert("Please select a rating before submitting.");
      return;
    }
    e.preventDefault();
    axios
      .post('http://localhost:3001/', { name, email, message, rating })
      .then((result) => {
        console.log(result);
        toast.success('Message submitted successfully!');
        setFormDisabled(true);
      })
      .catch((err) => {
        console.log(err);
        toast.error('Something went wrong. Please try again later.');
      });
  };


  return (
    <div className='contact'>
      <ToastContainer />
      <div className='contact-col'>
        <h3>
          Send us a Message <img src={iconmessage} alt='icon' />
        </h3>
        <p>
          Feel free to reach out through contact form or find our contact information below. Your feedback, questions, and suggestions
          are important to us as we strive to provide exceptional service to our customers.
        </p>
        <ul>
          <li>
            <img src={mail} alt='mail' />
            Herbalro123@gmail.com
          </li>
          <li>
            <img src={mobile} alt='phone' />
            +91 9876543210
          </li>
          <li>
            <img src={location} alt='location' />
            12/3, ABC Colony, YZ Road,
            <br />
            Andheri, Mumbai 400060
          </li>
        </ul>
      </div>

      <div className='contact-col'>
        <form onSubmit={handleSubmit}>
          <label>Your Name</label>
          <input
            type='text'
            name='name'
            placeholder='Enter your Name'
            onChange={(e) => setName(e.target.value)}
            required
            disabled={formDisabled}
          />
          <label>Email Address</label>
          <input
            type='email'
            name='email'
            placeholder='Enter your Email Address'
            autoComplete='off'
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={formDisabled}
          />


          <label>Rate Us</label>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((num) => (
              <Star
                key={num}
                onClick={() => {
                  if (!formDisabled) setRating(num);
                }}
                required
                className={`h-6 w-6 cursor-pointer ${num <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
              />
            ))}
          </div>

          <label>Write your Message here</label>
          <textarea
            name='message'
            rows='6'
            placeholder='Enter your Ideas/Thoughts/Suggestions/Feedback here.'
            onChange={(e) => setMessage(e.target.value)}
            required
            disabled={formDisabled}
          ></textarea>
          <button type='submit' className='btn dark-btn' disabled={formDisabled}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;

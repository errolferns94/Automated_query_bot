import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://edaifaahzoreqvtzyrhg.supabase.co'; // Replace with your Supabase URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkYWlmYWFoem9yZXF2dHp5cmhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc1NjQ1NjcsImV4cCI6MjAzMzE0MDU2N30.XcLpGcacdQPv2JEkwAtlMT4ypdOpW0hjcH8gNozfXnY'; // Replace with your Supabase anon key
const supabase = createClient(supabaseUrl, supabaseKey);

const ContactForm = () => {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!firstName || !email || !message) {
      setError('All fields are required');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('contacts')
        .insert([{ first_name: firstName, email, message }]);

      if (error) {
        setError('Failed to send message');
        console.error('Supabase insert error:', error);
      } else {
        setSuccess('Message sent successfully!');
        setFirstName('');
        setEmail('');
        setMessage('');
      }
    } catch (error) {
      setError('Failed to send message');
      console.error('Submission error:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Fill the form to <span className="text-blue-500">contact us.</span></h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && <div className="text-green-500 mb-4">{success}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">First Name</label>
            <input
              type="text"
              className="w-full mt-2 p-2 border border-gray-300 rounded"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">E-mail</label>
            <input
              type="email"
              className="w-full mt-2 p-2 border border-gray-300 rounded"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">How can we help you?</label>
            <textarea
              className="w-full mt-2 p-2 border border-gray-300 rounded"
              placeholder="Describe your problem"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300">
            Send message
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactForm;

'use client';

import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, just show a success message
    // In a real implementation, you'd send this to an API
    setIsSubmitted(true);
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (isSubmitted) {
    return (
      <div>
        <h1>Contact</h1>
        <p>Thank you for your message! I&apos;ll get back to you soon.</p>
        <button 
          onClick={() => setIsSubmitted(false)}
          className="mt-4 px-4 py-2 border border-black hover:bg-black hover:text-white transition-colors"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1>Contact</h1>
      <p>
        I&apos;d love to hear from you. Send me a message and I&apos;ll get back to you as soon as possible.
      </p>
      
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div>
          <label htmlFor="name" className="block mb-2 font-medium">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 focus:outline-none focus:border-black"
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block mb-2 font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 focus:outline-none focus:border-black"
          />
        </div>
        
        <div>
          <label htmlFor="message" className="block mb-2 font-medium">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            className="w-full p-3 border border-gray-300 focus:outline-none focus:border-black resize-vertical"
          />
        </div>
        
        <button
          type="submit"
          className="px-6 py-3 bg-black text-white hover:bg-gray-800 transition-colors"
        >
          Send Message
        </button>
      </form>
    </div>
  );
} 
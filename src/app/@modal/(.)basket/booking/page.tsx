'use client';

import { useState } from 'react';

export default function Page() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const handleOrder = (e: any) => {
    e.preventDefault();
    if (!name || !email || !phone || !address) {
      alert('Барлық өрістерді толтырыңыз.');
      return;
    }

    window.location.href = '/';
    alert('Сіздің тапсырысыңыз қабылданды!');
  };

  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <form onSubmit={handleOrder} className="bg-white p-6 rounded-lg w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold">Тапсырыс беру</h2>
        <input
          required
          type="text"
          placeholder="Атыңыз"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          required
          type="email"
          placeholder="Электрондық пошта"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          required
          type="tel"
          placeholder="Телефон"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          required
          type="text"
          placeholder="Мекен-жай"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => (window.location.href = '/basket')}
            className="py-2 px-4 rounded bg-gray-500 text-white"
          >
            Болдырмау
          </button>
          <button type="submit" className="py-2 px-4 rounded bg-green-500 text-white">
            Тапсырыс беру
          </button>
        </div>
      </form>
    </div>
  );
}

'use client';
import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const page = () => {
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    try {
      const response = await axios.post(
        'http://localhost:8080/api/v1/players',
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      if (response.status === 201) {
        router.push('/')
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>name</h2>
      <input type='text' name='full_name' />
      <h2>phone</h2>
      <input type='text' name='phone' />
      <button type='submit'>Submit</button>
    </form>
  );
};

export default page;

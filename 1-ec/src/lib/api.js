// Centralized API client

const API_KEY = import.meta.env.VITE_RAPIDAPI_KEY;
const API_HOST = import.meta.env.VITE_RAPIDAPI_HOST;

const BASE_URL = `https://${API_HOST}`;

const headers = {
  'x-rapidapi-key': API_KEY,
  'x-rapidapi-host': API_HOST,
  'Content-Type': 'application/json'
};

export async function fetchProducts() {
  const response = await fetch(`${BASE_URL}/femalefootwear`, {
    method: 'GET',
    headers
  });
  
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  
  const result = await response.json();
  return result;
}

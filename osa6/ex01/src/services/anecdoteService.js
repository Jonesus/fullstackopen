const URL = 'http://localhost:3005/anecdotes';

const fetchAnecdotes = async () => {
  const response = await fetch(URL);
  const data = await response.json();
  return data;
};

export default { fetchAnecdotes };

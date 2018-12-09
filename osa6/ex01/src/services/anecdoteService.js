const URL = 'http://localhost:3005/anecdotes';

const fetchAnecdotes = async () => {
  const response = await fetch(URL);
  const data = await response.json();
  return data;
};

const postAnecdote = async data => {
  const response = await fetch(URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  const json = await response.json();
  return json;
};

const voteAnecdote = async data => {
  const response = await fetch(`${URL}/${data.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...data, votes: data.votes + 1 })
  });
  const json = await response.json();
  return json;
};

export default { fetchAnecdotes, postAnecdote, voteAnecdote };

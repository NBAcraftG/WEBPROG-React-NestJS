import { useEffect, useState } from 'react';
import axios from 'axios';

const API = '/api/guestbook';

function App() {
  const [messages, setMessages] = useState([]);
  const [form, setForm] = useState({ name: '', message: '' });

  const fetchMessages = async () => {
    const res = await axios.get(API);
    setMessages(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(API, form);
    setForm({ name: '', message: '' });
    fetchMessages();
  };

  const deleteMessage = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchMessages();
  };

  const updateMessage = async (id) => {
    const newMessage = prompt("Update your message:");
    if (newMessage) {
      await axios.put(`${API}/${id}`, { message: newMessage });
      fetchMessages();
    }
  };

  useEffect(() => { fetchMessages(); }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Personal Profile & Guestbook</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
        <input placeholder="Message" value={form.message} onChange={e => setForm({...form, message: e.target.value})} />
        <button type="submit">Sign Guestbook</button>
      </form>

      <ul>
        {messages.map(m => (
          <li key={m.id}>
            <strong>{m.name}:</strong> {m.message}
            <button onClick={() => updateMessage(m.id)}>Edit</button>
            <button onClick={() => deleteMessage(m.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default App;
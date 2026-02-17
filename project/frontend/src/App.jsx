import { useEffect, useState } from 'react';
import axios from 'axios';

const API = '/api/guestbook';

export default function App() {
  const [messages, setMessages] = useState([]);
  const [form, setForm] = useState({ name: '', message: '' });

  const fetchMessages = async () => {
    try {
      const res = await axios.get(API);
      setMessages(res.data);
    } catch (err) { console.error("Error fetching", err); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.message) return;
    await axios.post(API, form);
    setForm({ name: '', message: '' });
    fetchMessages();
  };

  const deleteMsg = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchMessages();
  };

  const updateMsg = async (id) => {
    const msg = prompt("Edit your message:");
    if (msg) {
      await axios.put(`${API}/${id}`, { message: msg });
      fetchMessages();
    }
  };

  useEffect(() => { fetchMessages(); }, []);

  return (
    <div className="container">
      <header className="hero">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWejGFY4Kdx4Kh9qJumGdCAWoTU14NtUwtsQ&s" className="profile-img" alt="Profile" />
        <h1>Personal Profile Web Page</h1>
      </header>

      <section className="card">
        <h2>About Me</h2>
        <p>Wassup y'all. I'm Kurt/NBAcraft, an aspiring Network Admin, Cybersecurity Analyst, and Cloud Security Analyst.</p>
      </section>

      <section className="card">
        <h2>IT Experience</h2>
        <ul>
          <li>Fundamental skills in Cisco Packet Tracer</li>
          <li>Fundamental skills in Programming (Java, Python)</li>
          <li>Fundamental skills in Linux CLI commands</li>
          <li>Fundamental skills in SQL Workbench</li>
        </ul>
      </section>

      <section className="card">
        <h2>Picture Gallery</h2>
        <div className="gallery-grid">
          {['https://thirdimpactanime.com/wp-content/uploads/2018/04/wotakoi.png', 'https://cdn.wallpapersafari.com/60/15/XkY4aA.jpg', 'https://wallpapercave.com/wp/wp9597089.jpg'].map((img, i) => (
            <img key={i} src={img} className="gallery-img" alt="Gallery" />
          ))}
        </div>
      </section>

      {/* GUESTBOOK SECTION */}
      <section className="card">
        <h2>Guestbook</h2>
        <form className="gb-form" onSubmit={handleSubmit}>
          <input className="gb-input" placeholder="Your Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
          <input className="gb-input" placeholder="Leave a message..." value={form.message} onChange={e => setForm({...form, message: e.target.value})} />
          <button className="gb-btn" type="submit">Post Message</button>
        </form>

        <div className="messages-list">
          {messages.map(m => (
            <div key={m.id} className="gb-entry">
              <span><strong>{m.name}:</strong> {m.message}</span>
              <div className="action-btns">
                <button onClick={() => updateMsg(m.id)}>Edit</button>
                <button onClick={() => deleteMsg(m.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer style={{textAlign: 'center', padding: '2rem', opacity: 0.7}}>
        <p>© 2026 NBAcraft. All rights reserved.</p>
      </footer>
    </div>
  );
}
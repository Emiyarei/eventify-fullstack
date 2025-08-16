import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Dummy events
let events = [
  { id: 1, title: 'React Summit', date: '2025-08-20', time: '10:00', location: 'Online', category: 'Tech', attendees: 120 },
  { id: 2, title: 'Startup Pitch Night', date: '2025-09-05', time: '18:00', location: 'Lagos', category: 'Business', attendees: 75 },
  { id: 3, title: 'Yoga in the Park', date: '2025-08-25', time: '07:30', location: 'Ikeja Park', category: 'Health', attendees: 30 },
  { id: 4, title: 'Design Meetup', date: '2025-09-12', time: '16:00', location: 'Remote', category: 'Design', attendees: 48 }
];

app.get('/api/events', (req, res) => res.json(events));

app.post('/api/events', (req, res) => {
  const { title, date, time, location, category } = req.body;
  if (!title || !date) return res.status(400).json({ error: 'title and date required' });
  const ev = { id: Date.now(), title, date, time: time || '00:00', location: location || 'TBD', category: category || 'General', attendees: 0 };
  events.push(ev);
  res.status(201).json(ev);
});

app.put('/api/events/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const idx = events.findIndex(e=>e.id===id);
  if (idx === -1) return res.status(404).json({ error: 'not found' });
  events[idx] = { ...events[idx], ...req.body };
  res.json(events[idx]);
});

app.delete('/api/events/:id', (req, res) => {
  const id = parseInt(req.params.id);
  events = events.filter(e=>e.id!==id);
  res.json({ ok: true });
});

// Serve frontend
app.use(express.static(path.join(__dirname, 'client', 'build')));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')));

const PORT = process.env.PORT || 5100;
app.listen(PORT, () => console.log(`Eventify server running on port ${PORT}`));

import React, { useState } from 'react';
export default function EventForm({onAdd}){
  const [title,setTitle]=useState('');
  const [date,setDate]=useState('2025-09-01');
  const [time,setTime]=useState('10:00');
  const [location,setLocation]=useState('Online');
  const [category,setCategory]=useState('General');
  function submit(e){
    e.preventDefault();
    onAdd({title,date,time,location,category});
    setTitle('');
  }
  return (
    <div className="card">
      <h3>Create Event</h3>
      <form onSubmit={submit} style={{display:'grid',gap:8,marginTop:12}}>
        <input className="input" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
        <input className="input" type="date" value={date} onChange={e=>setDate(e.target.value)} />
        <input className="input" type="time" value={time} onChange={e=>setTime(e.target.value)} />
        <input className="input" placeholder="Location" value={location} onChange={e=>setLocation(e.target.value)} />
        <select value={category} onChange={e=>setCategory(e.target.value)}>
          <option>General</option><option>Tech</option><option>Business</option><option>Health</option><option>Design</option>
        </select>
        <button className="btn" type="submit">Add Event</button>
      </form>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { getEvents, addEvent, updateEvent, deleteEvent } from './api';
import EventForm from './components/EventForm';
import EventTable from './components/EventTable';
import { EventsByCategory, AttendeesByMonth } from './components/EventCharts';

export default function App(){
  const [events, setEvents] = useState([]);

  useEffect(()=>{ load(); }, []);

  async function load(){
    const res = await getEvents();
    setEvents(res.data);
  }

  async function handleAdd(payload){
    await addEvent(payload);
    load();
  }

  async function handleRSVP(id){
    const ev = events.find(e=>e.id===id);
    await updateEvent(id, { attendees: (ev.attendees||0)+1 });
    load();
  }

  async function handleDelete(id){
    await deleteEvent(id);
    load();
  }

  const total = events.length;
  const totalAtt = events.reduce((s,e)=>s+(e.attendees||0),0);

  return (
    <div className="container">
      <div className="header">
        <h1>Eventify — Event Management</h1>
        <div style={{color:'#6b7280'}}>Create events • RSVP • Charts</div>
      </div>

      <div className="grid">
        <div>
          <EventTable items={events} onRSVP={handleRSVP} onDelete={handleDelete} />
        </div>
        <div>
          <EventForm onAdd={handleAdd} />
          <div className="card" style={{marginTop:16}}>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
              <div><h3>By Category</h3><EventsByCategory items={events} /></div>
              <div><h3>Attendees by Month</h3><AttendeesByMonth items={events} /></div>
            </div>
          </div>
          <div className="card" style={{marginTop:16,display:'flex',justifyContent:'space-between'}}>
            <div><div style={{fontSize:12,color:'#6b7280'}}>Total Events</div><div style={{fontWeight:700,fontSize:20}}>{total}</div></div>
            <div><div style={{fontSize:12,color:'#6b7280'}}>Total Attendees</div><div style={{fontWeight:700,fontSize:20}}>{totalAtt}</div></div>
          </div>
        </div>
      </div>

      <div className="screens">
        <img src="/images/eventify_dashboard.png" alt="dashboard" />
        <img src="/images/eventify_calendar.png" alt="calendar" />
      </div>
    </div>
  );
}

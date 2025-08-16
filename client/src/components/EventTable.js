import React from 'react';
export default function EventTable({items,onRSVP,onDelete}){
  return (
    <div className="card">
      <h3>Upcoming Events</h3>
      <table className="table" style={{marginTop:12}}>
        <thead><tr><th>Title</th><th>Date</th><th>Time</th><th>Location</th><th>Category</th><th>Attendees</th><th></th></tr></thead>
        <tbody>
          {items.map(e=> (
            <tr key={e.id}>
              <td>{e.title}</td>
              <td>{e.date}</td>
              <td>{e.time}</td>
              <td>{e.location}</td>
              <td>{e.category}</td>
              <td>{e.attendees}</td>
              <td>
                <button className="btn" onClick={()=>onRSVP(e.id)}>RSVP +1</button>
                <button className="btn" style={{marginLeft:8,background:'#ef4444'}} onClick={()=>onDelete(e.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

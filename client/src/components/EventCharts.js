import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

export function EventsByCategory({items}){
  const map = {};
  items.forEach(e => map[e.category] = (map[e.category]||0)+1);
  const labels = Object.keys(map);
  const values = Object.values(map);
  const data = { labels, datasets: [{ label:'Events', data:values, backgroundColor:['#2563eb','#f59e0b','#10b981','#ef4444','#a78bfa'] }] };
  return <Pie data={data} />;
}

export function AttendeesByMonth({items}){
  const months = ['May','Jun','Jul','Aug','Sep','Oct'];
  const counts = [0,0,0,0,0,0];
  items.forEach(e => {
    const m = parseInt(e.date.split('-')[1],10);
    const idx = m-5; if (idx>=0 && idx<counts.length) counts[idx]+= e.attendees;
  });
  const data = { labels: months, datasets: [{ label:'Attendees', data: counts, backgroundColor: '#2563eb' }] };
  return <Bar data={data} />;
}

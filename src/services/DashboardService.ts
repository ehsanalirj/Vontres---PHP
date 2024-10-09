import SystemMetrics from '../models/SystemMetrics';
import Ticket from '../models/Ticket';

export async function getSystemMetrics() {
  const metrics = await SystemMetrics.find().sort({ timestamp: -1 }).limit(60); // Last hour of data

  return {
    labels: metrics.map(m => m.timestamp.toLocaleTimeString()),
    datasets: [
      {
        label: 'CPU Usage',
        data: metrics.map(m => m.cpuUsage),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      },
      {
        label: 'Memory Usage',
        data: metrics.map(m => m.memoryUsage),
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1
      },
      // Add more metrics as needed
    ]
  };
}

export async function getTicketStats() {
  const openTickets = await Ticket.countDocuments({ status: 'open' });
  const inProgressTickets = await Ticket.countDocuments({ status: 'in_progress' });
  const resolvedTickets = await Ticket.countDocuments({ status: 'resolved' });

  return {
    labels: ['Open', 'In Progress', 'Resolved'],
    datasets: [
      {
        label: 'Ticket Status',
        data: [openTickets, inProgressTickets, resolvedTickets],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1
      }
    ]
  };
}
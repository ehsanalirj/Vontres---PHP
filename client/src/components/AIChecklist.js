import React, { useState } from 'react';

const AIChecklist = () => {
  const [items, setItems] = useState([
    { id: 1, text: 'Greeting', status: 'pending' },
    { id: 2, text: 'Introduction', status: 'pending' },
    { id: 3, text: 'Pitch', status: 'pending' },
    { id: 4, text: 'Closing', status: 'pending' },
  ]);

  const updateStatus = (id, status) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, status } : item
    ));
  };

  return (
    <div className="ai-checklist">
      <h3>Call Checklist</h3>
      <ul>
        {items.map(item => (
          <li key={item.id} className={item.status}>
            {item.text}
            <button onClick={() => updateStatus(item.id, 'completed')}>Complete</button>
            <button onClick={() => updateStatus(item.id, 'skipped')}>Skip</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AIChecklist;
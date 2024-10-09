import React from 'react';
import { CheckSquare, Square, AlertTriangle } from 'lucide-react';

interface ChecklistItem {
  id: number;
  name: string;
  status: 'pending' | 'completed' | 'missed';
}

interface ChecklistProps {
  items: ChecklistItem[];
  setItems: React.Dispatch<React.SetStateAction<ChecklistItem[]>>;
}

const Checklist: React.FC<ChecklistProps> = ({ items, setItems }) => {
  const toggleItemStatus = (id: number) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id
          ? { ...item, status: item.status === 'completed' ? 'pending' : 'completed' }
          : item
      )
    );
  };

  return (
    <section className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Call Checklist</h2>
      <ul className="space-y-2">
        {items.map(item => (
          <li
            key={item.id}
            className={`flex items-center p-2 rounded cursor-pointer ${
              item.status === 'completed'
                ? 'bg-green-100'
                : item.status === 'missed'
                ? 'bg-red-100'
                : 'bg-gray-100'
            }`}
            onClick={() => toggleItemStatus(item.id)}
          >
            {item.status === 'completed' ? (
              <CheckSquare className="mr-2 text-green-600" size={20} />
            ) : item.status === 'missed' ? (
              <AlertTriangle className="mr-2 text-red-600" size={20} />
            ) : (
              <Square className="mr-2 text-gray-400" size={20} />
            )}
            <span
              className={
                item.status === 'completed'
                  ? 'text-green-800'
                  : item.status === 'missed'
                  ? 'text-red-800'
                  : 'text-gray-800'
              }
            >
              {item.name}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Checklist;
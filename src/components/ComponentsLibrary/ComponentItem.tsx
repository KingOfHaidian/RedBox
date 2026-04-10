import React from 'react';
import { useDrag } from 'react-dnd';
import { ComponentType } from '../../types';

interface ComponentItemProps {
  type: ComponentType;
  name: string;
  icon: React.ReactNode;
}

const ComponentItem: React.FC<ComponentItemProps> = ({ type, name, icon }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'COMPONENT',
    item: { type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`p-3 border border-gray-300 rounded-md mb-2 cursor-move transition-opacity ${isDragging ? 'opacity-50' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
    >
      <div className="flex items-center">
        <div className="mr-3">{icon}</div>
        <span className="text-sm">{name}</span>
      </div>
    </div>
  );
};

export default ComponentItem;
import React from 'react';
import { useAppContext } from '../../context/AppContext';

const CanvasList: React.FC = () => {
  const { state, dispatch } = useAppContext();

  const handleCanvasSelect = (canvasId: string) => {
    dispatch({ type: 'SET_CURRENT_CANVAS', payload: canvasId });
  };

  return (
    <div className="flex space-x-2 overflow-x-auto pb-2">
      {state.canvases.map(canvas => (
        <div
          key={canvas.id}
          onClick={() => handleCanvasSelect(canvas.id)}
          className={`px-4 py-2 rounded-md cursor-pointer transition-colors ${
            state.currentCanvasId === canvas.id
              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
              : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          {canvas.name}
        </div>
      ))}
    </div>
  );
};

export default CanvasList;
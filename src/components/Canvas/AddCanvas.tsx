import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { allPresets } from '../../utils/devicePresets';

const AddCanvas: React.FC = () => {
  const { dispatch, state } = useAppContext();
  const [width, setWidth] = useState('390');
  const [height, setHeight] = useState('844');

  const handleAddCanvas = () => {
    const newCanvas = {
      id: Date.now().toString(),
      name: `画布 ${state.canvases.length + 1}`,
      width: parseInt(width),
      height: parseInt(height),
      components: [],
    };
    dispatch({ type: 'ADD_CANVAS', payload: newCanvas });
  };

  const handlePresetSelect = (preset: { width: number; height: number }) => {
    setWidth(preset.width.toString());
    setHeight(preset.height.toString());
  };

  return (
    <div className="mt-4">
      <h3 className="text-sm font-medium mb-2">添加画布</h3>
      
      <div className="grid grid-cols-2 gap-2 mb-4">
        {allPresets.slice(0, 4).map((preset, index) => (
          <button
            key={index}
            onClick={() => handlePresetSelect(preset)}
            className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-md dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            {preset.name}
          </button>
        ))}
      </div>

      <div className="flex space-x-2 mb-4">
        <div className="flex-1">
          <label className="block text-xs mb-1">宽度</label>
          <input
            type="number"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            className="w-full px-2 py-1 text-xs border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-800"
          />
        </div>
        <div className="flex-1">
          <label className="block text-xs mb-1">高度</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full px-2 py-1 text-xs border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-800"
          />
        </div>
      </div>

      <button
        onClick={handleAddCanvas}
        className="w-full px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      >
        添加画布
      </button>
    </div>
  );
};

export default AddCanvas;
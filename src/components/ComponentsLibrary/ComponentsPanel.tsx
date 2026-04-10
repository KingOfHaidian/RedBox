import React from 'react';
import ComponentItem from './ComponentItem';

const ComponentsPanel: React.FC = () => {
  const components = [
    { type: 'square' as const, name: '方形', icon: <div className="w-6 h-6 border border-black"></div> },
    { type: 'circle' as const, name: '圆形', icon: <div className="w-6 h-6 border border-black rounded-full"></div> },
    { type: 'rectangle' as const, name: '长方形', icon: <div className="w-8 h-4 border border-black"></div> },
    { type: 'triangle' as const, name: '三角形', icon: <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-black"></div> },
    { type: 'text' as const, name: '文字块', icon: <div className="w-8 h-4 border border-black flex items-center justify-center text-xs">T</div> },
    { type: 'image' as const, name: '图片块', icon: <div className="w-8 h-6 border border-black flex items-center justify-center text-xs">IMG</div> },
    { type: 'input' as const, name: '文字输入块', icon: <div className="w-8 h-4 border border-black rounded flex items-center justify-center text-xs">I</div> },
    { type: 'filter' as const, name: '筛选块', icon: <div className="w-8 h-4 border border-black flex items-center justify-center text-xs">F</div> },
  ];

  return (
    <div>
      <h3 className="text-sm font-medium mb-3">基础组件</h3>
      <div className="space-y-2">
        {components.map((component) => (
          <ComponentItem
            key={component.type}
            type={component.type}
            name={component.name}
            icon={component.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default ComponentsPanel;
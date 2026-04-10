import React from 'react';
import { useAppContext } from '../../context/AppContext';

const PhonePreview: React.FC = () => {
  const { currentCanvas } = useAppContext();

  if (!currentCanvas) {
    return (
      <div className="flex items-center justify-center h-64 border border-gray-300 rounded-lg">
        <p className="text-sm text-gray-500">请选择或创建画布</p>
      </div>
    );
  }

  // 计算预览尺寸（保持比例）
  const phoneWidth = 280;
  const phoneHeight = phoneWidth * (currentCanvas.height / currentCanvas.width);

  return (
    <div className="flex flex-col items-center">
      {/* 手机外壳 */}
      <div className="relative bg-gray-900 rounded-3xl p-2 shadow-lg">
        {/* 手机屏幕 */}
        <div 
          className="bg-white border border-gray-300 rounded-2xl overflow-hidden"
          style={{
            width: phoneWidth,
            height: phoneHeight,
            position: 'relative',
          }}
        >
          {/* 预览内容 */}
          <div 
            className="w-full h-full relative"
            style={{
              transform: `scale(${phoneWidth / currentCanvas.width})`,
              transformOrigin: 'top left',
            }}
          >
            {currentCanvas.components.map((component) => {
              switch (component.type) {
                case 'square':
                case 'rectangle':
                  return (
                    <div
                      key={component.id}
                      style={{
                        position: 'absolute',
                        left: component.x,
                        top: component.y,
                        width: component.width,
                        height: component.height,
                        border: '1px solid black',
                      }}
                    />
                  );
                case 'circle':
                  return (
                    <div
                      key={component.id}
                      style={{
                        position: 'absolute',
                        left: component.x,
                        top: component.y,
                        width: component.width,
                        height: component.height,
                        border: '1px solid black',
                        borderRadius: '50%',
                      }}
                    />
                  );
                case 'triangle':
                  return (
                    <div
                      key={component.id}
                      style={{
                        position: 'absolute',
                        left: component.x,
                        top: component.y,
                        width: 0,
                        height: 0,
                        borderLeft: `${component.width / 2}px solid transparent`,
                        borderRight: `${component.width / 2}px solid transparent`,
                        borderBottom: `${component.height}px solid black`,
                      }}
                    />
                  );
                case 'text':
                case 'input':
                case 'filter':
                  return (
                    <div
                      key={component.id}
                      style={{
                        position: 'absolute',
                        left: component.x,
                        top: component.y,
                        width: component.width,
                        height: component.height,
                        border: '1px solid black',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                      }}
                    >
                      {component.content || '文本'}
                    </div>
                  );
                case 'image':
                  return (
                    <div
                      key={component.id}
                      style={{
                        position: 'absolute',
                        left: component.x,
                        top: component.y,
                        width: component.width,
                        height: component.height,
                        border: '1px solid black',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '10px',
                      }}
                    >
                      图片
                    </div>
                  );
                default:
                  return null;
              }
            })}
          </div>
        </div>
        
        {/* 手机顶部 */}
        <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-16 h-3 bg-gray-800 rounded-b-full"></div>
        
        {/* 手机底部 */}
        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gray-800 rounded-t-full"></div>
      </div>
      
      {/* 画布信息 */}
      <div className="mt-4 text-sm">
        <p>当前画布: {currentCanvas.name}</p>
        <p>尺寸: {currentCanvas.width} × {currentCanvas.height}</p>
        <p>组件数: {currentCanvas.components.length}</p>
      </div>
    </div>
  );
};

export default PhonePreview;
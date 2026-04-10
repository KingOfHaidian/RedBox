import React, { useEffect, useRef } from 'react';
import { useAppContext } from '../../context/AppContext';
import { useDrop } from 'react-dnd';
import { Component, ComponentType } from '../../types';
import { setFabricCanvas, addComponentToCanvas } from '../../utils/canvasUtils';

// 导入fabric.js
// @ts-ignore
import * as fabric from 'fabric';

const Canvas: React.FC = () => {
  const { currentCanvas, dispatch } = useAppContext();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<any>(null);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'COMPONENT',
    drop: (item: { type: ComponentType }) => {
      if (!currentCanvas) return;

      // 创建新组件
      const newComponent: Component = {
        id: Date.now().toString(),
        type: item.type,
        x: 100,
        y: 100,
        width: item.type === 'square' ? 100 : item.type === 'circle' ? 100 : item.type === 'triangle' ? 100 : 200,
        height: item.type === 'square' ? 100 : item.type === 'circle' ? 100 : item.type === 'triangle' ? 100 : 50,
        content: item.type === 'text' ? '文本内容' : undefined,
      };

      // 添加到状态
      dispatch({
        type: 'ADD_COMPONENT',
        payload: {
          canvasId: currentCanvas.id,
          component: newComponent,
        },
      });

      // 添加到fabric画布
      addComponentToCanvas(newComponent);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const dropRef = (node: HTMLDivElement) => {
    // 同时设置drop和canvas的ref
    drop(node);
  };

  useEffect(() => {
    if (!canvasRef.current || !currentCanvas) return;

    // 初始化fabric.js画布
    const fabricCanvas = new (fabric as any).Canvas(canvasRef.current, {
      width: currentCanvas.width,
      height: currentCanvas.height,
      backgroundColor: '#ffffff',
    });

    fabricCanvasRef.current = fabricCanvas;
    setFabricCanvas(fabricCanvas);

    // 加载组件
    currentCanvas.components.forEach((component) => {
      let fabricObject: any = null;

      switch (component.type) {
        case 'square':
        case 'rectangle':
          fabricObject = new (fabric as any).Rect({
            left: component.x,
            top: component.y,
            width: component.width,
            height: component.height,
            fill: 'transparent',
            stroke: 'black',
            strokeWidth: 1,
            data: { id: component.id, type: component.type },
          });
          break;
        case 'circle':
          fabricObject = new (fabric as any).Circle({
            left: component.x,
            top: component.y,
            radius: component.width / 2,
            fill: 'transparent',
            stroke: 'black',
            strokeWidth: 1,
            data: { id: component.id, type: component.type },
          });
          break;
        case 'triangle':
          fabricObject = new (fabric as any).Triangle({
            left: component.x,
            top: component.y,
            width: component.width,
            height: component.height,
            fill: 'transparent',
            stroke: 'black',
            strokeWidth: 1,
            data: { id: component.id, type: component.type },
          });
          break;
        case 'text':
        case 'input':
        case 'filter':
          fabricObject = new (fabric as any).IText(component.content || '文本', {
            left: component.x,
            top: component.y,
            width: component.width,
            height: component.height,
            fill: 'black',
            stroke: 'black',
            strokeWidth: 1,
            data: { id: component.id, type: component.type },
          });
          break;
        case 'image':
          fabricObject = new (fabric as any).Rect({
            left: component.x,
            top: component.y,
            width: component.width,
            height: component.height,
            fill: 'transparent',
            stroke: 'black',
            strokeWidth: 1,
            data: { id: component.id, type: component.type },
          });
          break;
      }

      if (fabricObject) {
        fabricCanvas.add(fabricObject);
      }
    });

    // 监听对象移动和缩放
    fabricCanvas.on('object:modified', (e: any) => {
      if (e.target && e.target.data && currentCanvas) {
        const updatedComponent: Component = {
          id: e.target.data.id,
          type: e.target.data.type,
          x: e.target.left!,
          y: e.target.top!,
          width: e.target.width! * e.target.scaleX!,
          height: e.target.height! * e.target.scaleY!,
          content: 'text' in e.target ? e.target.text : undefined,
        };

        dispatch({
          type: 'UPDATE_COMPONENT',
          payload: {
            canvasId: currentCanvas.id,
            component: updatedComponent,
          },
        });
      }
    });

    return () => {
      fabricCanvas.dispose();
    };
  }, [currentCanvas, dispatch]);

  // 添加组件到画布的函数将在外部实现

  if (!currentCanvas) {
    return <div className="flex items-center justify-center h-full">请选择或创建画布</div>;
  }

  return (
    <div className="flex items-center justify-center p-4" ref={dropRef}>
      <div className={`border border-gray-300 dark:border-gray-600 shadow-md transition-all ${isOver ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : ''}`}>
        <canvas
          ref={canvasRef}
          style={{
            width: currentCanvas.width,
            height: currentCanvas.height,
            backgroundColor: '#ffffff',
          }}
        />
      </div>
    </div>
  );
};

export default Canvas;
import { Component } from '../types';

// 导入fabric.js
// @ts-ignore
import * as fabric from 'fabric';

let fabricCanvas: any = null;

export const setFabricCanvas = (canvas: any) => {
  fabricCanvas = canvas;
};

export const addComponentToCanvas = (component: Component) => {
  if (!fabricCanvas) return;

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
    fabricCanvas.renderAll();
  }
};

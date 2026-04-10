// 组件类型
export type ComponentType = 
  | 'square' 
  | 'circle' 
  | 'rectangle' 
  | 'triangle' 
  | 'text' 
  | 'image' 
  | 'input' 
  | 'filter';

// 组件接口
export interface Component {
  id: string;
  type: ComponentType;
  x: number;
  y: number;
  width: number;
  height: number;
  content?: string;
}

// 画布接口
export interface Canvas {
  id: string;
  name: string;
  width: number;
  height: number;
  components: Component[];
}

// 设备预设接口
export interface DevicePreset {
  name: string;
  width: number;
  height: number;
}

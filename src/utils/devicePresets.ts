import { DevicePreset } from '../types';

// 手机预设
export const phonePresets: DevicePreset[] = [
  { name: 'iPhone 14', width: 390, height: 844 },
  { name: 'iPhone 14 Pro Max', width: 428, height: 926 },
  { name: 'Samsung Galaxy S23', width: 360, height: 800 },
  { name: 'Google Pixel 7', width: 393, height: 851 },
];

// 电脑预设
export const desktopPresets: DevicePreset[] = [
  { name: '13英寸笔记本', width: 1440, height: 900 },
  { name: '15英寸笔记本', width: 1920, height: 1080 },
  { name: '24英寸显示器', width: 1920, height: 1080 },
  { name: '27英寸显示器', width: 2560, height: 1440 },
];

// 所有预设
export const allPresets: DevicePreset[] = [...phonePresets, ...desktopPresets];

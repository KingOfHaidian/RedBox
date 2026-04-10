import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Canvas, Component } from '../types';

// 初始画布
const initialCanvases: Canvas[] = [
  {
    id: '1',
    name: '画布 1',
    width: 390,
    height: 844,
    components: [],
  },
];

// 状态接口
interface AppState {
  canvases: Canvas[];
  currentCanvasId: string;
}

// 初始状态
const initialState: AppState = {
  canvases: initialCanvases,
  currentCanvasId: initialCanvases[0].id,
};

// Action类型
type AppAction =
  | { type: 'ADD_CANVAS'; payload: Canvas }
  | { type: 'REMOVE_CANVAS'; payload: string }
  | { type: 'SET_CURRENT_CANVAS'; payload: string }
  | { type: 'UPDATE_CANVAS'; payload: Canvas }
  | { type: 'ADD_COMPONENT'; payload: { canvasId: string; component: Component } }
  | { type: 'UPDATE_COMPONENT'; payload: { canvasId: string; component: Component } }
  | { type: 'REMOVE_COMPONENT'; payload: { canvasId: string; componentId: string } };

// Reducer
const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'ADD_CANVAS':
      return {
        ...state,
        canvases: [...state.canvases, action.payload],
        currentCanvasId: action.payload.id,
      };
    case 'REMOVE_CANVAS':
      const newCanvases = state.canvases.filter(canvas => canvas.id !== action.payload);
      return {
        ...state,
        canvases: newCanvases,
        currentCanvasId: newCanvases.length > 0 ? newCanvases[0].id : '',
      };
    case 'SET_CURRENT_CANVAS':
      return {
        ...state,
        currentCanvasId: action.payload,
      };
    case 'UPDATE_CANVAS':
      return {
        ...state,
        canvases: state.canvases.map(canvas =>
          canvas.id === action.payload.id ? action.payload : canvas
        ),
      };
    case 'ADD_COMPONENT':
      return {
        ...state,
        canvases: state.canvases.map(canvas =>
          canvas.id === action.payload.canvasId
            ? { ...canvas, components: [...canvas.components, action.payload.component] }
            : canvas
        ),
      };
    case 'UPDATE_COMPONENT':
      return {
        ...state,
        canvases: state.canvases.map(canvas =>
          canvas.id === action.payload.canvasId
            ? {
                ...canvas,
                components: canvas.components.map(component =>
                  component.id === action.payload.component.id
                    ? action.payload.component
                    : component
                ),
              }
            : canvas
        ),
      };
    case 'REMOVE_COMPONENT':
      return {
        ...state,
        canvases: state.canvases.map(canvas =>
          canvas.id === action.payload.canvasId
            ? {
                ...canvas,
                components: canvas.components.filter(
                  component => component.id !== action.payload.componentId
                ),
              }
            : canvas
        ),
      };
    default:
      return state;
  }
};

// Context接口
interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  currentCanvas: Canvas | undefined;
}

// 创建Context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider组件
interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const currentCanvas = state.canvases.find(
    canvas => canvas.id === state.currentCanvasId
  );

  return (
    <AppContext.Provider value={{ state, dispatch, currentCanvas }}>
      {children}
    </AppContext.Provider>
  );
};

// 自定义Hook
export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

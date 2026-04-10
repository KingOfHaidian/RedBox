
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { AppProvider } from './context/AppContext';
import CanvasList from './components/Canvas/CanvasList';
import Canvas from './components/Canvas/Canvas';
import AddCanvas from './components/Canvas/AddCanvas';
import ComponentsPanel from './components/ComponentsLibrary/ComponentsPanel';
import PhonePreview from './components/Preview/PhonePreview';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <AppProvider>
        <div className="flex h-screen w-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          {/* 左侧组件库 */}
          <div className="w-64 border-r border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">组件库</h2>
            <ComponentsPanel />
            <AddCanvas />
          </div>
          
          {/* 中间画板区域 */}
          <div className="flex-1 flex flex-col">
            {/* 画布工具栏 */}
            <div className="h-16 border-b border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center px-4">
              <h2 className="text-xl font-bold mr-4">画板</h2>
              <CanvasList />
            </div>
            
            {/* 画布区域 */}
            <div className="flex-1 p-4 overflow-auto">
              <Canvas />
            </div>
          </div>
          
          {/* 右侧预览 */}
          <div className="w-80 border-l border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">实时预览</h2>
            <PhonePreview />
          </div>
        </div>
      </AppProvider>
    </DndProvider>
  );
}

export default App;
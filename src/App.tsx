import './App.css'
import { Outlet, useLocation } from 'react-router-dom'
import { SidebarProvider } from './components/ui/sidebar'
import { AppSidebar } from './components/Sidebar/AppSideBar'

function App() {

  const location = useLocation()
  const hideSideBar = location.pathname === "/login" || location.pathname === "/cadastrar/usuario"

  return (
    <div className='h-screen flex'>
      <SidebarProvider>
        {!hideSideBar && <AppSidebar />}
        <div className={hideSideBar ? 'w-full' : 'flex-1'}>
          <Outlet />
        </div>
      </SidebarProvider>
    </div>
  )
}

export default App

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App'
import Home from './pages/Home'
import Login from './pages/Login'
import RegisterBook from './pages/Book/RegisterBook'
import RegisterUSer from './pages/User/RegisterUser'
import ListUsers from './pages/User/ListUsers'
import ListBooks from './pages/Book/ListBooks'
import RegisterTransaction from './pages/Transaction/RegisterTransaction'
import ListTransactions from './pages/Transaction/ListTransactions'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/login',
        element: <Login />
      },
  
      {
        path: '/cadastrar/livro',
        element: <RegisterBook />
      },
      {
        path: '/cadastrar/usuario',
        element: <RegisterUSer />
      },
      {
        path: '/usuarios',
        element: <ListUsers />
      },
      {
        path: '/livros',
        element: <ListBooks />
      },
      {
        path: '/cadastrar/emprestimo',
        element: <RegisterTransaction />
      },
      {
        path: '/emprestimos',
        element: <ListTransactions />
      },
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

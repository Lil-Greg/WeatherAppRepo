import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import Navbar from './components/Navbar.tsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
const router = createBrowserRouter([{
  path: '/',
  element: <Navbar></Navbar>,
  children:[
    {
      path: '/',
      element: <App></App>
    }
  ]
}])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
  <RouterProvider router={router}></RouterProvider>
</React.StrictMode >
)

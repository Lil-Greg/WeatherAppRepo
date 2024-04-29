import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import NavbarComp from './components/NavbarComp.tsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([{
  path: '/',
  element: <NavbarComp></NavbarComp>,
  children: [
    {
      path: '/',
      element: <App></App>
    },
  ]
}])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode >
)

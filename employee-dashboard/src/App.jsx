import './App.css'

import { RouterProvider } from 'react-router-dom'
import { router } from './router'
//Start the app
function App() {

  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}

export default App

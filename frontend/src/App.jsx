import React from 'react'
import {Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import NoteDetail from './pages/NoteDetail'
import CreatePage from './pages/CreatePage'
const App = () => {
  return (
    <div data-theme="forest" className="min-h-screen">
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/notes/:id' element={<NoteDetail />} />
        <Route path='/create' element={<CreatePage />} />)
      </Routes>

    </div>
  )
}

export default App
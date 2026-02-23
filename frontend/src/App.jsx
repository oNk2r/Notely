import React from 'react'
import {Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import NoteDetail from './pages/NoteDetailPage'
import CreatePage from './pages/CreatePage'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/notes/:id' element={<NoteDetail />} />
        <Route path='/create' element={<CreatePage />} />
      </Routes>

    </div>
  )
}

export default App
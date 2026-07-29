import { PlusIcon } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router'

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-black/25 border-b border-white/[0.04]">
        <div className="mx-auto max-w-5xl px-6 py-4">
            <div className='flex items-center justify-between'>
                <Link to="/" className='text-2xl font-bold text-white tracking-tight flex items-center gap-2 hover:opacity-90 transition-opacity'>
                  <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-teal-400 bg-clip-text text-transparent">Notely.</span>
                </Link>
                <div className='flex items-center gap-4'>
                   <Link to={"/create"} className='glass-btn glass-btn-primary text-sm py-1.5 px-4 rounded-lg font-medium shadow-sm flex items-center gap-1.5 transition-all duration-300'>
                     <PlusIcon className="size-4"/>
                     <span>New Note</span>
                   </Link>
                 </div>
            </div>
        </div>
    </header>
  )
}

export default Navbar
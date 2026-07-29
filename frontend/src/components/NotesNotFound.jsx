import React from 'react';
import { Link } from 'react-router';
import { FileEditIcon } from 'lucide-react';

const NotesNotFound = () => {
  return (
    <div className="glass-card max-w-md mx-auto text-center p-10 rounded-2xl border border-white/[0.04]">
      <div className="flex justify-center mb-6">
        <div className="p-4 bg-white/[0.02] border border-white/[0.05] rounded-2xl">
          <FileEditIcon className="size-8 text-zinc-400" />
        </div>
      </div>
      <h2 className="text-xl font-semibold text-white mb-2 tracking-tight">No notes found</h2>
      <p className="text-zinc-400 text-sm leading-relaxed mb-8 max-w-xs mx-auto">
        Your space is currently empty. Start organizing your thoughts by writing your first note.
      </p>
      <Link
        to="/create"
        className="glass-btn glass-btn-primary py-2 px-6 rounded-lg text-sm font-medium inline-flex items-center gap-2"
      >
        Create a Note
      </Link>
    </div>
  );
};

export default NotesNotFound;

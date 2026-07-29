import { PenSquareIcon, Trash2 } from 'lucide-react';
import React from 'react'
import { Link } from 'react-router';
import api from '../lib/axios';
import toast from 'react-hot-toast';
import { formatDate } from '../lib/utlis';


const NoteCard = ({ note, setNotes }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault(); // get rid of the navigation behaviour

    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((note) => note._id !== id)); // get rid of the deleted one
      toast.success("Note deleted successfully");
    } catch (error) {
      console.log("Error in handleDelete", error);
      toast.error("Failed to delete note");
    }
  };

  return (
    <Link
      to={`/notes/${note._id}`}
      className="glass-card flex flex-col justify-between p-6 rounded-2xl cursor-pointer"
    >
      <div>
        <h3 className="text-lg font-semibold text-white mb-2 tracking-tight line-clamp-1">{note.title}</h3>
        <p className="text-zinc-400 text-sm leading-relaxed line-clamp-3 mb-6">{note.content}</p>
      </div>
      
      <div className="flex items-center justify-between border-t border-white/[0.04] pt-4 mt-auto">
        <span className="text-xs text-zinc-500 font-medium">
          {formatDate(new Date(note.createdAt))}
        </span>
        <div className="flex items-center gap-3">
          <span className="text-zinc-500 hover:text-white transition-colors duration-200">
            <PenSquareIcon className="size-4" />
          </span>
          <button
            className="text-zinc-500 hover:text-red-400 transition-colors duration-200 p-1 hover:bg-white/[0.03] rounded-md"
            onClick={(e) => handleDelete(e, note._id)}
            title="Delete note"
          >
            <Trash2 className="size-4" />
          </button>
        </div>
      </div>
    </Link>
  );
};
export default NoteCard;
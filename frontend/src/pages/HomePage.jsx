import { useState } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import { useEffect } from "react";
import api from "../lib/axios";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import NotesNotFound from "../components/NotesNotFound";


const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        console.log(res.data);
        setNotes(res.data);
        setIsRateLimited(false);
        setError(null);
      } catch (error) {
        console.log("Error fetching notes");
        console.log(error);
        if (error.response?.status === 429) {
          setIsRateLimited(true);
          setError(null);
        } else {
          const errorMsg = error.response?.data?.message || "Failed to load notes";
          setError(errorMsg);
          toast.error(errorMsg);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen pb-16">
      <Navbar />

      {isRateLimited ? (
        <RateLimitedUI />
      ) : (
        <div className="max-w-5xl mx-auto px-6 mt-12">
          {/* Header section with stats */}
          {!loading && !error && (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
              <div>
                <h2 className="text-3xl font-bold text-white tracking-tight animate-fade-in">Your Notes</h2>
                <p className="text-zinc-400 text-sm mt-1">Keep track of your thoughts and ideas.</p>
              </div>
              <div className="bg-white/[0.02] border border-white/[0.04] px-4 py-2 rounded-xl text-sm font-medium text-zinc-400 self-start sm:self-center">
                Total Notes: <span className="text-white font-semibold">{notes.length}</span>
              </div>
            </div>
          )}

          {loading && (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <div className="size-8 rounded-full border-2 border-zinc-700 border-t-white animate-spin"></div>
              <div className="text-zinc-400 text-sm font-medium">Retrieving notes...</div>
            </div>
          )}

          {!loading && error && (
            <div className="glass-card border-red-500/20 bg-red-500/[0.01] rounded-2xl p-8 text-center max-w-md mx-auto">
              <p className="text-red-400 text-sm font-medium mb-6">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="glass-btn glass-btn-primary py-2 px-6 rounded-lg text-sm font-medium"
              >
                Retry
              </button>
            </div>
          )}

          {!loading && !error && notes.length === 0 && <NotesNotFound />}

          {!loading && !error && notes.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {notes.map((note) => (
                <NoteCard key={note._id} note={note} setNotes={setNotes} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default HomePage;
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.log("Error in fetching note", error);
        toast.error("Failed to fetch the note");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted");
      navigate("/");
    } catch (error) {
      console.log("Error deleting the note:", error);
      toast.error("Failed to delete note");
    }
  };

  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please add a title or content");
      return;
    }

    setSaving(true);

    try {
      await api.put(`/notes/${id}`, note);
      toast.success("Note updated successfully");
      navigate("/");
    } catch (error) {
      console.log("Error saving the note:", error);
      toast.error("Failed to update note");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <div className="size-8 rounded-full border-2 border-zinc-700 border-t-white animate-spin"></div>
        <div className="text-zinc-400 text-sm font-medium">Loading note...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-16">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <Link to="/" className="glass-btn text-sm py-1.5 px-4 rounded-lg font-medium">
            <ArrowLeftIcon className="size-4" />
            <span>Back to Notes</span>
          </Link>
          <button onClick={handleDelete} className="glass-btn glass-btn-danger text-sm py-1.5 px-4 rounded-lg font-medium">
            <Trash2Icon className="size-4" />
            <span>Delete Note</span>
          </button>
        </div>

        <div className="glass-card p-8 rounded-2xl border border-white/[0.04]">
          <h2 className="text-2xl font-bold text-white mb-6 tracking-tight">Edit Note</h2>
          
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-zinc-400 text-xs font-semibold uppercase tracking-wider">Title</label>
              <input
                type="text"
                placeholder="Note title"
                className="glass-input w-full text-base font-medium"
                value={note.title}
                onChange={(e) => setNote({ ...note, title: e.target.value })}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-zinc-400 text-xs font-semibold uppercase tracking-wider">Content</label>
              <textarea
                placeholder="Write your note here..."
                className="glass-input w-full h-48 resize-none text-sm leading-relaxed"
                value={note.content}
                onChange={(e) => setNote({ ...note, content: e.target.value })}
              />
            </div>

            <div className="flex justify-end mt-4">
              <button className="glass-btn glass-btn-primary py-2 px-6 rounded-lg text-sm font-semibold" disabled={saving} onClick={handleSave}>
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NoteDetailPage;
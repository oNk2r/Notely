import React, { useState } from 'react';
import { ArrowLeftIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import api from '../lib/axios';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      await api.post("/notes", {
        title,
        content,
      });

      toast.success("Note created successfully!");
      navigate("/");
    } catch (error) {
      console.log("Error creating note", error);
      console.log("Response status:", error.response?.status);
      if (error.response?.status === 429) {
        toast.error("Slow down! You're creating notes too fast", {
          duration: 4000,
          icon: "💀",
        });
      } else {
        toast.error("Failed to create note");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-16">
      <Navbar />
      <div className="max-w-2xl mx-auto px-6 py-12">
        <Link to={"/"} className="glass-btn text-sm py-1.5 px-4 rounded-lg font-medium mb-8 inline-flex">
          <ArrowLeftIcon className="size-4" />
          <span>Back to Notes</span>
        </Link>

        <div className="glass-card p-8 rounded-2xl border border-white/[0.04]">
          <h2 className="text-2xl font-bold text-white mb-6 tracking-tight">Create New Note</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-zinc-400 text-xs font-semibold uppercase tracking-wider">Title</label>
              <input
                type="text"
                placeholder="Note Title"
                className="glass-input w-full text-base font-medium"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-zinc-400 text-xs font-semibold uppercase tracking-wider">Content</label>
              <textarea
                placeholder="Write your note here..."
                className="glass-input w-full h-48 resize-none text-sm leading-relaxed"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>

            <div className="flex justify-end mt-4">
              <button type="submit" className="glass-btn glass-btn-primary py-2 px-6 rounded-lg text-sm font-semibold" disabled={loading}>
                {loading ? "Creating..." : "Create Note"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default CreatePage;
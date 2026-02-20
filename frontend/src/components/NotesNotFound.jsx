const NotesNotFound = () => {
  return (
    <div className="text-center py-12">
      <h2 className="text-2xl font-bold text-gray-700 mb-2">No Notes Found</h2>
      <p className="text-gray-500 mb-6">
        You haven't created any notes yet. Start creating your first note!
      </p>
      <a
        href="/create"
        className="inline-block px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition"
      >
        Create a Note
      </a>
    </div>
  );
};

export default NotesNotFound;

export function getAllNotes(req, res){
  res.status(200).send("you just fetched the notes");
};

export function createNote(req, res){
  res.status(201).json({ message: 'Note created' });
}

export function updateNote(req, res){
  res.status(200).json({ message: 'Note updated' });
}

export function deleteNote(req, res){
  res.status(200).json({ message: 'Note deleted' });
}
export default {
  updateNotes: (state, notes) => {
    state.notes = notes;
  },

  deleteNote: (state, id) => {
    let index;

    state.notes.find((note, key) => {
      if (note.id === id) {
        index = key;
        return true;
      } else {
        return false;
      }
    });

    state.notes.splice(index, 1);
  }
};

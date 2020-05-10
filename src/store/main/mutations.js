export default {
  addNote: (state, note) => {
    if (state.notes.length) {
      note.id = state.notes[state.notes.length - 1].id + 1;
    } else {
      note.id = 1;
    }

    state.notes.push(note);
  },

  changeNote: (state, changed_note) => {
    let index;

    state.notes.find((note, key) => {
      if (note.id === changed_note.id) {
        index = key;
        return true;
      } else {
        return false;
      }
    });

    state.notes[index] = changed_note;
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

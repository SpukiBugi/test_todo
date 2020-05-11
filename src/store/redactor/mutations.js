export default {
  /** Загрузка данных о заметке в стор страницы редактора */
  loadNote: (state, data) => {
    state.note_data = JSON.parse(JSON.stringify(data));
    state.start_data = JSON.parse(JSON.stringify(data));
  },

  updateName: (state, name) => {
    state.note_data.name = name;
  },

  addTask: (state, new_task) => {
    if (state.note_data.tasks.length) {
      new_task.id = state.note_data.tasks[state.note_data.tasks.length - 1].id + 1;
    } else {
      new_task.id = 1;
    }

    state.note_data.tasks.push(new_task);
  },

  changeTask: (state, changed_task) => {
    let index;

    state.note_data.tasks.find((task, key) => {
      if (task.id === changed_task.id) {
        index = key;
        return true;
      } else {
        return false;
      }
    });

    state.note_data.tasks[index] = changed_task;
  },

  deleteTask: (state, id) => {
    let index;

    state.note_data.tasks.find((task, key) => {
      if (task.id === id) {
        index = key;
        return true;
      } else {
        return false;
      }
    });

    state.note_data.tasks.splice(index, 1);
  },
  
  /** Функция для плагина отмены действий устанавливающая начальное состояние */
  emptyState: (state) => {
    state.note_data = JSON.parse(JSON.stringify(state.start_data));
  },

  /** Очистка стора */
  clearState: (state) => {
    state.note_data = {
      name: "",
    
      tasks: [],
    };
    state.start_data = {
      name: "",
    
      tasks: [],
    };
  },
};

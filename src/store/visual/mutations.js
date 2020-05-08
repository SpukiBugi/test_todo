export default {
  updateBuilding: (state, building) => {
    state.building = building;
  },

  updateFloor: (state, floor) => {
    state.floor = floor;
  },

  updatePlan: (state, plan) => {
    state.plan = plan;
  },

  updateSpace: (state, space) => {
    state.space = space;
  },

  updateParams: (state, params) => {
    state.select_params = params;
  },
};

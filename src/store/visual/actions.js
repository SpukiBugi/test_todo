export default {
  updateBuilding(context, building) {
    context.commit('updateBuilding', building);
  },

  updateFloor(context, floor) {
    context.commit('updateFloor', floor);
  },

  updatePlan(context, plan) {
    context.commit('updatePlan', plan);
  },

  updateSpace(context, space) {
    context.commit('updateSpace', space);
  },

  updateParams(context, params) {
    context.commit('updateParams', params);
  },
};

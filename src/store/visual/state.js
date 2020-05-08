export default {
  /** Здание(очередь) */
  building: Object,
  /** Этаж */
  floor: Object,
  /** Планировка */
  plan: Object,
  /** Квартира */
  space: Object,

  /** Данные из подбора по параметрам */
  select_params: {
    rooms: false,
    min_price: false,
    max_price: false,
    min_area: false,
    max_area: false,
    min_floor: false,
    max_floor: false,
    facing: false,
    promo: false,
  },
};

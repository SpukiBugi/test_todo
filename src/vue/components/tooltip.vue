<template>
  <div
    class="tooltip"
    :class="tool_position"
    :style="style_target"
  >
    <!-- Треугольник -->
    <div class="tooltip-triangle" ref="triangle" />

    <slot />
  </div>
</template>

<script>
export default {
  name: "Tooltip",

  props: {
    /** Сторона в которую должен появиться тултип */
    direction: {
      type: String,
      default: 'vertical',  
    },

    /** Расстояние между тултипом и блоком */
    tool_gap: {
      type: Number,
      default: 0,
    }
  },

  data() {
    return {
      target: null,

      tool_position: "above",

      style: {
        target: {
          top: '',
          bottom: '',
          left: ''
        },
      }
    };
  },

  computed: {
    style_target() {
      let obj = {
        left: this.style.target.left,
        top: this.style.target.top,
      };

      return obj;
    },
  },

  mounted() {
    this.changePosition();
    
    window.addEventListener("resize", this.changePosition);
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.changePosition);
  },

  methods: {
    getTarget() {
      return this.$el.getBoundingClientRect();
    },

    getTriangle() {
      return this.$refs.triangle.getBoundingClientRect();
    },

    getParent() {
      return this.$el.parentElement.getBoundingClientRect();
    },

    getViewbox() {
      return {
        width: window.innerWidth,
        height: window.innerHeight
      };
    },

    changePosition() {
      const target = this.getTarget();
      const triangle = this.getTriangle();
      const parent = this.getParent();
      const view = this.getViewbox();

      if (this.direction === 'vertical') {
        /** Позиционирование тултипа по вертикали */

        if (target.height + (triangle.height / 2) < parent.top) {
          /** Выставляем тултип сверху */
          this.style.target.top = -(triangle.height / 2 + target.height + this.tool_gap)  + "px";
          this.tool_position = 'above';
        } else {
          /** Выставляем тултип снизу */
          this.style.target.top = triangle.height / 2 + parent.height + this.tool_gap + "px";
          this.tool_position = 'below';
        }

        this.style.target.left = parent.width / 2 - target.width / 2 + "px";
      } else {
        /** Позиционирование тултипа по горизонтали */
        if (target.width + (triangle.width / 2) < parent.left) {
          /** Выставляем тултип слева */
          this.style.target.left = -(triangle.width / 2 + target.width) + "px";
          this.tool_position = 'left';
        } else {
          /** Выставляем тултип справа */
          this.style.target.left = triangle.width / 2 + parent.width + "px";
          this.tool_position = 'right';
        }

        this.style.target.top = parent.height / 2 - target.height / 2 + "px";
      }
    },
  }
};
</script>

<style lang="scss" scoped>
.tooltip {
  position: absolute;
  z-index: 5;
  pointer-events: none;

  &.above {
    .tooltip-triangle {
      left: 50%;
      bottom: 0;
      transform: translateY(40%) translateX(-50%) rotate(45deg);
    }
  }

  &.below {
    .tooltip-triangle {
      left: 50%;
      top: 0;
      transform: translateY(-40%) translateX(-50%) rotate(45deg);
    }
  }

  &.left {
    .tooltip-triangle {
      right: 0;
      top: 50%;
      transform: translateY(-50%) translateX(50%) rotate(45deg);
    }
  }

  &.right {
    .tooltip-triangle {
      left: 0;
      top: 50%;
      transform: translateY(-50%) translateX(-50%) rotate(45deg);
    }
  }
}

.tooltip-triangle {
  position: absolute;
  width: 32px;
  height: 32px;
  background-color: white;
  border-radius: 3px;
  z-index: -1;
}
</style>
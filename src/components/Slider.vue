<template>
  <div class="range-slider">
    <div class="slider-wrapper">
      <div class="slider-background"></div>
      <div v-if="isDouble" class="slider-fill" :style="sliderFillStyles1"></div>
      <div class="slider-fill" :style="sliderFillStyles2"></div>
      <div v-if="isDouble" class="slider-fill" :style="sliderFillStyles3"></div>

      <input
        v-if="isDouble"
        type="range"
        :min="min"
        :max="max"
        :step="step"
        v-model="currentValue1"
        @input="updateValue1"
        class="slider slider-left"
        ref="slider1"
      />
      <input
        type="range"
        :min="min"
        :max="max"
        :step="step"
        v-model="currentValue2"
        @input="updateValue2"
        class="slider"
        ref="slider2"
      />
      <div v-if="true">
        <div class="tooltip" :style="tooltipStyles1" v-if="isDouble">{{ currentValue1 }}</div>
        <div class="tooltip" :style="tooltipStyles2">{{ currentValue2 }}</div>
      </div>
      <div  v-if="false">
        <div class="tooltip" :style="tooltipStyles11" v-if="isDouble">{{ currentValue1 }}</div>
        <div class="tooltip" :style="tooltipStyles2">{{ currentValue2 }}</div>
      </div>
    </div>
    <div class="slider-labels" v-if="isVisibleRange">
      <span class="min-label">{{ min }}</span>
      <span class="max-label">{{ max }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 100,
    },
    step: {
      type: Number,
      default: 1,
    },
    value1: {
      type: Number,
      default: 0,
    },
    value2: {
      type: Number,
      default: 100,
    },
    isDouble: {
      type: Boolean,
      default: false,
    },
    isVisibleRange: {
      type: Boolean,
      default: false,
    },
    colors: {
      type: Array,
      default: () => ['#1B70ED', '#00AA00', '#FF0000'],
    },
  },
  data() {
    return {
      currentValue1: this.value1,
      currentValue2: this.value2,
      tooltipLeft1: '0px',
      tooltipLeft2: '0px',
      fillWidth1: '0%',
      fillWidth2: '0%',
      fillWidth3: '0%',
    };
  },
  methods: {
    updateValue1() {
      if (this.currentValue1 > this.currentValue2) {
        this.currentValue1 = this.currentValue2;
      }
      this.$emit('input1', this.currentValue1);
      this.updateTooltipPosition1();
      this.updateFillWidth();
    },
    updateValue2() {
      if (this.currentValue2 < this.currentValue1) {
        this.currentValue2 = this.currentValue1;
      }
      this.$emit('input2', this.currentValue2);
      this.updateTooltipPosition2();
      this.updateFillWidth();
    },
    updateTooltipPosition1() {
      const slider1 = this.$refs.slider1;
      const valuePercent1 = ((this.currentValue1 - this.min) / (this.max - this.min)) * 100;
      const sliderWidth = slider1.offsetWidth;
      const thumbWidth = 18; // Width of the thumb (slider handle)
      const offset = (sliderWidth * valuePercent1 / 100) - (thumbWidth / 2);
      this.tooltipLeft1 = `${offset}px`;
    },
    updateTooltipPosition2() {
      const slider2 = this.$refs.slider2;
      const valuePercent2 = ((this.currentValue2 - this.min) / (this.max - this.min)) * 100;
      const sliderWidth = slider2.offsetWidth;
      const thumbWidth = 18; // Width of the thumb (slider handle)
      const offset = (sliderWidth * valuePercent2 / 100) - (thumbWidth / 2);
      this.tooltipLeft2 = `${offset}px`;
    },
    updateFillWidth() {
      const valuePercent1 = ((this.currentValue1 - this.min) / (this.max - this.min)) * 100;
      const valuePercent2 = ((this.currentValue2 - this.min) / (this.max - this.min)) * 100;
      this.fillWidth1 = `${valuePercent1}%`;
      this.fillWidth2 = `${valuePercent2 - valuePercent1}%`;
      this.fillWidth3 = `${100 - valuePercent2}%`;
    },
  },
  mounted() {
    if (this.isDouble) {
      this.updateTooltipPosition1();
    }
    this.updateTooltipPosition2();
    this.updateFillWidth();
  },
  watch: {
    value1(newValue) {
      this.currentValue1 = newValue;
      this.updateTooltipPosition1();
      this.updateFillWidth();
    },
    value2(newValue) {
      this.currentValue2 = newValue;
      this.updateTooltipPosition2();
      this.updateFillWidth();
    },
  },
  computed: {
    tooltipStyles1() {
      return {
        left: this.tooltipLeft1,
        zIndex: 4,
      };
    },
    tooltipStyles2() {
      return {
        left: this.tooltipLeft2,
        zIndex: 4,
      };
    },
    sliderFillStyles1() {
      return {
        width: this.fillWidth1,
        backgroundColor: this.colors[1],
        zIndex: 1,
      };
    },
    sliderFillStyles2() {
      return {
        width: this.fillWidth2,
        backgroundColor: this.colors[0],
        left: this.fillWidth1,
        position: 'absolute',
        zIndex: 1, 
      };
    },
    sliderFillStyles3() {
      return {
        width: this.fillWidth3,
        backgroundColor: this.colors[2],
        left: `calc(${this.fillWidth1} + ${this.fillWidth2})`,
        position: 'absolute',
        zIndex: 1,
      };
    },
  },
};
</script>

<style scoped>
.range-slider {
  margin: auto;
  text-align: center;
  position: relative;
  height: 6em;
  display: contents;
}

.range-slider input[type=range] {
  position: absolute;
  left: 0;
  bottom: 46px;
  -webkit-appearance: none;
  width: 100%;
  height: 4px;
  background: #C1C5CF;
}

input[type=range]:focus {
  outline: none;
}

input[type=range]::-webkit-slider-runnable-track {
  width: 100%;
  height: 6px;
  cursor: pointer;
  animate: 0.2s;
  box-shadow: none;
  border: 0;
}

input[type=range]::-webkit-slider-thumb {
  z-index: 2;
  position: relative;
  box-shadow: 0px 0px 0px #111111;
  border: 1px solid #262626;
  height: 18px;
  width: 18px;
  border-radius: 25px;
  background: #ffffff;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -7px;
}

input[type=range]::-moz-range-thumb {
  z-index: 2;
  position: relative;
  box-shadow: 0px 0px 0px #111111;
  border: 1px solid #111111;
  height: 18px;
  width: 18px;
  border-radius: 25px;
  background: #ffffff;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -7px;
}

.slider-wrapper {
  position: relative;
  width: 100%;
  height: 6em;
}

.slider-background {
  position: absolute;
  width: 100%;
  height: 4px;
  background: #ccc; /* Grey background for the entire track */
  top: 50%;
  transform: translateY(-50%);
  border-radius: 1px; /* Rounded corners */
}

.slider-fill {
  position: absolute;
  height: 4px;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  z-index: 1; /* Ensure fill is behind the thumb and tooltip */
  transition: width 0.1s;
  border-radius: 4px; /* Rounded corners */
}

.tooltip {
  position: absolute;
  /*top: -30px; /* Adjusted to fit better above the slider */
  background: #fff;
  color: black;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 700;
  line-height: normal;
  white-space: nowrap;
  transform: translateX(-50%);
  transition: left 0.1s;
  box-shadow: 0px 0px 4px 0px;
  z-index: 3; /* Ensure tooltip is above fills */
}

.tooltip-range {
  position: absolute;
  /*top: -30px; /* Adjusted to fit better above the slider */
  background: #fff;
  color: black;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 700;
  line-height: normal;
  white-space: nowrap;
  transform: translateX(-50%);
  transition: left 0.1s;
  box-shadow: 0px 0px 4px 0px;
  z-index: 3; /* Ensure tooltip is above fills */
}

.slider-labels {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 10px;
}

.min-label, .max-label {
  font-size: 12px;
  color: #333;
}
</style>

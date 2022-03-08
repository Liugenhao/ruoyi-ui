<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        title:{
          text:"所有设备数量"
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}'
        },
        legend: {
          left: 'center',
          bottom: '20',
          itemWidth:15,
          data: ['安全帽', '塔吊', '升降机', '扬尘', '监控']
        },
        series: [
          {
            name: '设备数量',
            type: 'pie',
            roseType: 'radius',
            radius: [15, 65],
            center: ['50%', '50%'],
            data: [
              { value: 320, name: '安全帽' },
              { value: 240, name: '塔吊' },
              { value: 149, name: '升降机' },
              { value: 100, name: '扬尘' },
              { value: 59, name: '监控' }
            ],
            animationEasing: 'cubicInOut',
            animationDuration: 2600
          }
        ]
      })
    }
  }
}
</script>

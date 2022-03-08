<template>
  <div style="height:280px;width:100%" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'
import defaultData from './mixins/buildingMap'

export default {
  mixins: [resize],
  data() {
    return {
      chart: null,
    }
  },
  watch: {

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
      this.setOptions()
    },
    setOptions() {
      this.chart.setOption({
        title:{
          text:"桐乡市各街道（镇）工地数及工人数"
        },
        xAxis: {
          type: 'category',
          data: defaultData.area,
          axisTick: {
            alignWithLabel: true
          }
          // boundaryGap: false,
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 40,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          padding: [5, 10]
        },
        yAxis: {
          type: 'value',
          axisTick: {
            show: false
          }
        },
        // legend: {
        //   data: ['expected', 'actual']
        // },
        series: [
          {
            name:"工地数",
            type: 'bar',
            barWidth:'40%',
            stack: 'vistors',
            data: defaultData.buildnum,
            animationDuration: 1800,
            animationEasing: 'cubicInOut',
            // itemStyle: {//上方显示数值
            //   normal: {
            //     label: {
            //       show: true, //开启显示
            //       position: 'top', //在上方显示
            //       textStyle: { //数值样式
            //         color: '#666',
            //         fontSize: 14
            //       }
            //     }
            //   }
            // }
          },
          {
            name:"工人数",
            type: 'bar',
            barWidth:'40%',
            stack: 'vistors',
            data: defaultData.workernum,
            animationDuration: 1800,
            animationEasing: 'cubicInOut',
          }
        ]
      })
    }
  }
}
</script>

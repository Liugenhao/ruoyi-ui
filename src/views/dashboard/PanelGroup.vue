<template>
  <el-row :gutter="40" class="panel-group">
    <el-col 
      :xs="12" 
      :sm="12" 
      :lg="6" 
      class="card-panel-col"
      v-for="(item,index) in infoTexts"
      :key="index">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper" :class="'icon-'+iconList[index]">
          <svg-icon :icon-class="iconList[index]" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            {{item.name}}
          </div>
          <count-to 
            :start-val="0" 
            :end-val="item.number" 
            :duration="3600" 
            class="card-panel-num" />
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'

export default {
  components: {
    CountTo
  },
  data () {
    return {
      iconList:["building","peoples","equipment","online"],
      infoTexts:[
        {
          name:"工地总数",
          type:"building",
          number:102400,
        },
        {
          name:"人员总数",
          type:"peoples",
          number:81212,
        },
        {
          name:"设备总数",
          type:"equipment",
          number:9280,
        },
        {
          name:"在线设备",
          type:"onlines",
          number:13600,
        },
      ]
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    height: 100px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

      .icon-building {
        background: #36a3f7;
      }
      .icon-peoples {
        background: #40c9c6;
      }
      .icon-equipment {
        background: #f4516c;
      }
      .icon-online {
        background: #34bfa3
      }

    .card-panel-icon-wrapper {
      padding: 10px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      font-weight: bold;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>

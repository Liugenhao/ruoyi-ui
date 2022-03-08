<template>
  <div class="dashboard-editor-container">
    <panel-group />
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <build-chart />
    </el-row>
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <device-binding />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <device-no-binding />
        </div>
      </el-col>
      
      <!--<el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <online-device/>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <offline-device/>
        </div>
      </el-col>-->
    </el-row>
  </div>
</template>

<script>
import PanelGroup from './dashboard/PanelGroup'
import BuildChart from './dashboard/BuildChart'
import PieChart from './dashboard/PieChart'
import DeviceBinding from './dashboard/DeviceBinding'
import DeviceNoBinding from './dashboard/DeviceNoBinding'
import OnlineDevice from './dashboard/OnlineDevice'
import OfflineDevice from './dashboard/OfflineDevice'
//import RaddarChart from './dashboard/RaddarChart'

//import BarChart from './dashboard/BarChart'

export default {
  name: 'Index',
  components: {
    PanelGroup,
    BuildChart,
    PieChart,
    DeviceBinding,
    DeviceNoBinding,
    OnlineDevice,
    OfflineDevice,
  },
  data() {
    return {
      
    }
  },
  methods: {
    
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>

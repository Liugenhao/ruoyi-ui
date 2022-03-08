<template>
  <el-dialog 
    :title="title" 
    :visible.sync="viewFlag" 
    width="80%" 
    center
    append-to-body
    :before-close="handleCloseView">
    <el-row :gutter="20" v-if="dataFlag">
      <el-col :span="12">
        <div class="item">
          <div class="item-title">项目名称：</div>
          <div class="item-content">
            {{projectData.name}}
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="item">
          <div class="item-title">所属单位：</div>
          <div class="item-content">
            {{projectData.empCompany}}
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="item">
          <div class="item-title">项目类型：</div>
          <div class="item-content">
            <p class="obj-name" v-if="projectData.projecttype == '01'">建筑工程</p>
            <p class="obj-name" v-else>市政工程</p>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="item">
          <div class="item-title">建筑面积：</div>
          <div class="item-content">
            {{projectData.buildingarea}} ㎡
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="item">
          <div class="item-title">项目详细地点：</div>
          <div class="item-content">
            {{projectData.location}}
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="item">
          <div class="item-title">经纬度：</div>
          <div class="item-content">
           [ {{projectData.longitude}}，{{projectData.latitude}} ]
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="item">
          <div class="item-title">计划开工时间：</div>
          <div class="item-content">
            {{projectData.planstartdate}}
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="item">
          <div class="item-title">计划竣工时间：</div>
          <div class="item-content">
            {{projectData.planfinishdate}}
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="item">
          <div class="item-title">实际开工时间：</div>
          <div class="item-content">
            {{projectData.actualstartdate}}
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="item">
          <div class="item-title">实际竣工时间：</div>
          <div class="item-content">
            {{projectData.actualfinishdate}}
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="item">
          <div class="item-title">施工阶段：</div>
          <div class="item-content">
            {{projectData.progress}}
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="item">
          <div class="item-title">工程状态：</div>
          <div class="item-content">
            {{projectData.status}}
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="item">
          <div class="item-title">是否重点项目：</div>
          <div class="item-content">
            {{projectData.importantprogram}}
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="item">
          <div class="item-title">工程投资性质：</div>
          <div class="item-content">
            {{projectData.investtype}}
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="item">
          <div class="item-title">总投资(万元)：</div>
          <div class="item-content">
            {{projectData.totalinvest}}
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="item">
          <div class="item-title">是否为减隔震建筑：</div>
          <div class="item-content">
            {{projectData.seismicisolation}}
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="item">
          <div class="item-title">建设性质：</div>
          <div class="item-content">
            {{projectData.constructtype}}
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="item">
          <div class="item-title">工程用途：</div>
          <div class="item-content">
            {{projectData.purpose}}
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="item">
          <div class="item-title">项目来源：</div>
          <div class="item-content">
            {{projectData.source}}
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="item">
          <div class="item-title">主要结构类型：</div>
          <div class="item-content">
            {{projectData.structuretype}}
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="item">
          <div class="item-title">单体建筑数量：</div>
          <div class="item-content">
            {{projectData.singlebuildingnum}}
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="item">
          <div class="item-title">单体建筑明细：</div>
          <div class="item-content">
            {{projectData.singlebuildingdesc}}
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="item">
          <div class="item-title">建设单位名称：</div>
          <div class="item-content">
            {{projectData.constructcompanyname}}
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="item">
          <div class="item-title">建设单位统一社会信用代码：</div>
          <div class="item-content">
            {{projectData.constructcreditcode}}
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="item">
          <div class="item-title">建设单位项目负责人：</div>
          <div class="item-content">
            {{projectData.constructcharger}}
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="item">
          <div class="item-title">建设单位项目负责人联系电话：</div>
          <div class="item-content">
            {{projectData.constructchargerphone}}
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="item">
          <div class="item-title">建设单位项目负责人证件：</div>
          <div class="item-content">
            {{projectData.constructchargeridnumber}}
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="item">
          <div class="item-title">施工单位：</div>
          <div class="item-content">
            {{projectData.buildcorp}}
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="item">
          <div class="item-title">施工单位统一社会信用代码：</div>
          <div class="item-content">
            {{projectData.buildcorpcode}}
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="item">
          <div class="item-title">施工单位项目经理：</div>
          <div class="item-content">
            {{projectData.buildcorpmanager}}
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="item">
          <div class="item-title">施工单位项目负责人身份证号：</div>
          <div class="item-content">
            {{projectData.buildcorpmanagercard}}
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="item">
          <div class="item-title">监理单位：</div>
          <div class="item-content">
            {{projectData.supervisorcorp}}
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="item">
          <div class="item-title">监理单位统一社会信用代码：</div>
          <div class="item-content">
            {{projectData.supervisorcorpcode}}
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="item">
          <div class="item-title">总监理工程师：</div>
          <div class="item-content">
            {{projectData.supervisorcorpmanager}}
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="item">
          <div class="item-title">总监理工程师身份证号：</div>
          <div class="item-content">
            {{projectData.supervisorcorpmanagercard}}
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="item">
          <div class="item-title">是否已办理施工许可证：</div>
          <div class="item-content">
            {{projectData.havelicenseno}}
          </div>
        </div>
      </el-col>

      <el-col :span="12">
        <div class="item">
          <div class="item-title">施工许可证号：</div>
          <div class="item-content">
            {{projectData.builderslicenseno}}
          </div>
        </div>
      </el-col>

      <el-col :span="12">
        <div class="item">
          <div class="item-title">发证单位：</div>
          <div class="item-content">
            {{projectData.certificationcompany}}
          </div>
        </div>
      </el-col>

      <el-col :span="12">
        <div class="item">
          <div class="item-title">发证时间：</div>
          <div class="item-content">
            {{projectData.certificationdate}}
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="item">
          <div class="item-title">安全监督机构：</div>
          <div class="item-content">
            {{projectData.safetysupervisionorganization}}
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="item">
          <div class="item-title">安全监督员姓名：</div>
          <div class="item-content">
            {{projectData.safetysupervisionperson}}
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="item">
          <div class="item-title">安全监督员身份证号：</div>
          <div class="item-content">
            {{projectData.safetysupervisionidnumber}}
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="item">
          <div class="item-title">项目安全报监编号：</div>
          <div class="item-content">
            {{projectData.safetyapplicationno}}
          </div>
        </div>
      </el-col>
       <el-col :span="12">
        <div class="item">
          <div class="item-title">建设状态：</div>
          <div class="item-content">
            {{projectData.buildStatus}}
          </div>
        </div>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
export default {
  name:"viewDialog",
  props:{
    title:String,
    viewFlag:Boolean,
    singleProjectDatas:{
      type:Object
    }
  },
  data(){
    return {
      projectData:null,
      dataFlag:false
    }
  },
  watch: {
    singleProjectDatas: {
      deep: true,
      handler: function (val) {
        this.getProjectData()
      },
    },
  },
  mounted(){
    this.$nextTick(function(){
      this.getProjectData();
    })
  },
  methods:{
    getProjectData () {
      this.projectData = this.singleProjectDatas;
      //判断projectData是否null
      if (!this.projectData && typeof(this.projectData)!="undefined" && this.projectData!=0){
        this.dataFlag = false;
      }else{
        this.dataFlag = true;
      }
      console.log(this.projectData)
    },
    handleCloseView () {
      this.$emit("closeView",this.viewFlag)
    }
  }
}
</script>
<style lang="scss" scoped>
  p { margin:0; }
  .item {
    display: flex;
    margin-bottom: 15px;
    line-height: 30px;
    .item-title {
      flex: 0 0 45%;
      font-weight: 600;
      text-align: right;
      margin-right: 10px;
    }
    .item-content {
      flex: 0 0 55%;
    }
  }
</style>
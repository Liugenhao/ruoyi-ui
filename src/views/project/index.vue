<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="工程名称" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入工程名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['tongxiang:project:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['tongxiang:project:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['tongxiang:project:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['tongxiang:project:export']"
        >导出</el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="projectList"  border @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="施工许可证编号" align="center"  fixed prop="builderslicenseno" width="180"/>
      <el-table-column label="工程名称" align="center" prop="name" width="150"/>
      <el-table-column label="工程详细地址" align="center" prop="location" width="200"/>
      <el-table-column label="计划竣工日期" align="center" prop="planfinishdate" width="100"/>
      <el-table-column label="建设单位名称" align="center" prop="constructcompanyname" width="200"/>
      <el-table-column label="项目经理" align="center" prop="constructcharger" width="100"/>
      <el-table-column label="联系电话" align="center" prop="constructchargerphone" width="120"/>
      <el-table-column label="操作" fixed="right" align="center" class-name="small-padding fixed-width"  width="200">
        <template slot-scope="scope">
          <!-- <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['tongxiang:project:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['tongxiang:project:remove']"
          >删除</el-button> -->
          <el-button
            size="mini"
            type="text"
            @click="openDeviceDust(scope.row)">扬尘
            ({{scope.row.dustDeviceNum}})
          </el-button>
          <el-button
            size="mini"
            type="text"
            @click="openDeviceAll(scope.row)">监控(2)
          </el-button>
          <el-button
            size="mini"
            type="text"
            @click="openDeviceAll(scope.row)">塔吊(1)
          </el-button>
          <el-button
            size="mini"
            type="text"
            @click="openDeviceAll(scope.row)">升降机(1)
          </el-button>
          <el-button
            size="mini"
            type="text"
            @click="openDeviceAll(scope.row)">设备
          </el-button>
          <el-button 
            size="mini" 
            type="text"
            @click="viewProject(scope.row)">查看
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"/>

    <!-- 添加或修改工地信息对话框 -->
    <el-dialog 
      :title="title" 
      :visible.sync="open" 
      width="800px" 
      center
      append-to-body
      :before-close="handleClose">
      <el-form class="view-form" ref="form" :model="form" :rules="rules" label-position="top" label-width="200px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="所属单位" prop="empCompany">
              <el-input v-model="form.empCompany" placeholder="请输入所属单位" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目名称" prop="name">
              <el-input v-model="form.name" placeholder="请输入项目名称" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="项目类型">
              <el-select v-model="form.projecttype" placeholder="请选择项目类型">
                <el-option label="请选择字典生成" value="" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="建筑面积(㎡)" prop="buildingarea">
              <el-input v-model="form.buildingarea" placeholder="请输入建筑面积" />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-form-item label="项目所在省" prop="province">
          <el-input v-model="form.province" placeholder="请输入项目所在省" />
        </el-form-item>
        <el-form-item label="6 位省行政区划代码，见附录 A 的 A.3" prop="provincecode">
          <el-input v-model="form.provincecode" placeholder="请输入6 位省行政区划代码，见附录 A 的 A.3" />
        </el-form-item>
        <el-form-item label=" 项目所在市 " prop="city">
          <el-input v-model="form.city" placeholder="请输入 项目所在市 " />
        </el-form-item>
        <el-form-item label="6 位市行政区划代码，见附录 A 的 A.30" prop="citycode">
          <el-input v-model="form.citycode" placeholder="请输入6 位市行政区划代码，见附录 A 的 A.30" />
        </el-form-item>
        <el-form-item label="项目所在区县" prop="county">
          <el-input v-model="form.county" placeholder="请输入项目所在区县" />
        </el-form-item>
        <el-form-item label="6 位区县行政区划代码，见附录 A 的 A.3" prop="countycode">
          <el-input v-model="form.countycode" placeholder="请输入6 位区县行政区划代码，见附录 A 的 A.3" />
        </el-form-item> -->
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="项目详细地点" prop="location">
              <el-input v-model="form.location" placeholder="请输入项目详细地点" type="textarea"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="经度" prop="longitude">
              <el-input v-model="form.longitude" placeholder="请输入经度" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="纬度" prop="latitude">
              <el-input v-model="form.latitude" placeholder="请输入纬度" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="计划开工时间" prop="planstartdate">
              <el-date-picker
                v-model="form.planstartdate"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="计划竣工时间" prop="planfinishdate">
              <el-date-picker
                v-model="form.planfinishdate"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="实际开工时间" prop="actualstartdate">
              <el-date-picker
                v-model="form.actualstartdate"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="实际竣工时间" prop="actualfinishdate">
              <el-date-picker
                v-model="form.actualfinishdate"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="施工阶段" prop="progress">
              <el-select v-model="form.progress" placeholder="请选择项目类型">
                <el-option label="请选择字典生成" value="" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="工程状态">
              <el-select v-model="form.status" placeholder="请选择项目类型">
                <el-option label="请选择字典生成" value="" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="是否重点项目" prop="importantprogram">
              <el-input v-model="form.importantprogram" placeholder="请输入是否重点项目, 见附录 A 的 A.2" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="工程投资性质">
              <el-select v-model="form.investtype" placeholder="请选择工程投资性质，见附录 A 的 A.5">
                <el-option label="请选择字典生成" value="" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="总投资(万元)" prop="totalinvest">
              <el-input v-model="form.totalinvest" placeholder="请输入总投资(万元)" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否为减隔震建筑" prop="seismicisolation">
              <el-radio-group v-model="form.seismicisolation">
                <el-radio :label="0">是</el-radio>
                <el-radio :label="1">否</el-radio>
              </el-radio-group>
              <!--<el-input 
                v-model="form.seismicisolation" 
                placeholder="请输入是否为减隔震建筑，见附录 A 的 A." />-->
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="建设性质">
              <el-select v-model="form.constructtype" placeholder="请选择建设性质，见附录 A 的 A.3">
                <el-option label="请选择字典生成" value="" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="工程用途" prop="purpose">
              <el-input v-model="form.purpose" placeholder="请输入工程用途，见附录 A 的 A.4" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="项目来源" prop="source">
              <el-input v-model="form.source" placeholder="请输入项目来源(1.代表从其他库中获取 2.手动添加)" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="主要结构类型">
              <el-select v-model="form.structuretype" placeholder="请选择主要结构类型">
                <el-option label="请选择字典生成" value="" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="单体建筑数量" prop="singlebuildingnum">
              <el-input v-model="form.singlebuildingnum" placeholder="请输入单体建筑数量" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单体建筑明细" prop="singlebuildingdesc">
              <el-input v-model="form.singlebuildingdesc" placeholder="请输入单体建筑明细" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="建设单位名称" prop="constructcompanyname">
              <el-input v-model="form.constructcompanyname" placeholder="请输入建设单位名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="建设单位统一社会信用代码" prop="constructcreditcode">
              <el-input v-model="form.constructcreditcode" placeholder="请输入建设单位统一社会信用代码" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="建设单位项目负责人" prop="constructcharger">
              <el-input v-model="form.constructcharger" placeholder="请输入建设单位项目负责人" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="建设单位项目负责人联系电话" prop="constructchargerphone">
              <el-input v-model="form.constructchargerphone" placeholder="请输入建设单位项目负责人联系电话" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="建设单位项目负责人证件" prop="constructchargeridnumber">
              <el-input v-model="form.constructchargeridnumber" placeholder="请输入建设单位项目负责人证件" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="施工单位" prop="buildcorp">
              <el-input v-model="form.buildcorp" placeholder="请输入施工单位" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="施工单位统一社会信用代码" prop="buildcorpcode">
              <el-input v-model="form.buildcorpcode" placeholder="请输入施工单位统一社会信用代码" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="施工单位项目经理" prop="buildcorpmanager">
              <el-input v-model="form.buildcorpmanager" placeholder="请输入施工单位项目经理" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="施工单位项目负责人身份证号" prop="buildcorpmanagercard">
              <el-input v-model="form.buildcorpmanagercard" placeholder="请输入施工单位项目负责人身份证号" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="监理单位" prop="supervisorcorp">
              <el-input v-model="form.supervisorcorp" placeholder="请输入监理单位" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="监理单位统一社会信用代码" prop="supervisorcorpcode">
              <el-input v-model="form.supervisorcorpcode" placeholder="请输入监理单位统一社会信用代码" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="总监理工程师" prop="supervisorcorpmanager">
              <el-input v-model="form.supervisorcorpmanager" placeholder="请输入总监理工程师" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="总监理工程师身份证号" prop="supervisorcorpmanagercard">
              <el-input v-model="form.supervisorcorpmanagercard" placeholder="请输入总监理工程师身份证号" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否已办理施工许可证" prop="havelicenseno">
              <el-input v-model="form.havelicenseno" placeholder="请输入是否已办理施工许可证，见附录 A 的 A.2" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="施工许可证号" prop="builderslicenseno">
              <el-input v-model="form.builderslicenseno" placeholder="请输入施工许可证号" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发证单位" prop="certificationcompany">
              <el-input v-model="form.certificationcompany" placeholder="请输入发证单位" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="发证时间" prop="certificationdate">
              <el-date-picker
                v-model="form.certificationdate"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="安全监督机构" prop="safetysupervisionorganization">
              <el-input v-model="form.safetysupervisionorganization" placeholder="请输入安全监督机构" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="安全监督员姓名" prop="safetysupervisionperson">
              <el-input v-model="form.safetysupervisionperson" placeholder="请输入安全监督员姓名" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="安全监督员身份证号" prop="safetysupervisionidnumber">
              <el-input v-model="form.safetysupervisionidnumber" placeholder="请输入安全监督员身份证号" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="项目安全报监编号" prop="safetyapplicationno">
              <el-input v-model="form.safetyapplicationno" placeholder="请输入项目安全报监编号" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="建设状态">
              <el-input v-model="form.buildStatus" placeholder="请输入建设状态" />
            </el-form-item>
            
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <el-dialog 
      :title="titleDevice" 
      :visible.sync="openDevice" 
      width="800px" 
      center
      append-to-body
      :before-close="handleClose">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="扬尘设备" name="first">
          <el-transfer
            filterable
            :props="{key: 'id',label: 'name'}"
            v-model="value"
            style="height:500px"
            :titles="['未绑定设备', '已绑定设备']"
            :button-texts="['解绑', '绑定']"
            @change="handleChange"
            :data="data">
          </el-transfer>
        </el-tab-pane>
        <el-tab-pane label="监控设备" name="second">监控设备</el-tab-pane>
        <el-tab-pane label="塔吊" name="third">塔吊</el-tab-pane>
        <el-tab-pane label="升降机" name="fourth">升降机</el-tab-pane>
      </el-tabs>
    </el-dialog>

    <!-- 查看dialog -->
    <ViewDialog 
      :title="title" 
      :singleProjectDatas="singleProjectData" 
      :viewFlag="viewFlag" 
      @closeView="handleClose"/>
  </div>
</template>

<script>
import ViewDialog from './components/viewDialog.vue'
import { 
  listProject, 
  getProject, 
  delProject, 
  addProject, 
  updateProject, 
  exportProject, 
  getUnbind, 
  getBind, 
  bindDevice, 
  unBindDevice 
} from "@/api/tongxiang/project";

export default {
  name: "Project",
  components:{
    ViewDialog
  },
  data() {
    return {
      data: [],
      value: [],
      projectId: undefined,
      activeName: 'first',
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      // 工地信息表格数据
      projectList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 设备弹框
      titleDevice: "",
      // 是否显示设备弹出层
      openDevice: false,
      viewFlag:false,
      //单条数据
      singleProjectData:null,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        uuid: undefined,
        regId: undefined,
        deptId: undefined,
        companyId: undefined,
        empCompany: undefined,
        projectId: undefined,
        name: undefined,
        projecttype: undefined,
        province: undefined,
        provincecode: undefined,
        city: undefined,
        citycode: undefined,
        county: undefined,
        countycode: undefined,
        location: undefined,
        longitude: undefined,
        latitude: undefined,
        buildingarea: undefined,
        planstartdate: undefined,
        planfinishdate: undefined,
        actualstartdate: undefined,
        actualfinishdate: undefined,
        progress: undefined,
        status: undefined,
        importantprogram: undefined,
        investtype: undefined,
        totalinvest: undefined,
        seismicisolation: undefined,
        constructtype: undefined,
        purpose: undefined,
        source: undefined,
        structuretype: undefined,
        singlebuildingnum: undefined,
        singlebuildingdesc: undefined,
        constructcompanyname: undefined,
        constructcreditcode: undefined,
        constructcharger: undefined,
        constructchargerphone: undefined,
        constructchargeridnumber: undefined,
        buildcorp: undefined,
        buildcorpcode: undefined,
        buildcorpmanager: undefined,
        buildcorpmanagercard: undefined,
        supervisorcorp: undefined,
        supervisorcorpcode: undefined,
        supervisorcorpmanager: undefined,
        supervisorcorpmanagercard: undefined,
        havelicenseno: undefined,
        builderslicenseno: undefined,
        certificationcompany: undefined,
        certificationdate: undefined,
        safetysupervisionorganization: undefined,
        safetysupervisionperson: undefined,
        safetysupervisionidnumber: undefined,
        safetyapplicationno: undefined,
        isValid: undefined,
        buildStatus: undefined,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        projectId: [
          { required: true, message: "获取到的项目id不能为空", trigger: "blur" }
        ],
      },
      ParamsBind:{
        projectId:  undefined,
        deviceId: undefined
      }
    };
  },
  created() {
    this.$nextTick(function(){
      this.getList();
    })
  },
  methods: {
    handleChange(value, direction, movedKeys) {
      //可以通过direction回调right/left 来进行操作，right：代表绑定数据，left：代表解绑设备
      if(direction === "right") {
        this.ParamsBind.projectId = this.projectId;
        this.ParamsBind.deviceId = movedKeys*1;
        bindDevice(this.ParamsBind).then(response => {
          if(response.code == 200){
            this.$notify({
              title: '',
              message: '设备绑定成功',
              type: 'success'
            });
          }
        })
      }
      if(direction === "left") {
        this.ParamsBind.projectId = this.projectId;
        this.ParamsBind.deviceId = movedKeys*1;
        unBindDevice(this.ParamsBind).then(response => {
          if(response.code == 200){
            this.$notify({
              title: '',
              message: '设备解绑成功',
              type: 'success'
            });
          }
        })
      }  
      this.getList()  
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    //查看
    viewProject(row) {
      //console.log(row)
      this.viewFlag = true;
      this.title="查看信息";
      this.singleProjectData = row;
    },
    openDeviceDust(row){
      this.titleDevice = "设备信息"
      this.openDevice = true
      getUnbind(row.id).then(response => {
        this.data = response.data
      })
      getBind(row.id).then(response =>{
        this.value = response.data
      })
      this.projectId = row.id
    },
    /** 查询工地信息列表 */
    getList() {
      this.loading = true;
      listProject(this.queryParams).then(response => {
        this.projectList = response.rows;
        console.log(this.projectList)
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.title = '';
      this.reset();
    },
    //关闭dialog
    handleClose (data) {
      this.viewFlag = data;
      this.open = false;
      this.openDevice = false
      this.viewFlag = false;
      this.title = '';
    },
    // 表单重置
    reset() {
      this.form = {
        id: undefined,
        uuid: undefined,
        regId: undefined,
        deptId: undefined,
        companyId: undefined,
        empCompany: undefined,
        projectId: undefined,
        name: undefined,
        projecttype: undefined,
        province: undefined,
        provincecode: undefined,
        city: undefined,
        citycode: undefined,
        county: undefined,
        countycode: undefined,
        location: undefined,
        longitude: undefined,
        latitude: undefined,
        buildingarea: undefined,
        planstartdate: undefined,
        planfinishdate: undefined,
        actualstartdate: undefined,
        actualfinishdate: undefined,
        progress: undefined,
        status: "0",
        importantprogram: undefined,
        investtype: undefined,
        totalinvest: undefined,
        seismicisolation: undefined,
        constructtype: undefined,
        purpose: undefined,
        source: undefined,
        structuretype: undefined,
        singlebuildingnum: undefined,
        singlebuildingdesc: undefined,
        constructcompanyname: undefined,
        constructcreditcode: undefined,
        constructcharger: undefined,
        constructchargerphone: undefined,
        constructchargeridnumber: undefined,
        buildcorp: undefined,
        buildcorpcode: undefined,
        buildcorpmanager: undefined,
        buildcorpmanagercard: undefined,
        supervisorcorp: undefined,
        supervisorcorpcode: undefined,
        supervisorcorpmanager: undefined,
        supervisorcorpmanagercard: undefined,
        havelicenseno: undefined,
        builderslicenseno: undefined,
        certificationcompany: undefined,
        certificationdate: undefined,
        safetysupervisionorganization: undefined,
        safetysupervisionperson: undefined,
        safetysupervisionidnumber: undefined,
        safetyapplicationno: undefined,
        isValid: undefined,
        createBy: undefined,
        createTime: undefined,
        updateBy: undefined,
        updateTime: undefined,
        buildStatus: "0",
        remark: undefined
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!=1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加工地信息";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getProject(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改工地信息";
      });
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != undefined) {
            updateProject(this.form).then(response => {
              if (response.code === 200) {
                this.$modal.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addProject(this.form).then(response => {
              if (response.code === 200) {
                this.$modal.msgSuccess("新增成功");
                this.open = false;
                this.getList();
              }
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$confirm('是否确认删除工地信息编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delProject(ids);
        }).then(() => {
          this.getList();
          this.$modal.msgSuccess("删除成功");
        }).catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有工地信息数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportProject(queryParams);
        }).then(response => {
          this.download(response.msg);
        }).catch(function() {});
    }
  }
};
</script>

<style lang="scss">
  .el-transfer-panel {
    width: 250px;
    height: 500px;
  }
  .el-transfer-panel__body{
    height: 450px;
  }
  .view-form {
    .el-form-item{
      margin-bottom: 16px;
    }
    .el-select{
      width: 100%;
    }
    .el-form-item--medium .el-form-item__label {
      line-height: 20px;
      padding: 0 0 6px 0;
    }
  }
  .el-transfer-panel__list.is-filterable {
    height: 450px;
    padding-top: 0;
  }
  .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width: 100%;
  }
</style>
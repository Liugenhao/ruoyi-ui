<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="施工单位" prop="companyName">
        <el-input
          v-model="queryParams.companyName"
          placeholder="请输入施工单位"
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
          v-hasPermi="['tongxiang:company:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['tongxiang:company:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['tongxiang:company:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['tongxiang:company:export']"
        >导出</el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="companyList"  border @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="施工单位" align="center" prop="companyName" width="200"/>
      <el-table-column label="单位法人" align="center" prop="constructcharger" />
      <el-table-column label="联系电话" align="center" prop="constructchargerphone" />
      <el-table-column label="负责人证件" align="center" prop="constructchargeridnumber" />
      <el-table-column label="经营地址" align="center" prop="address" />
      <el-table-column label="统一社会信用代码" align="center" prop="creditCode" />
      <el-table-column :formatter="resourceFormat" label="数据来源" align="center" prop="source"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" width="180">
        <template slot-scope="scope">
          <!-- <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['tongxiang:company:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['tongxiang:company:remove']"
          >删除</el-button> -->
          <el-button
            size="mini"
            type="text"
            icon="el-icon-shopping-cart-full"
            @click="SelectProject(scope.row)"
          >工地({{scope.row.projectNum}})</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-user"
            @click="selectPeople(scope.row)"
          >人员({{scope.row.peopleNum}})</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改集团、公司信息对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="施工单位" prop="companyName">
          <el-input v-model="form.companyName" placeholder="请输入公司名称" />
        </el-form-item>
        <el-form-item label="单位法人" prop="constructcharger">
          <el-input v-model="form.constructcharger" placeholder="请输入负责人" />
        </el-form-item>
        <el-form-item label="联系电话" prop="constructchargerphone">
          <el-input v-model="form.constructchargerphone" placeholder="请输入联系电话" />
        </el-form-item>
        <el-form-item label="法人证件" prop="constructchargeridnumber">
          <el-input v-model="form.constructchargeridnumber" placeholder="请输入负责人证件" />
        </el-form-item>
        <el-form-item label="经营地址" prop="address">
          <el-input v-model="form.address" placeholder="请输入经营地址" />
        </el-form-item>
        <el-form-item label="信用代码" prop="creditCode">
          <el-input v-model="form.creditCode" placeholder="请输入社会信用代码" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 工地弹出窗 -->
    <el-dialog :title="titleProject" :visible.sync="openProject" width="1140px" append-to-body>
      <div style="text-align:center;margin-bottom:30px;font-weight: bold;font-size:20px">{{empCompany}}</div>
      <el-table v-loading="loading" :data="projectList"  border @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="施工许可证编号" align="center"  fixed prop="builderslicenseno" width="180"/>
        <el-table-column label="工程名称" align="center" prop="name" width="150"/>
        <el-table-column label="工程详细地址" align="center" prop="location" width="200"/>
        <el-table-column label="计划竣工日期" align="center" prop="planfinishdate" width="100"/>
        <el-table-column label="建设单位名称" align="center" prop="constructcompanyname" width="200"/>
        <el-table-column label="项目经理" align="center" prop="constructcharger" width="100"/>
        <el-table-column label="联系电话" align="center" prop="constructchargerphone" width="120"/>
      </el-table>
      <pagination
        v-show="totalProject>0"
        :total="totalProject"
        :page.sync="queryParamsProject.pageNum"
        :limit.sync="queryParamsProject.pageSize"
        @pagination="getAllProject"
      />
    </el-dialog>

    <!-- 人员弹出窗 -->
    <el-dialog :title="titlePeople" :visible.sync="openPeople" width="1140px" append-to-body>
      <div style="text-align:center;margin-bottom:30px;font-weight: bold;font-size:20px">{{empCompany}}</div>
      <el-table v-loading="loading" :data="peopleList"  border @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <!-- <el-table-column label="员工工号" align="center" prop="empId" /> -->
        <el-table-column label="员工姓名" align="center" prop="empName" width="100"/>
        <el-table-column label="性别" align="center" prop="sex" width="50"/>
        <el-table-column label="年龄" align="center" prop="empAge" width="50"/>
        <el-table-column label="手机号" align="center" prop="empPhone" />
        <el-table-column label="员工照片" align="center" prop="facephoto">
          <template slot-scope="scope">
              <img :src="'data:image/jpg;base64,'+scope.row.facephoto" alt="" style="width: 50px; height: 50px">
          </template>
        </el-table-column>
        <el-table-column label="班组名称" align="center" prop="workTypename" />
        <el-table-column label="人员类别" align="center" prop="empCategory" />
        <el-table-column label="身份证" align="center" prop="empIdnum" />
      </el-table>
      <pagination
        v-show="totalPeople>0"
        :total="totalPeople"
        :page.sync="queryParamsPeople.pageNum"
        :limit.sync="queryParamsPeople.pageSize"
        @pagination="getAllPeople"
      />
    </el-dialog>
  </div>
</template>

<script>
import { listCompany, getCompany, delCompany, addCompany, updateCompany, exportCompany, getAllProject, getAllPeople } from "@/api/tongxiang/company";

export default {
  name: "Company",
  data() {
    return {
      empCompany:"",
      // 工地信息表格数据
      projectList: [],
      // 人员信息表格数据
      peopleList: [],
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
      // 工地总条数
      totalProject: 0,
      // 人员总条数
      totalPeople: 0,
      // 集团、公司信息表格数据
      companyList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 工地弹出层
      titleProject: "",
      // 是否显示工地弹出层
      openProject: false,
      // 人员弹出层
      titlePeople: "",
      // 是否显示人员弹出层
      openPeople: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        companyName: undefined,
        deptId: undefined,
        constructcharger: undefined,
        constructchargerphone: undefined,
        constructchargeridnumber: undefined,
        address: undefined,
        creditCode: undefined,
        source: undefined,
      },
      queryParamsProject:{
        pageNum: 1,
        pageSize: 10,
        id: undefined
      },
      queryParamsPeople:{
        pageNum: 1,
        pageSize: 10,
        id: undefined
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        companyName: [
          { required: true, message: "施工单位不能为空", trigger: "blur" }
        ],
      },
      statusType: [],
      projectId: undefined
    };        
  },
  created() {
    this.getDicts('sys_resource').then(response => {
      this.statusType = response.data
    });
    this.getList();
  },
  methods: {
    SelectProject(row){
      this.titleProject = "工地信息"
      this.openProject = true
      this.projectId = row.id
      this.getAllProject();
    },
    getAllProject(){
      this.queryParamsProject.id = this.projectId
      getAllProject(this.queryParamsProject).then(response => {
        this.projectList = response.rows;
        this.totalProject = response.total
        if(this.totalProject != 0){
          this.empCompany = this.projectList[0].empCompany
        }else{
          this.empCompany = ""
        }
      })
    },
    selectPeople(row){
      this.titlePeople = "人员信息"
      this.openPeople = true
      this.projectId = row.id
      this.getAllPeople();
    },
    getAllPeople(){
      this.queryParamsPeople.id = this.projectId
      getAllPeople(this.queryParamsPeople).then(response =>{
        this.peopleList = response.rows;
        this.totalPeople = response.total;
        if(this.totalPeople != 0){
          this.empCompany = this.peopleList[0].empCompany
        }else{
          this.empCompany = ""
        }
      })
    },
    /** 查询集团、公司信息列表 */
    getList() {
      this.loading = true;
      listCompany(this.queryParams).then(response => {
        this.companyList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: undefined,
        companyName: undefined,
        deptId: undefined,
        constructcharger: undefined,
        constructchargerphone: undefined,
        constructchargeridnumber: undefined,
        address: undefined,
        creditCode: undefined,
        source: undefined,
        createBy: undefined,
        createTime: undefined,
        updateBy: undefined,
        updateTime: undefined,
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
      this.title = "添加施工单位信息";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getCompany(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改施工单位信息";
      });
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != undefined) {
            updateCompany(this.form).then(response => {
              if (response.code === 200) {
                this.$modal.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addCompany(this.form).then(response => {
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
      this.$confirm('是否确认删除集团、公司信息编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delCompany(ids);
        }).then(() => {
          this.getList();
          this.$modal.msgSuccess("删除成功");
        }).catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有集团、公司信息数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportCompany(queryParams);
        }).then(response => {
          this.download(response.msg);
        }).catch(function() {});
    },
    resourceFormat(row, column){
      return this.selectDictLabel(this.statusType, row.source)
    }
  }
};
</script>
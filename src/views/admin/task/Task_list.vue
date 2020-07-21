<template>
  <div>
    <div class="Task_title" style="margin-bottom: 20px;">
      <h3>任务管理列表</h3>
      <el-button type="primary" @click="onChangeTask('')">新增</el-button>
    </div>
    <el-table :data="tableData" border style="width: 100%" stripe>
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="name" label="任务名称"></el-table-column>
      <el-table-column prop="type" label="任务类型">
          <template slot-scope="scope">
              {{typeList[scope.row.type].name}}
        </template>
      </el-table-column>
      <el-table-column prop="description" label="描述"></el-table-column>
      <el-table-column label="单价">
        <template slot-scope="scope">{{scope.row.price.toFixed(2) + '元 / ' + scope.row.count + '次'}}</template>
      </el-table-column>
      <el-table-column prop="index" label="排序" width="120"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button @click="onChangeTask(scope.row)" type="text" size="small">修改</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="dialogTitle" center :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form" :label-width="formLabelWidth" label-position="left">
        <el-form-item label="任务名称" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="任务介绍" prop="description">
          <el-input v-model="form.description" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="单价" prop="price">
          <el-input v-model="form.price" autocomplete="off" type="number"></el-input>
        </el-form-item>

        <el-form-item label="数量" prop="count">
          <el-input v-model="form.count" autocomplete="off" type="number"></el-input>
        </el-form-item>

        <el-form-item label="类型" prop="type">
          <!-- <el-input v-model="form.type" autocomplete="off"></el-input> -->
          <el-radio-group v-model="form.type">
            <el-radio-button label="1">关注</el-radio-button>
            <el-radio-button label="2">点赞</el-radio-button>
            <el-radio-button label="3">播放</el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="排序" prop="index">
          <el-input v-model="form.index" autocomplete="off" type="number"></el-input>
        </el-form-item>

      <!-- <div slot="footer" class="dialog-footer"> -->
        <el-form-item>
          <el-button @click="onCancle">取 消</el-button>
          <el-button type="primary" @click="onConfirm('form')">确 定</el-button>
        </el-form-item>
      <!-- </div> -->
      </el-form>
      
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        description: '',
        price: '',
        count: '',
        type: '',
        index: 0
      },
      rules: {
        name: [{ required: true, message: '请输入任务名称', trigger: 'blur' }],
        description: [
          { required: true, message: '请输入任务介绍', trigger: 'blur' }
        ],
        price: [{ required: true, message: '请输入单价', trigger: 'blur' }],
        count: [{ required: true, message: '请输入数量', trigger: 'blur' }],
        type: [{ required: true, message: '请输入类型', trigger: 'change' }],
        index: [{ required: true, message: '请输入排序', trigger: 'blur' }]
      },
      tableData: [],
      tableList:{},
      dialogFormVisible: false,
      dialogTitle: '新增任务信息',
      formLabelWidth: '80px',
      typeList:{
          0:{name:'未选择'},
          1:{name:"关注"},
          2:{name:"点赞"},
          3:{name:"播放"},
      }
    }
  },

  mounted() {
    this.getTaskList()
  },

  methods: {
    async getTaskList() {
      let res = await this.$api.admin.task.list()
      if (res.code == 0) {
        for (let item of res.data) {
          item.price = item.price / 10000;
          this.tableList[item.id] = item;
        }
        this.tableData = res.data;
      }
    },

    //新增/修改  任务信息
    onChangeTask(data) {
      // console.log(method)
      this.dialogFormVisible = true
      if (!data) {
        this.dialogTitle = '新增任务信息'
      } else {
        this.dialogTitle = '修改任务信息'
        this.form = { ...data }
      }
    },

    initForm() {
      this.form = {
        name: '',
        description: '',
        price: '',
        count: '',
        type: '',
        index: 0
      }
    },

    async createTask(dataObj) {
      let res = await this.$api.admin.task.create(dataObj)
      if (res.code == 0) {
        res.data.price = res.data.price / 10000;
        this.tableData.unshift(res.data);
        this.initForm()
      }
    },

    async updateTask(dataObj) {
      let res = await this.$api.admin.task.update(dataObj);
      if (res.code == 0) {
        // this.tableList[res.data.id] = res.data;
        // this.tableData.forEach((item,index) =>{
        //   if(res.data.id==item.id){
        //     res.data.price = res.data.price / 10000;
        //     item = res.data;
        //     // this.$set(this.tableData,index,res.data);
        //     return;
        //   }
        // })
        // this.tableData.unshift(res.data);
        this.getTaskList();
        this.initForm();
      }
    },

    //确定
    onConfirm(form) {
      this.$refs[form].validate(async valid => {
        if (valid) {
          console.log(valid);
          if (this.form.index >= 100) {
            this.$message({
              message: '排序不能大于100',
              type: 'error'
            })
            return
          }
          
          if (this.form.price >= 1000) {
            this.$message({
              message: '单价不能大于1000',
              type: 'error'
            })
            return
          }

          if (this.dialogTitle == '新增任务信息') {
            let dataObj = this.form
            await this.createTask(dataObj)
          } else if (this.dialogTitle == '修改任务信息') {
            let dataObj = {
              id: this.form.id,
              name: this.form.name,
              description: this.form.description,
              price: this.form.price,
              count: this.form.count,
              type: this.form.type,
              index: this.form.index
            }
            await this.updateTask(dataObj);
          }
            this.dialogFormVisible = false;
        }
      })
    },

    //取消
    onCancle() {
      this.initForm()
      this.dialogFormVisible = false
    },

    onOpen() {
      console.log('这是一个新增页面')
    }
  }
}
</script>


<style lang="less" scoped>
.Task_title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
<template>
  <div class="app-container">
    <el-form :inline="true" :model="query" class="demo-form-inline">
      <el-form-item label="用户名称">
        <el-input v-model="query.user_name" placeholder="用户名称"/>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input v-model="query.age" placeholder="年龄" />
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="query.sex" placeholder="性别">
          <el-option label="男" value="男"/>
          <el-option label="女" value="女"/>
        </el-select>
      </el-form-item>
      <el-form-item label="生日">
        <el-date-picker
          v-model="query.birthday"
          type="date"
          value-format="yyyy-MM-dd"
          format="yyyy-MM-dd"
          placeholder="选择日期" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getList">查询</el-button>
      </el-form-item>
      <el-form-item class="fr">
        <el-button type="primary" @click="dialogNewUser = true">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column
        label="用户名称"
        width="180">
        <template slot-scope="scope">
          <el-input v-show="scope.row.isEdit" v-model="scope.row.user_name" placeholder="请输入内容" />
          <span v-show="!scope.row.isEdit">{{ scope.row.user_name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="年龄"
        width="180">
        <template slot-scope="scope">
          <el-input v-show="scope.row.isEdit" v-model="scope.row.age" placeholder="请输入内容" />
          <span v-show="!scope.row.isEdit">{{ scope.row.age }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="性别"
        width="180">
        <template slot-scope="scope">
          <el-select v-show="scope.row.isEdit" v-model="scope.row.sex" placeholder="请选择">
            <el-option
              v-for="item in sexOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value" />
          </el-select>
          <span v-show="!scope.row.isEdit">{{ scope.row.sex }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="生日">
        <template slot-scope="scope">
          <el-date-picker
            v-show="scope.row.isEdit"
            v-model="scope.row.birthday"
            type="date"
            value-format="yyyy-MM-dd"
            format="yyyy-MM-dd"
            placeholder="选择日期" />
          <span v-show="!scope.row.isEdit">{{ scope.row.birthday }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button v-show="!scope.row.isEdit" type="text" size="small" @click="edit(scope.row)">编辑</el-button>
          <el-button v-show="!scope.row.isEdit" type="text" size="small" style="color:#F56C6C" @click="del(scope.row)">删除</el-button>
          <el-button v-show="scope.row.isEdit" type="success" icon="el-icon-check" circle @click="updata(scope.row)" />
          <el-button v-show="scope.row.isEdit" type="info" icon="el-icon-close" circle @click="close(scope.row)" />
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :visible.sync="dialogNewUser"
      title="新增用户"
      width="30%">
      <el-form ref="newUser" :model="newUser" :rules="rules_for_newUser" label-width="80px">
        <el-form-item label="账号" prop="account">
          <el-input v-model="newUser.account" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="newUser.password" />
        </el-form-item>
        <el-form-item label="密码" prop="checkPass">
          <el-input v-model="newUser.checkPass" />
        </el-form-item>
        <el-form-item label="用户名称" prop="user_name">
          <el-input v-model="newUser.user_name" />
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="newUser.age" />
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="newUser.sex" placeholder="请选择" class="el-col-24">
            <el-option
              v-for="item in sexOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="生日" prop="birthday">
          <el-date-picker
            v-model="newUser.birthday"
            type="date"
            value-format="yyyy-MM-dd"
            format="yyyy-MM-dd"
            placeholder="选择日期" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogNewUser = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getList, updata, del, register } from '@/api/user'
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.newUser.password !== '') {
          this.$refs.newUser.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePassAgain = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.newUser.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      sexOptions: [
        {
          value: '男'
        }, {
          value: '女'
        }
      ],
      query: {
        pageNo: 1,
        pageSize: 10,
        sex: '',
        age: '',
        user_name: '',
        birthday: ''
      },
      newUser: {
        account: '',
        password: '',
        checkPass: '',
        user_name: '',
        sex: '',
        age: '',
        birthday: ''
      },
      rules_for_newUser: {
        account: [
          { required: true, message: '请填写帐号', trigger: 'blur' },
          { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur', required: true },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePassAgain, trigger: 'blur', required: true }
        ],
        user_name: [
          { required: true, message: '用户姓名不能为空', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '性别不能为空', trigger: 'blur' }
        ],
        age: [
          { required: true, message: '年龄不能为空', trigger: 'blur' }
        ],
        birthday: [
          { required: true, message: '生日不能为空', trigger: 'blur' }
        ]
      },
      tempItem: {},
      tableData: [],
      dialogNewUser: false
    }
  },

  created() {
    this.getList()
  },

  methods: {
    getList() {
      var _this = this
      console.log(_this.query)
      getList(_this.query).then(rs => {
        rs.data.data.map(function(v, k) {
          _this.$set(v, 'isEdit', false)
        })
        _this.tableData = rs.data.data
      })
    },
    edit(item) {
      this.tempItem = JSON.parse(JSON.stringify(item))
      this.$set(item, 'isEdit', true)
    },
    del(item) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        del({ id: item.id }).then(rs => {
          if (rs.data.success) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getList()
          } else {
            this.$message({
              type: 'info',
              message: '删除失败，请刷新重试'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    updata(item) {
      updata(item).then(rs => {
        if (rs.data.success) {
          this.$message.success(rs.data.message)
        }
        this.getList()
      })
      this.$set(item, 'isEdit', false)
    },
    close(item) {
      var _this = this
      for (var i in this.tempItem) {
        item[i] = _this.tempItem[i]
      }
    },
    submit() {
      this.$refs['newUser'].validate((valid) => {
        if (valid) {
          alert('submit!')
          register(this.newUser).then(rs => {
          	if (rs.success) {
							this.$message.success(rs.data.message)
          	}
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

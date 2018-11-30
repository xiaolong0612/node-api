<template>
  <div class="app-container">
    <el-form :inline="true" :model="query" class="demo-form-inline">
      <el-form-item label="用户名称">
        <el-input v-model="query.user_name" clearable placeholder="用户名称"/>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input v-model="query.age" clearable placeholder="年龄" />
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="query.sex" clearable placeholder="性别">
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
        <el-button :loading="loading.table" type="primary" @click="getList">查询</el-button>
      </el-form-item>
      <el-form-item class="fr">
        <el-button type="primary" @click="dialog.newUser = true">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="loading.table" :data="tableData" style="width:100%">
      <el-table-column
        type="selection"
        width="55"/>
      <el-table-column
        label="帐号"
        width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.account }}</span>
        </template>
      </el-table-column>
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
          <el-button v-show="!scope.row.isEdit" type="text" size="small" style="color:#F56C6C" @click="delItem(scope.row)">删除</el-button>
          <el-button v-show="scope.row.isEdit" type="success" icon="el-icon-check" circle @click="updata(scope.row)" />
          <el-button v-show="scope.row.isEdit" type="info" icon="el-icon-close" circle @click="closeEdit(scope.row)" />
        </template>
      </el-table-column>
    </el-table>
    <div v-show="!loading.table">
      <el-pagination
        :total="total"
        :current-page="query.pageNo"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="query.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        class="fr"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange" />

      <el-button type="danger" icon="el-icon-delete" style="margin-top:9px" @click="showDialogDelUser()"/>
    </div>
    <el-dialog
      :visible.sync="dialog.newUser"
      title="新增用户"
      width="30%">
      <el-form ref="newUser" :model="newUser" :rules="rules_for_newUser" label-width="80px">
        <el-form-item label="账号" prop="account">
          <el-input v-model="newUser.account" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="newUser.password" type="password"/>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input v-model="newUser.checkPass" type="password"/>
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
        <el-button @click="dialog.newUser = false">取 消</el-button>
        <el-button :loading="loading.submit" type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      :visible.sync="dialog.delUser"
      title="删除用户"
      width="30%">
      <div>
        确定要删除
        <span v-for="(item, index) in multipleSelection" :key="item.id" style="color:#F56C6C">{{ item.account }}<font v-if="index !== multipleSelection.length - 1">,</font></span>!
        <p><span style="color:#F56C6C">{{ multipleSelection.length }}</span>个账号吗？</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog.delUser = false">取 消</el-button>
        <el-button :loading="loading.del" type="primary" @click="delSelect">确 定</el-button>
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
      total: 0,
      newUser: {
        account: 'xiaolong',
        password: '123456',
        checkPass: '123456',
        user_name: 'xiaolongjun',
        sex: '男',
        age: '12',
        birthday: '1997-06-12'
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
      tempItem: [],
      tableData: [],
      loading: {
        table: false,
        submit: false,
        del: false
      },
      multipleSelection: [],
      dialog: {
        newUser: false,
        delUser: false
      }
    }
  },

  created() {
    this.getList()
  },

  methods: {
    // 搜索
    search() {
      this.query.pageNo = 1
      this.getList()
    },
    // 获取列表
    getList() {
      var _this = this
      // 加载效果start
      _this.loading.table = true
      // 清空数据
      _this.tableData = []
      getList(_this.query).then(rs => {
        this.total = rs.total
        rs.data.map(function(v, k) {
          // 添加编辑控制
          _this.$set(v, 'isEdit', false)
        })
        _this.tableData = rs.data
        _this.loading.table = false
      })
    },
    edit(item) {
      // 缓存打开编辑的列
      this.tempItem[this.tempItem.length] = JSON.parse(JSON.stringify(item))
      this.$set(item, 'isEdit', true)
    },
    closeEdit(item) {
      // 还原编辑之前的内容
      let getitem = {}
      // 获取编辑之前的内容
      for (const i in this.tempItem) {
        if (this.tempItem[i].id === item.id) {
          getitem = this.tempItem[i]
          break
        }
      }
      // 还原信息
      for (const i in getitem) {
        item[i] = getitem[i]
      }
    },
    // 修改用户信息
    updata(item) {
      updata(item).then(rs => {
        if (rs.success) {
          this.$message.success(rs.message)
        }
        this.getList()
      })
      // 关闭编辑
      this.$set(item, 'isEdit', false)
    },
    // 单个删除
    delItem(item) {
      this.$confirm('此操作将永久删除' + item.user_name + ', 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.delFun([item.id])
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 删除多个弹窗
    showDialogDelUser() {
      if (this.multipleSelection.length === 0) this.$message.info('请先选择')
      else this.dialog.delUser = true
    },
    // 删除选中的项
    delSelect() {
      const delArr = []
      for (var i in this.multipleSelection) {
        delArr.push(this.multipleSelection[i].id)
      }
      this.delFun(delArr)
    },
    // 删除请求
    delFun(delArr) {
      del({ ids: delArr }).then(rs => {
        if (rs.success) {
          this.$message.success('删除成功!')
          this.dialog.delUser = false
          // 更新列表
          this.getList()
        } else {
          this.$message.info('删除失败，请刷新重试')
        }
      })
    },
    // 新增用户
    submit() {
      // 表达验证
      this.$refs['newUser'].validate((valid) => {
        if (valid) {
          this.loading.submit = true
          register(this.newUser).then(rs => {
            if (rs.success) {
              this.$message.success(rs.message)
              this.dialog.newUser = false
              this.loading.submit = false
              // 更新列表
              this.getList()
            }
          })
        } else {
          console.log('error submit!!')
          this.loading.submit = false
          return false
        }
      })
    },
    // 页码
    handleCurrentChange(val) {
      this.query.pageNo = val
      this.getList()
    },
    // 页数
    handleSizeChange(val) {
      this.query.pageSize = val
      this.getList()
    }
  }
}
</script>

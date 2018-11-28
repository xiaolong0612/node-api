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
          <el-input v-show="scope.row.isEdit" v-model="scope.row.birthday" placeholder="请输入内容" />
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
      title="新增用户"
      :visible.sync="dialogNewUser"
      width="30%">
      <el-form ref="form" :model="newUser" label-width="80px">
        <el-form-item label="用户名称">
          <el-input v-model="newUser.user_name"></el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="newUser.user_name"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-input v-model="newUser.user_name"></el-input>
        </el-form-item>
        <el-form-item label="生日">
          <el-input v-model="newUser.user_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogNewUser = false">取 消</el-button>
        <el-button type="primary" @click="dialogNewUser = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getList, updata, del } from '@/api/user'
export default {
  data() {
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
        sex: '',
        age: '',
        user_name: '',
        birthday: ''
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
    add() {

    }
  }
}
</script>

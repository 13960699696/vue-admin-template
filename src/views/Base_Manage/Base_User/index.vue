<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="queryParam.keyword"
        placeholder="用户名"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >查询</el-button>
      <el-button
        class="filter-item"
        style="margin-left: 5px;"
        type="primary"
        icon="el-icon-edit"
        @click="hanldleAdd"
      >添加</el-button>
      <el-button
        class="filter-item"
        style="margin-left: 5px;"
        type="primary"
        icon="el-icon-delete-solid"
        :disabled="!hasSelected()"
        :loading="listLoading"
        @click="handleDelete(selectedRowKeys)"
      >批量删除</el-button>
    </div>
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @selection-change="onSelectChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column
        v-for="(item, index) in columns"
        :key="index"
        :prop="item.dataIndex"
        :width="item.width"
        :label="item.title"
      />
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{ row }">
          <el-button type="primary" @click="handleEdit(row.Id)">编辑</el-button>
          <el-button type="danger" @click="handleDelete([row.Id])">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="pagination.PageIndex"
      :limit.sync="pagination.PageRows"
      @pagination="getList"
    />
    <form-dialog ref="formdialog" :after-submit="getList" />
  </div>
</template>

<script>
import { GetDataList, DeleteData } from '@/api/user'
import Pagination from '@/components/Pagination'
import waves from '@/directive/waves'
import FormDialog from './components/FormDialog'
const columns = [
  { title: '用户名', dataIndex: 'UserName', width: '120' },
  { title: '姓名', dataIndex: 'RealName', width: '60' },
  { title: '性别', dataIndex: 'SexText', width: '60' },
  { title: '出生日期', dataIndex: 'BirthdayText', width: '100' },
  { title: '所属部门', dataIndex: 'DepartmentName', width: '200' },
  { title: '所属角色', dataIndex: 'RoleNames', width: '300' }
]
export default {
  name: 'Base_User',
  components: { Pagination, FormDialog },
  directives: { waves },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: false,
      queryParam: {},
      sorter: { SortField: 'Id', SortType: 'asc' },
      pagination: {
        PageIndex: 1,
        PageRows: 10
      },
      columns,
      selectedRowKeys: []
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    /**
     * 获取数据列表
     */
    getList() {
      this.listLoading = true
      GetDataList({
        ...this.pagination,
        ...this.sorter,
        Search: this.queryParam
      }).then((response) => {
        this.list = response.Data
        this.total = response.Total
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    /**
     * 重新加载数据
     */
    handleFilter() {
      this.pagination.PageIndex = 1
      this.getList()
    },
    /**
     * 添加数据
     */
    hanldleAdd() {
      this.$refs.formdialog.openForm()
    },
    /**
     * 编辑数据
     */
    handleEdit(id) {
      this.$refs.formdialog.openForm(id)
    },
    /**
     * 删除数据
     */
    handleDelete(ids) {
      var thisObj = this
      this.$confirm('确认删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          return new Promise((resolve, reject) => {
            thisObj.submitDelete(ids, resolve, reject)
          }).catch(() => console.log('Oops errors!'))
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    /**
     * 确认删除数据
     */
    submitDelete(ids, resolve, reject) {
      DeleteData(ids).then((resJson) => {
        resolve()
        if (resJson.Success) {
          this.$message.success('操作成功!')
          this.getList()
        } else {
          this.$message.error(resJson.Msg)
        }
      })
    },
    /**
     * 判断是否选择
     */
    hasSelected() {
      return this.selectedRowKeys.length > 0
    },
    /**
     * 表格选择改变
     */
    onSelectChange(val) {
      this.selectedRowKeys = []
      val.forEach((item, index, array) => {
        this.selectedRowKeys.push(item.Id)
      })
    }
  }
}
</script>

<style scoped lang="scss">
.app-container {
  .filter-item {
    margin-left: 5px;
  }
}
</style>

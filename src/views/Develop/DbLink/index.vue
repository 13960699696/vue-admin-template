<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-edit"
        @click="hanldleAdd()"
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
      <el-button
        class="filter-item"
        style="margin-left: 5px;"
        type="primary"
        icon="el-icon-refresh"
        @click="getList()"
      >刷新</el-button>
    </div>
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      row-key="Id"
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
import { GetDataList, DeleteData } from '@/api/Develop/DbLink'
import Pagination from '@/components/Pagination'
import FormDialog from './components/FormDialog'
const columns = [
  { title: '连接名', dataIndex: 'LinkName', width: '150' },
  { title: '连接字符串', dataIndex: 'ConnectionStr', width: '500' },
  { title: '数据库类型', dataIndex: 'DbType', width: '150' }
]
export default {
  name: 'DbLink',
  components: { Pagination, FormDialog },
  data() {
    return {
      tableKey: 0,
      list: [],
      total: 0,
      listLoading: false,
      columns,
      sorter: { SortField: 'Id', SortType: 'asc' },
      pagination: {
        PageIndex: 1,
        PageRows: 10
      },
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
        ...this.sorter
      }).then((response) => {
        this.list = response.Data
        this.total = response.Total
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
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

</style>

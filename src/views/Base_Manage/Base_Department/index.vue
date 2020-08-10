<!-- Vue SFC -->
<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-edit"
        @click="hanldleAdd()"
        >添加</el-button
      >
      <el-button
        class="filter-item"
        style="margin-left: 5px;"
        type="primary"
        icon="el-icon-delete-solid"
        :disabled="!hasSelected()"
        :loading="listLoading"
        @click="handleDelete(selectedRowKeys)"
        >批量删除</el-button
      >
      <el-button
        class="filter-item"
        style="margin-left: 5px;"
        type="primary"
        icon="el-icon-refresh"
        @click="getList()"
        >刷新</el-button
      >
    </div>
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      row-key="Id"
      :default-expand-all="true"
      @selection-change="onSelectChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column
        v-for="(item, index) in columns"
        :key="index"
        :prop="item.dataIndex"
        :width="item.width"
        :label="item.title"
      >
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="230"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row }">
          <el-button type="primary" @click="handleEdit(row.Id)">
            编辑
          </el-button>
          <el-button type="danger" @click="handleDelete([row.Id])">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <form-dialog ref="formdialog" :afterSubmit="getList"></form-dialog>
  </div>
</template>

<script>
import { GetTreeDataList,DeleteData } from '@/api/department'
import FormDialog from './components/FormDialog'
const columns = [
  { title: '部门名', dataIndex: 'Text', width: '300' },
]
export default {
  name: 'Base_Department',
  components: { FormDialog },
  data() {
    return {
      tableKey: 0,
      list: [],
      listLoading: false,
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
      GetTreeDataList({
        ...this.pagination,
        ...this.sorter
      }).then(response => {
        this.list = response.Data
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
      DeleteData(ids).then(resJson => {
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
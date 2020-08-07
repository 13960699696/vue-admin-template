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
        <template slot-scope="{ row, column }">
          <template v-if="column.property != 'PermissionValues'">
            {{ row[column.property] }}
          </template>
          <template v-else>
            <template v-for="(item, index) in row[column.property]">
              <br v-if="index != 0" :key="index" />
              {{ item }}
            </template>
          </template>
        </template>
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
import { GetMenuTreeList,DeleteData } from '@/api/action'
import FormDialog from './components/FormDialog'
const columns = [
  { title: '菜单名', dataIndex: 'Text', width: '250' },
  { title: '类型', dataIndex: 'TypeText', width: '60' },
  { title: '路径', dataIndex: 'Url', width: '250' },
  { title: '需要权限', dataIndex: 'NeedActionText', width: '120' },
  { title: '页面权限', dataIndex: 'PermissionValues', width: '200' },
  { title: '图标', dataIndex: 'icon', width: '60' },
  { title: '排序', dataIndex: 'Sort', width: '60' }
]
export default {
  name: 'Base_Action',
  components: { FormDialog },
  data() {
    return {
      tableKey: 0,
      list: [],
      listLoading: false,
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
      GetMenuTreeList({
        ...this.pagination,
        ...this.sorter
      }).then(resJson => {
        this.list = resJson.Data
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

<style scoped lang="scss">
</style>
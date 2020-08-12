<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select
        v-model="linkId"
        class="filter-item"
        type="primary"
        icon="el-icon-edit"
        @change="onLinkChange()"
      >
        <el-option
          v-for="item in dbs"
          :key="item.Id"
          :value="item.Id"
          :label="item.LinkName"
        />
      </el-select>
      <el-button
        class="filter-item"
        style="margin-left: 5px;"
        type="primary"
        icon="el-icon-delete-solid"
        :disabled="!hasSelected()"
        :loading="listLoading"
        @click="openForm(selectedRowKeys)"
      >生成代码</el-button>
      <el-button
        class="filter-item"
        style="margin-left: 5px;"
        type="primary"
        icon="el-icon-refresh"
        @click="init()"
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
    </el-table>
    <form-dialog ref="formdialog" />
  </div>
</template>

<script>
import { GetAllDbLink, GetDbTableList } from '@/api/Develop/BuildCode'
import FormDialog from './components/FormDialog'
const columns = [
  { title: '表名', dataIndex: 'TableName', width: '200' },
  { title: '描述', dataIndex: 'Description', width: '400' },
  { title: '', dataIndex: 'action' }
]
export default {
  name: 'BuildCode',
  components: { FormDialog },
  data() {
    return {
      tableKey: 0,
      list: [],
      listLoading: false,
      columns,
      dbs: [],
      linkId: '',
      selectedRowKeys: []
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    /**
     * 初始化数据
     */
    init() {
      GetAllDbLink({})
        .then(resJson => {
          this.dbs = resJson.Data
          if (this.dbs && this.dbs.length > 0) {
            this.linkId = this.dbs[0].Id
          }
        })
        .then(() => {
          this.getDataList()
        })
    },
    /**
     * 获取数据列表
     */
    getDataList() {
      this.selectedRowKeys = []
      this.listLoading = true
      GetDbTableList({
        linkId: this.linkId
      })
        .then(resJson => {
          this.listLoading = false
          this.list = resJson.Data
        })
    },
    /**
     * 数据库选择改变触发
     */
    onLinkChange(value) {
      this.getDataList()
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
        this.selectedRowKeys.push(item.TableName)
      })
    },
    /**
     * 代码生成
     */
    openForm() {
      this.$refs.formdialog.openForm(this.selectedRowKeys, this.linkId)
    }
  }
}
</script>

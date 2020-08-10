<template>
  <div class="app-container">
    <div class="filter-container">
      <el-card shadow="hover">
        <el-form
          :inline="true"
          label-position="left"
          label-width="70px"
        >
          <el-row>
            <el-form-item label="时间">
              <el-date-picker v-model="queryParam.startTime" type="datetime" />~
              <el-date-picker v-model="queryParam.endTime" type="datetime" />
            </el-form-item>
            <el-form-item label="内容">
              <el-input
                v-model="queryParam.logContent"
              />
            </el-form-item>
            <el-form-item label="类别">
              <el-select v-model="queryParam.logType">
                <el-option
                  v-for="item in LogTypeList"
                  :key="item.text"
                  :value="item.text"
                  :label="item.text"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="操作人">
              <el-input
                v-model="queryParam.opUserName"
              />
            </el-form-item>
            <el-button
              type="primary"
              @click="handleFilter"
            >查询</el-button>
            <el-button style="margin-left: 8px" @click="() => (queryParam = {})">重置</el-button>
          </el-row>
        </el-form>
      </el-card>
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
    >
      <el-table-column
        v-for="(item, index) in columns"
        :key="index"
        :prop="item.dataIndex"
        :width="item.width"
        :label="item.title"
      />
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="pagination.PageIndex"
      :limit.sync="pagination.PageRows"
      @pagination="getList"
    />
  </div>
</template>

<script>
import { GetLogTypeList, GetLogList } from '@/api/userlog'
import Pagination from '@/components/Pagination'
const columns = [
  { title: '内容', dataIndex: 'LogContent', width: '400' },
  { title: '类别', dataIndex: 'LogType', width: '200' },
  { title: '操作人', dataIndex: 'CreatorRealName', width: '100' },
  { title: '时间', dataIndex: 'CreateTime', width: '200' }
]
export default {
  components: { Pagination },
  data() {
    return {
      tableKey: 0,
      list: [],
      total: 0,
      listLoading: false,
      columns,
      queryParam: {},
      sorter: { SortField: 'Id', SortType: 'asc' },
      pagination: {
        PageIndex: 1,
        PageRows: 10
      },
      LogTypeList: []
    }
  },
  mounted() {
    this.init()
    this.getList()
  },
  methods: {
    /**
     * 初始化日志类型
     */
    init() {
      GetLogTypeList().then((resJson) => {
        this.LogTypeList = resJson.Data
      })
    },
    /**
     * 获取数据列表
     */
    getList() {
      this.listLoading = true
      GetLogList({
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

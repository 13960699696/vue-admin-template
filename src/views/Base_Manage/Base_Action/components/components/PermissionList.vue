<template>
  <div>
    <div class="table-operator">
      <el-button
        class="editable-add-btn"
        icon="el-icon-edit"
        type="default"
        @click="handleAdd"
      >添加权限</el-button>
    </div>
    <el-table :data="data" border style="width: 100%;">
      <el-table-column
        v-for="(item, index) in columns"
        :key="index"
        :prop="item.dataIndex"
        :width="item.width"
        :label="item.title"
      >
        <template slot-scope="{ row, column, $index }">
          <el-input
            v-if="row.editable"
            v-model="cacheData[$index][column.property]"
            style="margin: -5px 0;"
          />
          <template v-else>{{ cacheData[$index][column.property] }}</template>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="230"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row, $index }">
          <div class="editable-row-operations">
            <span v-if="row.editable">
              <el-button @click="save($index)">保存</el-button>
              <el-popconfirm
                confirm-button-text="好的"
                cancel-button-text="不用了"
                icon="el-icon-info"
                icon-color="red"
                title="确认取消吗"
                @onConfirm="cancel($index)"
              >
                <el-button slot="reference">取消</el-button>
              </el-popconfirm>
            </span>
            <span v-else>
              <el-button @click="() => edit(row.key)">编辑</el-button>
              <el-popconfirm
                v-if="data.length"
                confirm-button-text="好的"
                cancel-button-text="不用了"
                icon="el-icon-info"
                icon-color="red"
                title="确认删除吗"
                @onConfirm="onDelete(row.key)"
              >
                <el-button slot="reference">删除</el-button>
              </el-popconfirm>
            </span>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
var uuid = require('node-uuid')
const columns = [
  { title: '权限名', dataIndex: 'Name', width: '200' },
  { title: '权限值(唯一)', dataIndex: 'Value', width: '200' }
]
export default {
  data() {
    return {
      data: [],
      columns,
      parentId: null,
      cacheData: []
    }
  },
  mounted() {},
  methods: {
    /**
     * 编辑页面权限
     */
    edit(key) {
      const newData = [...this.data]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        target.editable = true
        this.data = newData
      }
    },
    /**
     * 保存页面权限
     */
    save(key) {
      this.data[key].Name = this.cacheData[key].Name
      this.data[key].Value = this.cacheData[key].Value
      this.cacheData = JSON.parse(JSON.stringify(this.data))
      this.data[key].editable = false
    },
    /**
     * 取消
     */
    cancel(key) {
      this.cacheData[key].Name = this.data[key].Name
      this.cacheData[key].Value = this.data[key].Value
      this.data[key].editable = false
    },
    /**
     * 删除
     */
    onDelete(key) {
      const data = [...this.data]
      const cacheData = [...this.cacheData]
      this.data = data.filter(item => item.key !== key)
      this.cacheData = cacheData.filter(item => item.key !== key)
    },
    /**
     * 获取权限数据
     */
    getPermissionList() {
      return this.data
    },
    /**
     * 添加权限
     */
    handleAdd() {
      const newData = {
        key: uuid.v4(),
        Name: '权限名',
        Value: '权限值',
        Type: 2,
        ParentId: this.parentId
      }
      this.data = JSON.parse(JSON.stringify([...this.data, newData]))
      this.cacheData = JSON.parse(JSON.stringify([...this.data, newData]))
    }
  }
}
</script>
<style scoped lang="scss">
.editable-row-operations a {
  margin-right: 8px;
}
.editable-add-btn {
  margin-bottom: 8px;
}
</style>

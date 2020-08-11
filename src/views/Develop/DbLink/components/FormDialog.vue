<template>
  <el-dialog :title="title" :visible.sync="visible" width="800px">
    <el-form
      ref="form"
      :rules="rules"
      :model="entity"
      label-position="left"
      label-width="100px"
      style="width: 700px;"
    >
      <el-form-item label="连接名" prop="LinkName">
        <el-input v-model="entity.LinkName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="连接字符串" prop="ConnectionStr">
        <el-input v-model="entity.ConnectionStr" autocomplete="off" />
      </el-form-item>
      <el-form-item label="数据库类型" prop="DbType">
        <el-select v-model="entity.DbType" style="width: 100%;">
          <el-option
            key="SqlServer"
            value="SqlServer"
            label="SqlServer"
          />
          <el-option
            key="MySql"
            value="MySql"
            label="MySql"
          />
          <el-option
            key="PostgreSql"
            value="PostgreSql"
            label="PostgreSql"
          />
          <el-option
            key="Oracle"
            value="Oracle"
            label="Oracle"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">
        取消
      </el-button>
      <el-button type="primary" @click="handleSubmit">
        确定
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { GetTheData, SaveData } from '@/api/Develop/DbLink'
export default {
  props: {
    afterSubmit: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      title: '',
      visible: false,
      entity: {},
      rules: {
        LinkName: [{ required: true, message: '必填' }],
        ConnectionStr: [{ required: true, message: '必填' }],
        DbType: [{ required: true, message: '必填' }]
      }
    }
  },
  mounted() {

  },
  methods: {
    init() {
      this.visible = true
      this.entity = {}
      this.$nextTick(() => {
        this.$refs['form'].clearValidate()
      })
    },
    openForm(id) {
      this.title = '新增数据库配置'
      this.init()
      if (id) {
        this.title = '编辑数据库配置'
        GetTheData({ id: id }).then(resJson => {
          this.entity = resJson.Data
        })
      }
    },
    handleSubmit() {
      this.$refs['form'].validate(valid => {
        if (!valid) {
          return
        }
        this.confirmLoading = true
        SaveData(this.entity).then(resJson => {
          if (resJson.Success) {
            this.$message.success('操作成功!')
            this.afterSubmit()
            this.visible = false
          } else {
            this.$message.error(resJson.Msg)
          }
        })
      })
    }
  }
}
</script>

<style scoped lang="less">

</style>

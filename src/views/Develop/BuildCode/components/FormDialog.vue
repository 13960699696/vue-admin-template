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
      <el-form-item label="生成类型" prop="buildTypes">
        <el-checkbox-group v-model="entity.buildTypes">
          <el-checkbox label="0" name="buildTypes">实体层</el-checkbox>
          <el-checkbox label="1" name="buildTypes">业务层</el-checkbox>
          <el-checkbox label="2" name="buildTypes">接口层</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="生成区域" prop="areaName">
        <el-input v-model="entity.areaName" autocomplete="off" />
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
import { Build } from '@/api/Develop/BuildCode'
export default {
  data() {
    return {
      title: '代码生成',
      visible: false,
      entity: {
        buildTypes: []
      },
      rules: {
        buildTypes: [{ required: true, message: '必填' }],
        areaName: [{ required: true, message: '必填' }]
      }
    }
  },
  methods: {
    init() {
      this.visible = true
      this.entity = { buildTypes: ['0', '1', '2'] }
      this.$nextTick(() => {
        this.$refs['form'].clearValidate()
      })
    },
    openForm(tables, linkId) {
      this.init()
      this.entity.tables = tables
      this.entity.linkId = linkId
    },
    handleSubmit() {
      this.$refs['form'].validate(valid => {
        if (!valid) {
          return
        }
        Build(this.entity).then(resJson => {
          if (resJson.Success) {
            this.$message.success('操作成功!')
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

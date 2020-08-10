<template>
  <el-dialog :title="title" :visible.sync="visible" width="600px">
    <el-form
      ref="form"
      :rules="rules"
      :model="entity"
      label-position="left"
      label-width="70px"
      style="width: 500px;"
    >
      <el-form-item label="应用Id" prop="AppId">
        <el-input v-model="entity.AppId" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密钥" prop="AppSecret">
        <el-input v-model="entity.AppSecret" autocomplete="off" />
      </el-form-item>
      <el-form-item label="应用名" prop="AppName">
        <el-input v-model="entity.AppName" autocomplete="off" />
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
import { GetTheData, SaveData } from '@/api/appsecret'
export default {
  props: {
    afterSubmit: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      title: '添加接口密钥',
      visible: false,
      entity: {},
      rules: {
        AppId: [{ required: true, message: '必填' }],
        AppSecret: [{ required: true, message: '必填' }],
        AppName: [{ required: true, message: '必填' }]
      }
    }
  },
  methods: {
    /**
     * 初始化表单数据
     */
    init() {
      this.visible = true
      this.entity = {}
      this.$nextTick(() => {
        this.$refs['form'].clearValidate()
      })
    },
    /**
     * 打开弹框如果是修改自动赋值
     */
    openForm(id) {
      this.init()
      if (id) {
        GetTheData({ id: id }).then(resJson => {
          this.entity = resJson.Data
        })
      }
    },
    /**
     * 新增或修改密钥
     */
    handleSubmit() {
      this.$refs['form'].validate(valid => {
        if (!valid) {
          return
        }
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

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
      <el-form-item label="角色名" prop="RoleName">
        <el-input v-model="entity.RoleName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="权限" prop="AppSecret">
        <el-tree
          ref="tree"
          :data="actionsTreeData"
          show-checkbox
          node-key="Id"
          class="permission-tree"
          :props="defaultProps"
        />
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
import { SaveData, GetTheData } from '@/api/role'
import { GetActionTreeList, GetAllActionList } from '@/api/action'
export default {
  props: {
    afterSubmit: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      title: '新增角色',
      visible: false,
      entity: {},
      actionsTreeData: [],
      allActionList: [],
      rules: {
        RoleName: [{ required: true, message: '必填' }]
      },
      defaultProps: {
        children: 'children',
        label: 'Text'
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
      GetActionTreeList({}).then(resJson => {
        if (resJson.Success) {
          this.actionsTreeData = resJson.Data
        }
      })
      GetAllActionList({}).then(resJson => {
        if (resJson.Success) {
          this.allActionList = resJson.Data
        }
      })
    },
    /**
     * 打开弹框如果是修改自动赋值
     */
    openForm(id) {
      this.init()
      if (id) {
        this.title = '编辑用户'
        GetTheData({ id: id }).then(resJson => {
          this.entity = resJson.Data
          this.entity.Actions.forEach((i, n) => {
            var node = this.$refs.tree.getNode(i)
            if (node.isLeaf) {
              this.$refs.tree.setChecked(node, true)
            }
          })
        })
      }
    },
    /**
     * 新增或修改用户
     */
    handleSubmit() {
      this.$refs['form'].validate(valid => {
        if (!valid) {
          return
        }
        this.entity['Actions'] = this.$refs.tree
          .getCheckedKeys()
          .concat(this.$refs.tree.getHalfCheckedKeys())
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

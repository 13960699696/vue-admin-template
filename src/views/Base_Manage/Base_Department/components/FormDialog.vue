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
      <el-form-item label="部门名" prop="Name">
        <el-input v-model="entity.Name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="上级部门" prop="ParentId">
        <treeselect
          v-model="entity.ParentId"
          :normalizer="normalizer"
          :options="ParentIdTreeData"
          :show-count="true"
          placeholder="请选择部门"
          :is-default-expanded="true"
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
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import { GetTreeDataList, GetTheData, SaveData } from '@/api/department'
export default {
  components: { Treeselect },
  props: {
    afterSubmit: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      title: '新增部门',
      visible: false,
      entity: {},
      ParentIdTreeData: [],
      rules: {
        Name: [{ required: true, message: '必填' }]
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
      GetTreeDataList({}).then(resJson => {
        if (resJson.Success) {
          this.ParentIdTreeData = resJson.Data
        }
      })
    },
    /**
     * 打开弹框如果是修改自动赋值
     */
    openForm(id) {
      this.init()
      if (id) {
        this.title = '编辑部门'
        GetTheData({ id: id }).then(resJson => {
          this.entity = resJson.Data
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
        SaveData(this.entity)
          .then(resJson => {
            if (resJson.Success) {
              this.$message.success('操作成功!')
              this.afterSubmit()
              this.visible = false
            } else {
              this.$message.error(resJson.Msg)
            }
          })
      })
    },
    /**
     * 后台返回的数据和VueTreeselect要求的数据结构不同，需要进行转换
     */
    normalizer(node) {
      // 去掉children=[]的children属性
      if (node.children && !node.children.length) {
        delete node.children
      }
      return {
        id: node.Id,
        label: node.Text,
        children: node.Children || []
      }
    }
  }
}
</script>

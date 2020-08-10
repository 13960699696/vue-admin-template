<template>
  <el-dialog :title="title" :visible.sync="visible" width="800px">
    <el-form
      ref="form"
      :rules="rules"
      :model="entity"
      label-position="left"
      label-width="110px"
      style="width: 750px;"
    >
      <el-form-item label="菜单名" prop="Name">
        <el-input v-model="entity.Name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="上级菜单" prop="ParentId">
        <treeselect
          v-model="entity.ParentId"
          :normalizer="normalizer"
          :options="ParentIdTreeData"
          :show-count="true"
          placeholder="请选择上级菜单"
          :is-default-expanded="true"
        />
      </el-form-item>
      <el-form-item label="类型" prop="Type">
        <el-radio-group v-model="entity.Type">
          <el-radio :label="0">菜单</el-radio>
          <el-radio :label="1">页面</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="路径" prop="Url">
        <el-input v-model="entity.Url" autocomplete="off" />
      </el-form-item>
      <el-form-item label="是否需要权限" prop="NeedAction">
        <el-radio-group v-model="entity.NeedAction">
          <el-radio :label="false">否</el-radio>
          <el-radio :label="true">是</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="图标" prop="Icon">
        <el-input v-model="entity.Icon" autocomplete="off" />
      </el-form-item>
      <el-form-item label="排序" prop="Icon">
        <el-input v-model="entity.Sort" type="number" autocomplete="off" />
      </el-form-item>
      <el-card class="box-card">
        <div slot="header">
          <span>页面权限</span>
        </div>
        <div>
          <Permission-List ref="permissionList" />
        </div>
      </el-card>
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
import { GetMenuTreeList, GetTheData, SaveData } from '@/api/action'
import PermissionList from './components/PermissionList'
export default {
  components: { Treeselect, PermissionList },
  props: {
    afterSubmit: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      title: '新增权限',
      visible: false,
      entity: {},
      ParentIdTreeData: [],
      rules: {
        Name: [{ required: true, message: '必填' }],
        Type: [{ required: true, message: '必填' }],
        NeedAction: [{ required: true, message: '必填' }]
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
        // this.$refs.permissionList.init(id)
        this.$refs['form'].clearValidate()
      })
      GetMenuTreeList({}).then(resJson => {
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
        this.title = '编辑权限'
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
        this.entity.permissionList = this.$refs.permissionList.getPermissionList()
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

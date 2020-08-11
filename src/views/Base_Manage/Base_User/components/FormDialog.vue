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
      <el-form-item label="用户名" prop="UserName">
        <el-input v-model="entity.UserName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" prop="newPwd">
        <el-input v-model="entity.newPwd" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="姓名" prop="RealName">
        <el-input v-model="entity.RealName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="性别" prop="Sex">
        <el-radio-group v-model="entity.Sex">
          <el-radio :label="0">女</el-radio>
          <el-radio :label="1">男</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="部门" prop="DepartmentId">
        <treeselect
          v-model="entity.DepartmentId"
          :options="DepartmentIdTreeData"
          :show-count="true"
          placeholder="请选择部门"
          :normalizer="normalizer"
          :is-default-expanded="true"
        />
      </el-form-item>
      <el-form-item label="生日" prop="Birthday">
        <el-date-picker
          v-model="entity.Birthday"
          type="date"
          placeholder="选择生日"
          style="width: 100%;"
          value-format="yyyy-MM-dd"
        />
      </el-form-item>
      <el-form-item label="角色" prop="RoleIdList">
        <el-select v-model="entity.RoleIdList" multiple style="width: 100%;">
          <el-option
            v-for="item in RoleOptionList"
            :key="item.Id"
            :value="item.Id"
            :label="item.RoleName"
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
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import { GetDataList } from '@/api/role'
import { GetTreeDataList } from '@/api/department'
import { GetTheData, SaveData } from '@/api/user'
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
      title: '',
      visible: false,
      entity: {},
      DepartmentIdTreeData: [],
      RoleOptionList: [],
      rules: {
        UserName: [{ required: true, message: '必填' }],
        RealName: [{ required: true, message: '必填' }],
        Sex: [{ required: true, message: '必填' }]
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
          this.DepartmentIdTreeData = resJson.Data
        }
      })
      GetDataList({}).then(resJson => {
        if (resJson.Success) {
          this.RoleOptionList = resJson.Data
        }
      })
    },
    /**
     * 打开弹框如果是修改自动赋值
     */
    openForm(id) {
      this.title = '新增用户'
      this.init()
      if (id) {
        this.title = '编辑用户'
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

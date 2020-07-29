<template>
  <div class="app-container">
    <el-button type="primary" @click="handleAddRole">新增角色</el-button>
    <el-table :data="rolesList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="角色ID" width="220">
        <template slot-scope="scope">{{ scope.row.Id }}</template>
      </el-table-column>
      <el-table-column align="center" label="创建时间" width="220">
        <template slot-scope="scope">{{ scope.row.CreateTime }}</template>
      </el-table-column>
      <el-table-column align="center" label="创建人ID" width="220">
        <template slot-scope="scope">{{ scope.row.CreatorId }}</template>
      </el-table-column>
      <el-table-column align="center" label="角色名">
        <template slot-scope="scope">{{ scope.row.RoleName }}</template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope)">编辑权限</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'编辑角色':'新增角色'">
      <el-form :model="role" label-width="80px" label-position="left">
        <el-form-item label="角色名">
          <el-input v-model="role.RoleName" placeholder="请输入角色名" />
        </el-form-item>
        <!-- <el-form-item label="权限菜单">
          <el-tree ref="tree" :check-strictly="checkStrictly" :data="routesData" :props="defaultProps" show-checkbox node-key="path" class="permission-tree" />
        </el-form-item> -->
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">
          取消
        </el-button>
        <el-button type="primary">
          确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
const defaultRole = {
  Id: "",
  CreateTime: "",
  CreatorId: "",
  RoleName: "",
};
export default {
  data() {
    return {
      role: Object.assign({}, defaultRole),
      rolesList: [],
      dialogVisible: false,
      dialogType: '新增角色',
    };
  },
  created() {},
  mounted() {},
  methods: {
    /**
     * 添加角色
     */
    handleAddRole() {
      this.role = Object.assign({}, defaultRole);
      if (this.$refs.tree) {
        this.$refs.tree.setCheckedNodes([]);
      }
      this.dialogType = "新增角色";
      this.dialogVisible = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.app-container {
  .roles-table {
    margin-top: 30px;
  }
  .permission-tree {
    margin-bottom: 30px;
  }
}
</style>


<template>
  <el-container class="member_content">
    <el-header>
      <el-button type="primary" @click="addVipform()">{{$t("member.btn_add") }}</el-button>
    </el-header>
    <el-main class="main_content">
      <div
        class="el_item"
        v-for="(item, index) in memberbox"
        :key="index"
        v-show="item.is_show == 1"
      >
        <div class="name">{{ item.name }}</div>
        <div class="days">{{ item.expire_days }}{{$t("member.day") }}</div>
        <div class="charge">{{$t("member.currency") }}{{ item.charge }}</div>
        <div class="options">
          <el-button type="danger" @click="del_Meberitem(item.id)">
            {{$t("member.btn_del") }}
          </el-button>
          <el-button type="warning" @click="editVipform(item.id)">
            {{$t("member.btn_edit") }}
          </el-button>
        </div>
      </div>
    </el-main>
  </el-container>
</template>
<script>
export default {
  name: "vip_member",
  data() {
    return {
      loading: false,
      dialogAddvisible: false,
      page: 1,
      addForm: {},
      memberbox: [],
    };
  },
  created() {
    this.getmemberinfo(1);
  },
  methods: {
    //添加
    addVipform() {
      this.$router.push({ name: "Addrole" });
    },
    //编辑
    editVipform(id) {
      this.$router.push({
        name: "Editrole",
        query: {
          id: id,
        },
      });
    },
    //获取会员信息
    getmemberinfo(p) {
      this.loading = true;
      var data = {
        page: p,
        total: 0,
        size: 10,
      };
      this.$api.Member.Info(data).then((resp) => {
        if (resp.status == 0) {
          this.page = resp.data.current_page + 1;
          this.memberbox = resp.data.data;
        }
        this.loading = false;
      });
    },
    //删除会员
    del_Meberitem(id) {
      this.$confirm("确认操作？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //点击确定按钮的操作
          this.loading = true;
          this.$api.Member.Del(id).then((resp) => {
            if (resp.status == 0) {
              this.$message("删除成功");
              this.getmemberinfo(1);
            } else {
              this.$message(resp.message);
            }
            this.loading = false;
          });
        })
        .catch(() => {
          //点击删除按钮的操作
        });
    },
    //刷新页面
    refresh() {
      console.log("刷新页面");
    },
    addDialogClose() {
      //刷新页面
      this.refresh();
      this.dialogAddvisible = false;
    },
  },
};
</script>
<style lang="less" scoped>
div {
  box-sizing: border-box;
}
.main_content {
  width: 100%;
  height: auto;
  float: left;
  .el_item {
    width: 300px;
    height: auto;
    float: left;
    background-color: rgba(0, 0, 0, 0.05);
    padding: 15px 30px;
    border-radius: 20px;
    margin-right: 30px;
    margin-bottom: 30px;
    .name {
      width: 100%;
      height: auto;
      float: left;
      color: #333;
      text-align: center;
      margin-bottom: 50px;
      font-size: 24px;
      font-weight: 700;
      margin-top: 30px;
    }
    .days {
      width: 100%;
      height: auto;
      float: left;
      color: #333;
      text-align: center;
      margin-bottom: 50px;
      font-size: 18px;
    }
    .charge {
      width: 100%;
      height: auto;
      float: left;
      font-size: 30px;
      color: red;
      text-align: center;
    }
    .options {
      width: 100%;
      height: auto;
      float: left;
      text-align: right;
      margin-top: 30px;
    }
  }
}
</style>
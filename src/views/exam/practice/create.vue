<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="创建练习"></back-bar>

    <div class="float-left">
      <el-form ref="form" :model="addform" :rules="rules" label-width="200px">
        <el-form-item label="分类" prop="category_id">
          <div class="d-flex">
            <div>
              <el-select v-model="addform.category_id">
                <el-option
                  v-for="(item, index) in categories"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </div>
            <div class="ml-15">
              <el-link
                type="primary"
                @click="$router.push({ name: 'PracticeCategories' })"
              >
                分类管理
              </el-link>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="练习名" prop="name">
          <el-input v-model="addform.name" class="w-100"></el-input>
        </el-form-item>

        <el-form-item>
          <span slot="label">
            <form-label
              text="免费"
              helper="所有人都可以参与考试。"
            ></form-label>
          </span>
          <el-switch
            v-model="addform.is_free"
            :active-value="1"
            :inactive-value="0"
          >
          </el-switch>
        </el-form-item>
        <el-form-item v-if="addform.is_free === 0">
          <span slot="label">
            <form-label
              text="会员可参与"
              helper="VIP用户可直接参与考试。"
            ></form-label>
          </span>
          <el-switch
            v-model="addform.is_vip_free"
            :active-value="1"
            :inactive-value="0"
          >
          </el-switch>
        </el-form-item>
        <el-form-item v-if="addform.is_free === 0">
          <span slot="label">
            <form-label
              text="价格"
              helper="价格大于0的话用户可以购买此练习参与练习，价格为0的话则禁止通过购买参与"
            ></form-label>
          </span>
          <el-input
            type="number"
            v-model="addform.charge"
            class="w-200px"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>

    <div class="bottom-menus">
      <div class="bottom-menus-box">
        <div>
          <el-button @click="formValidate" :loading="loading" type="primary">
            保存
          </el-button>
        </div>
        <div class="ml-24">
          <el-button @click="$router.back()"> 取消 </el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      addform: {
        thumb: null,
        name: null,
        is_vip_free: null,
        is_free: null,
        charge: null,
        category_id: null,
      },
      rules: {
        name: [
          {
            required: true,
            message: "练习名不能为空",
            trigger: "blur",
          },
        ],
        category_id: [
          {
            required: true,
            message: "请选择分类",
            trigger: "blur",
          },
        ],
      },
      categories: [],
      courses: [],
      loading: false,
    };
  },
  mounted() {
    this.params();
  },
  methods: {
    params() {
      this.$api.Exam.Practice.Create().then((res) => {
        this.categories = res.data.categories;
      });
    },
    formValidate() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.confirm();
        }
      });
    },
    confirm() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      this.$api.Exam.Practice.Store(this.addform)
        .then(() => {
          this.$message.success(this.$t("common.success"));
          this.$router.back();
        })
        .catch((e) => {
          this.loading = false;
          this.$message.error(e.message);
        });
    },
  },
};
</script>
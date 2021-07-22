<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="创建试卷"></back-bar>

    <div class="float-left">
      <el-form ref="form" :model="addform" :rules="rules" label-width="200px">
        <el-form-item label="标题" prop="title">
          <el-input
            v-model="addform.title"
            placeholder="试卷标题"
            class="w-100"
          ></el-input>
        </el-form-item>

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
                @click="$router.push({ name: 'PaperCategories' })"
              >
                分类管理
              </el-link>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="分数" prop="score">
          <el-input
            placeholder="分数"
            type="number"
            v-model="addform.score"
            class="w-200px"
          ></el-input>
        </el-form-item>
        <el-form-item label="及格分" prop="pass_score">
          <el-input
            placeholder="及格分"
            type="number"
            v-model="addform.pass_score"
            class="w-200px"
          ></el-input>
        </el-form-item>
        <el-form-item label="时间" prop="expired_minutes">
          <el-input
            placeholder="单位：分钟"
            type="number"
            v-model="addform.expired_minutes"
            class="w-200px"
          ></el-input>
        </el-form-item>
        <el-form-item label="可重复考试次数" prop="try_times">
          <el-input
            placeholder="填写0意味着不限制"
            type="number"
            v-model="addform.try_times"
            class="w-200px"
          ></el-input>
        </el-form-item>
        <el-form-item prop="enabled_invite">
          <span slot="label">
            <form-label
              text="仅邀请"
              helper="只有在后台添加的用户才可以参与考试。该使用场景如：老师指定的一批学生科参与考试。"
            ></form-label>
          </span>
          <el-switch
            v-model="addform.enabled_invite"
            :active-value="1"
            :inactive-value="0"
          >
          </el-switch>
        </el-form-item>
        <el-form-item v-if="addform.enabled_invite === 0" prop="is_free">
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
        <el-form-item
          v-if="addform.enabled_invite === 0 && addform.is_free === 0"
          prop="is_vip_free"
        >
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
        <el-form-item
          v-if="addform.enabled_invite === 0 && addform.is_free === 0"
        >
          <span slot="label">
            <form-label
              text="价格"
              helper="价格大于0的话用户可以购买此试卷参与考试，价格为0的话则禁止购买"
            ></form-label>
          </span>
          <el-input
            type="number"
            v-model="addform.charge"
            class="w-200px"
          ></el-input>
        </el-form-item>
        <el-form-item
          v-if="addform.enabled_invite === 0 && addform.is_free === 0"
        >
          <span slot="label">
            <form-label
              text="购买指定课程可参与"
              helper="购买其中一门课程即可参与考试"
            ></form-label>
          </span>
          <el-select multiple v-model="addform.required_courses">
            <el-option
              v-for="(item, index) in courses"
              :key="index"
              :label="item.title"
              :value="item.id"
            >
            </el-option>
          </el-select>
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
        random_category_id: null,
        random_rule: null,
        thumb: null,
        title: null,
        try_times: null,
        score: null,
        required_courses: null,
        pass_score: null,
        is_vip_free: null,
        is_random: 0,
        is_free: null,
        expired_minutes: null,
        enabled_invite: null,
        charge: null,
        category_id: null,
      },
      rules: {
        title: [
          {
            required: true,
            message: "标题不能为空",
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
        score: [
          {
            required: true,
            message: "分数不能为空",
            trigger: "blur",
          },
        ],
        pass_score: [
          {
            required: true,
            message: "及格分不能为空",
            trigger: "blur",
          },
        ],
        expired_minutes: [
          {
            required: true,
            message: "时间不能为空",
            trigger: "blur",
          },
        ],
        try_times: [
          {
            required: true,
            message: "可重复考试次数不能为空",
            trigger: "blur",
          },
        ],
        enabled_invite: [
          {
            required: true,
            message: "请选择仅邀请",
            trigger: "blur",
          },
        ],
        is_free: [
          {
            required: true,
            message: "请选择是否免费",
            trigger: "blur",
          },
        ],
        is_vip_free: [
          {
            required: true,
            message: "请选择是否会员可参与",
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
      this.$api.Exam.Paper.Create().then((res) => {
        this.categories = res.data.categories;
        this.courses = res.data.courses;
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
      var ids = this.addform.required_courses.join(",");
      this.addform.required_courses = ids;
      this.$api.Exam.Paper.Store(this.addform)
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
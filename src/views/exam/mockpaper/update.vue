<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="编辑模拟试卷"></back-bar>

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
                @click="$router.push({ name: 'MockpaperCategories' })"
              >
                分类管理
              </el-link>
            </div>
          </div>
        </el-form-item>

        <el-form-item label="时间" prop="expired_minutes">
          <el-input
            placeholder="单位：分钟"
            type="number"
            v-model="addform.expired_minutes"
            class="w-200px"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <span slot="label">
            <form-label
              text="仅邀请"
              helper="只有在后台添加的用户才可以参与考试。该使用场景如：老师指定的一批学生科参与考试。"
            ></form-label>
          </span>
          <el-switch
            v-model="addform.is_invite"
            :active-value="1"
            :inactive-value="0"
          >
          </el-switch>
        </el-form-item>
        <el-form-item v-if="addform.is_invite === 0" prop="charge">
          <span slot="label">
            <form-label
              text="价格"
              helper="价格大于0的话用户可以购买此试卷参与考试，价格为0的话则为免费"
            ></form-label>
          </span>
          <el-input
            type="number"
            v-model="addform.charge"
            class="w-200px"
          ></el-input>
        </el-form-item>
        <el-form-item v-if="addform.charge > 0" prop="is_vip_free">
          <span slot="label">
            <form-label text="VIP免费"></form-label>
          </span>
          <el-switch
            v-model="addform.is_vip_free"
            :active-value="1"
            :inactive-value="0"
          >
          </el-switch>
        </el-form-item>
        <el-form-item>
          <span slot="label">
            <form-label text="随机试题分类范围"></form-label>
          </span>
          <el-select multiple v-model="addform.rule.category_ids">
            <el-option
              v-for="(item, index) in courses"
              :key="index"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="单选题数量">
          <el-input
            type="number"
            v-model="addform.rule.num.choice"
            class="w-200px"
          ></el-input>
        </el-form-item>
        <el-form-item label="多选题数量">
          <el-input
            type="number"
            v-model="addform.rule.num.select"
            class="w-200px"
          ></el-input>
        </el-form-item>
        <el-form-item label="填空题数量">
          <el-input
            type="number"
            v-model="addform.rule.num.input"
            class="w-200px"
          ></el-input>
        </el-form-item>
        <el-form-item label="问答题数量">
          <el-input
            type="number"
            v-model="addform.rule.num.qa"
            class="w-200px"
          ></el-input>
        </el-form-item>
        <el-form-item label="判断题数量">
          <el-input
            type="number"
            v-model="addform.rule.num.judge"
            class="w-200px"
          ></el-input>
        </el-form-item>
        <el-form-item label="题帽题数量">
          <el-input
            type="number"
            v-model="addform.rule.num.cap"
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
        id: this.$route.query.id,
        pass_score: null,
        thumb: null,
        title: null,
        is_vip_free: null,
        expired_minutes: null,
        is_invite: null,
        charge: 0,
        category_id: null,
        rule: {
          category_ids: [],
          num: {
            choice: 0,
            select: 0,
            input: 0,
            qa: 0,
            judge: 0,
            cap: 0,
          },
        },
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

        expired_minutes: [
          {
            required: true,
            message: "时间不能为空",
            trigger: "blur",
          },
        ],

        charge: [
          {
            required: true,
            message: "价格不能为空",
            trigger: "blur",
          },
        ],
        is_vip_free: [
          {
            required: true,
            message: "请选择是否会员免费",
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
    this.detail();
  },
  methods: {
    params() {
      this.$api.Exam.Mockpaper.Create().then((res) => {
        this.categories = res.data.categories;
        this.courses = res.data.question_categories;
      });
    },
    detail() {
      this.$api.Exam.Mockpaper.Detail(this.addform.id).then((res) => {
        this.addform = res.data;
        this.addform.rule = JSON.parse(res.data.rule);
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
      this.addform.rule = JSON.stringify(this.addform.rule);
      this.$api.Exam.Mockpaper.Update(this.addform.id, this.addform)
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
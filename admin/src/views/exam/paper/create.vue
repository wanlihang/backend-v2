<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="新建试卷"></back-bar>
    <div class="float-left">
      <el-form ref="form" :model="addform" :rules="rules" label-width="200px">
        <el-form-item label="试卷名" prop="title">
          <el-input
            v-model="addform.title"
            placeholder="试卷名"
            class="w-600px"
          ></el-input>
        </el-form-item>

        <el-form-item label="分类" prop="category_id">
          <div class="d-flex">
            <div>
              <el-select class="w-300px" v-model="addform.category_id">
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

        <el-form-item label="考试次数" prop="try_times">
          <div class="d-flex">
            <div>
              <el-input
                placeholder="请输入整数"
                type="number"
                v-model="addform.try_times"
                class="w-200px"
              ></el-input>
            </div>
            <div class="ml-10">
              <helper-text
                text="可限制用户可考次数。填写0的话意味着不限制考试次数。"
              ></helper-text>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="跳过阅卷" prop="is_skip_mark">
          <div class="d-flex">
            <div>
              <el-switch
                v-model="addform.is_skip_mark"
                :active-value="1"
                :inactive-value="0"
              >
              </el-switch>
            </div>
            <div class="ml-10">
              <helper-text
                text="若试卷中包含问答题，将自动跳过问答题阅卷生成总成绩。"
              ></helper-text>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="仅邀请" prop="enabled_invite">
          <div class="d-flex">
            <div>
              <el-switch
                v-model="addform.enabled_invite"
                :active-value="1"
                :inactive-value="0"
              >
              </el-switch>
            </div>
            <div class="ml-10">
              <helper-text
                text="只有在后台添加的用户才可以参与考试。该使用场景如：老师指定的一批学生科参与考试。"
              ></helper-text>
            </div>
          </div>
        </el-form-item>

        <template v-if="addform.enabled_invite === 0">
          <el-form-item label="免费参与" prop="is_free">
            <div class="d-flex">
              <div>
                <el-switch
                  v-model="addform.is_free"
                  :active-value="1"
                  :inactive-value="0"
                >
                </el-switch>
              </div>
              <div class="ml-10">
                <helper-text text="开启所有用户均可直接考试。"></helper-text>
              </div>
            </div>
          </el-form-item>

          <template v-if="addform.is_free === 0">
            <el-form-item label="价格" prop="charge">
              <div class="d-flex">
                <div>
                  <el-input
                    type="number"
                    v-model="addform.charge"
                    class="w-200px"
                    placeholder="请输入整数"
                  ></el-input>
                </div>
                <div class="ml-10">
                  <helper-text
                    text="设置价格的用户想要参与考试则必须需要购买试卷。价格为0的话意味着禁止购买。"
                  ></helper-text>
                </div>
              </div>
            </el-form-item>

            <el-form-item
              prop="is_vip_free"
              label="VIP免费"
              v-if="addform.charge > 0"
            >
              <div class="d-flex">
                <div>
                  <el-switch
                    v-model="addform.is_vip_free"
                    :active-value="1"
                    :inactive-value="0"
                  >
                  </el-switch>
                </div>
                <div class="ml-10">
                  <helper-text
                    text="VIP会员可无需购买直接参与考试。"
                  ></helper-text>
                </div>
              </div>
            </el-form-item>

            <el-form-item label="购买实验课程">
              <div class="d-flex">
                <div>
                  <el-select
                    class="w-300px"
                    multiple
                    v-model="addform.required_courses"
                  >
                    <el-option
                      v-for="(item, index) in courses"
                      :key="index"
                      :label="item.title"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                </div>
                <div class="ml-10">
                  <helper-text
                    text="购买指定的实验课程可直接参与考试。"
                  ></helper-text>
                </div>
              </div>
            </el-form-item>
          </template>
        </template>
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
        title: null,
        try_times: null,
        required_courses: null,
        pass_score: null,
        is_vip_free: 0,
        is_random: 0,
        is_free: 0,
        expired_minutes: null,
        enabled_invite: 0,
        charge: 0,
        category_id: null,
        is_skip_mark: 0,
      },
      rules: {
        title: [
          {
            required: true,
            message: "试卷名不能为空",
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
        is_skip_mark: [
          {
            required: true,
            message: "请选择是否跳过阅卷",
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
        charge: [
          {
            required: true,
            message: "请输入价格",
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
      if (
        this.addform.enabled_invite === 0 &&
        this.addform.is_free === 0 &&
        parseInt(this.addform.charge) === 0 &&
        (this.addform.required_courses.length === 0 ||
          this.addform.required_courses === "")
      ) {
        this.$message.error("设置价格大于0或者设置有购买实验课程");
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

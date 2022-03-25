<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="新建模拟试卷"></back-bar>

    <div class="float-left">
      <el-form ref="form" :model="addform" :rules="rules" label-width="200px">
        <el-form-item label="标题" prop="title">
          <el-input
            v-model="addform.title"
            placeholder="试卷标题"
            class="w-600px"
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

        <el-form-item label="时间" prop="expired_minutes">
          <el-input
            placeholder="单位：分钟"
            type="number"
            v-model="addform.expired_minutes"
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

        <el-form-item label="仅邀请" prop="is_invite">
          <div class="d-flex">
            <div>
              <el-switch
                v-model="addform.is_invite"
                :active-value="1"
                :inactive-value="0"
              >
              </el-switch>
            </div>
            <div class="ml-10">
              <helper-text
                text="开启仅邀请的话，只有后台添加的用户可以参与考试"
              ></helper-text>
            </div>
          </div>
        </el-form-item>

        <template v-if="addform.is_invite === 0">
          <el-form-item label="免费参与" prop="is_free">
            <div class="d-flex">
              <div>
                <el-switch
                  v-model="is_free"
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

          <template v-if="is_free === 0">
            <el-form-item label="价格" prop="charge">
              <div class="d-flex">
                <div>
                  <el-input
                    type="number"
                    v-model="addform.charge"
                    class="w-200px"
                  ></el-input>
                </div>
                <div class="ml-10">
                  <helper-text
                    text="请输入整数。不支持小数。价格大于0则意味着用户可以购买试卷参与。价格为0意味着禁止购买。"
                  ></helper-text>
                </div>
              </div>
            </el-form-item>

            <el-form-item
              label="VIP免费"
              prop="is_vip_free"
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
                    text="设置VIP免费的话，则VIP会员用户可以无需购买直接参与考试。"
                  ></helper-text>
                </div>
              </div>
            </el-form-item>
          </template>
        </template>

        <el-form-item label="试题随机范围">
          <div class="d-flex">
            <div>
              <el-select
                class="w-400px"
                multiple
                v-model="addform.rule.category_ids"
              >
                <el-option
                  v-for="(item, index) in courses"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </div>
          </div>
        </el-form-item>
        <template v-if="addform.rule.category_ids.length > 0">
          <el-form-item label="单选题数量">
            <div class="d-flex">
              <div>
                <el-input
                  type="number"
                  v-model="addform.rule.num.choice"
                  class="w-200px"
                ></el-input>
              </div>
              <div class="ml-10">
                <div>（共{{ countMap[1] }}题）</div>
              </div>
              <div class="ml-10">
                <helper-text text="每次考试抽出的单选题数量"></helper-text>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="多选题数量">
            <div class="d-flex">
              <div>
                <el-input
                  type="number"
                  v-model="addform.rule.num.select"
                  class="w-200px"
                ></el-input>
              </div>
              <div class="ml-10">
                <div>（共{{ countMap[2] }}题）</div>
              </div>
              <div class="ml-10">
                <helper-text text="每次考试抽出的多选题数量"></helper-text>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="填空题数量">
            <div class="d-flex">
              <div>
                <el-input
                  type="number"
                  v-model="addform.rule.num.input"
                  class="w-200px"
                ></el-input>
              </div>
              <div class="ml-10">
                <div>（共{{ countMap[3] }}题）</div>
              </div>
              <div class="ml-10">
                <helper-text text="每次考试抽出填空题数量"></helper-text>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="问答题数量">
            <div class="d-flex">
              <div>
                <el-input
                  type="number"
                  v-model="addform.rule.num.qa"
                  class="w-200px"
                ></el-input>
              </div>
              <div class="ml-10">
                <div>（共{{ countMap[4] }}题）</div>
              </div>
              <div class="ml-10">
                <helper-text text="每次考试抽出的问答题数量"></helper-text>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="判断题数量">
            <div class="d-flex">
              <div>
                <el-input
                  type="number"
                  v-model="addform.rule.num.judge"
                  class="w-200px"
                ></el-input>
              </div>
              <div class="ml-10">
                <div>（共{{ countMap[5] }}题）</div>
              </div>
              <div class="ml-10">
                <helper-text text="每次考试抽出的判断题数量"></helper-text>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="题帽题数量">
            <div class="d-flex">
              <div>
                <el-input
                  type="number"
                  v-model="addform.rule.num.cap"
                  class="w-200px"
                ></el-input>
              </div>
              <div class="ml-10">
                <div>（共{{ countMap[6] }}题）</div>
              </div>
              <div class="ml-10">
                <helper-text text="每次考试抽出的题帽题数量"></helper-text>
              </div>
            </div>
          </el-form-item>
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
      is_free: 0,
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
      },
      countMap: [],
      categories: [],
      courses: [],
      loading: false,
    };
  },
  watch: {
    "addform.rule.category_ids"() {
      this.params();
    },
  },
  mounted() {
    this.params();
  },
  methods: {
    params() {
      this.$api.Exam.Mockpaper.Create({
        category_ids: this.addform.rule.category_ids,
      }).then((res) => {
        this.categories = res.data.categories;
        this.courses = res.data.question_categories;
        this.countMap = res.data.count_map;
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
      if (this.addform.is_invite === 0 && this.is_free === 1) {
        this.addform.charge = 0;
      }
      if (
        parseInt(this.addform.rule.num.choice) > 0 ||
        parseInt(this.addform.rule.num.select) > 0 ||
        parseInt(this.addform.rule.num.input) > 0 ||
        parseInt(this.addform.rule.num.qa) > 0 ||
        parseInt(this.addform.rule.num.judge) > 0 ||
        parseInt(this.addform.rule.num.cap) > 0
      ) {
        if (parseInt(this.addform.rule.num.choice) > this.countMap[1]) {
          this.$message.error("单选题数量超出可抽取单选题总量");
          return;
        }
        if (parseInt(this.addform.rule.num.select) > this.countMap[2]) {
          this.$message.error("多选题数量超出可抽取多选题总量");
          return;
        }
        if (parseInt(this.addform.rule.num.input) > this.countMap[3]) {
          this.$message.error("填空题数量超出可抽取填空题总量");
          return;
        }
        if (parseInt(this.addform.rule.num.qa) > this.countMap[4]) {
          this.$message.error("问答题数量超出可抽取问答题总量");
          return;
        }
        if (parseInt(this.addform.rule.num.judge) > this.countMap[5]) {
          this.$message.error("判断题数量超出可抽取判断题总量");
          return;
        }
        if (parseInt(this.addform.rule.num.cap) > this.countMap[6]) {
          this.$message.error("题帽题数量超出可抽取题帽题总量");
          return;
        }
        this.loading = true;
        let data = {};
        Object.assign(data, this.addform);
        data.rule = JSON.stringify(data.rule);

        this.$api.Exam.Mockpaper.Store(data)
          .then(() => {
            this.$message.success(this.$t("common.success"));
            this.$router.back();
          })
          .catch((e) => {
            this.loading = false;
            this.$message.error(e.message);
          });
      } else {
        this.$message.error("请至少填入一种抽出题型的数量");
      }
    },
  },
};
</script>

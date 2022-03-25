<template>
  <div class="meedu-main-body">
    <back-bar class="mb-30" title="学员标签"></back-bar>

    <div class="float-left">
      <el-form ref="form" label-width="200px">
        <el-form-item label="标签">
          <div class="d-flex">
            <div>
              <el-select multiple filterable v-model="tagIds">
                <el-option
                  v-for="(item, index) in tags"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </div>
            <div class="ml-15">
              <el-link
                @click="$router.push({ name: 'MemberTagIndex' })"
                type="primary"
              >
                标签管理
              </el-link>
            </div>
          </div>
        </el-form-item>
      </el-form>
    </div>

    <div class="bottom-menus">
      <div class="bottom-menus-box">
        <div>
          <el-button @click="confirm" :loading="loading" type="primary">
            保存
          </el-button>
        </div>
        <div class="ml-24">
          <el-button @click="$router.back()">取消 </el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      id: null,
      user: null,
      tagIds: [],
      tags: [],
      loading: false,
    };
  },
  mounted() {
    this.id = this.$route.params.userId;

    this.getUser();
    this.params();
  },
  methods: {
    getUser() {
      this.$api.Member.Edit(this.id).then((res) => {
        let data = [];

        if (res.data.tags) {
          for (let i = 0; i < res.data.tags.length; i++) {
            data.push(res.data.tags[i].id);
          }
        }

        this.tagIds = data;
      });
    },
    params() {
      this.$api.Member.Create().then((res) => {
        this.tags = res.data.tags;
      });
    },
    confirm() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      this.$api.Member.TagUpdate(this.id, { tag_ids: this.tagIds.join(",") })
        .then(() => {
          this.$message.success(this.$t("common.success"));

          this.loading = false;

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

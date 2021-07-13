<template>
  <div>123</div>
</template>

<script>
export default {
  data() {
    return {
      name: "Orderlist",
      page: 1,
      loading: false,
    };
  },
  created() {
    this.getList(1);
  },
  methods: {
    //获取order列表
    getList(p) {
      this.loading = true;
      var data = {
        page: p,
        total: 0,
        size: 10,
        user_id: this.user_id,
        status: this.status,
        order_id: this.order_id,
      };
      this.$api.Order.List(data).then((resp) => {
        if (resp.status == 0) {
          this.page = resp.data.current_page + 1;
          console.log(111);
        }
        this.loading = false;
      });
    },
  },
};
</script>

# MeEdu 后台前端项目

### 常用链接

- [MeEdu 官网](https://meedu.vip)
- [MeEdu 开源程序](https://github.com/Qsnh/meedu)
- [MeEdu 付费解决方案](https://meedu.vip/price.html)
- [MeEdu 付费版本演示站](https://meedu.vip/cases.html)
- [MeEdu 功能概览](https://www.yuque.com/meedu/fvvkbf/gpx5ed)
- [MeEdu 使用手册](https://www.yuque.com/meedu/fvvkbf)
- [MeEdu API文档](https://meedu-v2-xiaoteng.doc.coding.io/)

### 使用限制

[使用限制条款](https://www.yuque.com/meedu/fvvkbf/amfw7z)

### 快速上手

```
cp .env.example .env
```

修改 `.env` 文件中的 `VUE_APP_URL` 的值为您的meedu网站访问地址（后面不需要加斜线）。修改保存后执行下面命令编译：

```
yarn
yarn build
```

编译成功之后生成了 `/dist` 目录，将该目录复制到 meedu 的 `public` 目录下面，并重命名为 `admin` 或者其它的名字。


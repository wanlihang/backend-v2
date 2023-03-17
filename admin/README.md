
# iLab 后台项目

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


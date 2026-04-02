# 部署发布

EPX-Frame 支持两种部署方式：以插件形式注册到易普云平台，或独立打包单独部署运行。

## 以插件形式注册

将项目打包成插件，注册到易普云平台中。这种方式适合将功能模块集成到平台统一管理。

### 打包命令

```bash
npm run build:lib
```

打包完成后，会在项目根目录下生成 `lib` 文件夹，包含插件的所有资源文件。

### 注册流程

1. 执行打包命令生成 `lib` 文件夹
2. 将 `lib` 文件夹上传到易普云平台
3. 在平台管理后台进行插件注册和配置
4. 注册成功后，平台会自动加载插件

::: tip 提示
以插件形式注册后，插件可以共享平台的基础设施（路由、权限、主题等），无需重复配置。
:::

## 独立打包

将项目独立打包，单独部署运行。这种方式适合需要独立运行或独立维护的场景。

### 打包命令

```bash
npm run build
```

打包完成后，会在项目根目录下生成 `dist` 文件夹，包含所有静态资源文件。

### 部署方式

将 `dist` 文件夹部署到 Web 服务器即可：

```bash
# 使用 Nginx 部署
cp -r dist/* /usr/share/nginx/html/

# 或使用任何静态文件服务器
npx serve dist
```

### Nginx 配置示例

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # 静态资源缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

## 子页面目录

独立打包时，项目支持子页面目录的配置。通过配置子页面目录，可以将应用部署在域名的子路径下：

```
https://your-domain.com/app/
```

::: warning 注意
使用子页面目录部署时，需要确保路由配置中的 `base` 路径与实际部署路径一致，否则会导致页面刷新后出现 404 错误。
:::

## 两种方式对比

| 特性 | 插件注册 | 独立打包 |
|------|----------|----------|
| 部署方式 | 注册到平台 | 独立部署 |
| 路由管理 | 平台统一管理 | 自行管理 |
| 权限控制 | 平台统一控制 | 自行实现 |
| 主题样式 | 跟随平台主题 | 独立配置 |
| 适用场景 | 集成到平台 | 独立运行 |
| 维护成本 | 低 | 中 |

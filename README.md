# akbar-blog-front
vue3,element-plus个人博客项目前端。



## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Compile and Minify for Production

```sh
pnpm build
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```

# 颜色
项目中用到的颜色都是从tailwindcss中获取的，具体颜色可以参考tailwindcss的文档。
## 主要颜色

- `--my-prymary-color: #409eff;`(element-plus：--el-color-primary)
- `--my-success-color: #22c55e;`（tailwindcss：green-500）
- `--my-danger-color: #ef4444;`（tailwindcss：red-500）
- `--my-warning-color: #f97316;`（tailwindcss：orange-500）
- `--my-menu-text-color: #64748b;`(tailwindcss：zinc-500)
- `--my-overlay-color: rgba(0,0,0,0.5);`(element-plus：--el-overlay-color-lighter)

## 深色模式
- `--my-base-dark-bg-color: #09090b;`(tailwindcss：zinc-950)
- `--my-secodary-dark-bg-color: #18181b;`(tailwindcss：zinc-900)
- `--my-message-dark-bg-color: #1f1f1f;`
- `--my-base-dark-border-color: #3f3f46;`(tailwindcss：zinc-700)
- `--my-message-dark-border-color: #ebeef5;`
- `--my-base-dark-text-color: #27272a;`(tailwindcss：zinc-800)
- `--my-base-dark-text-color: white;`

## 阴影
- `--my-base-box-shadow: 0 3px 4px #0000001a,
  0 24px 36px #0000000a;`(页面中主要用到的阴影样式)
- `--my-inset-box-shadow: inset 0 3px 4px #0000001a;`

## 边框
- `--my-message-border: 1px solid var(--my-message-dark-border-color)`

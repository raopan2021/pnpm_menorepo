# pnpm monorepo 项目配置

## 基本配置

1.初始化 monorepo:

```bash
mkdir my-monorepo && cd my-monorepo
pnpm init
```

2.启用工作区:
在根目录创建 pnpm-workspace.yaml 文件:

```yaml
packages:

- 'packages/*'
- 'apps/*'
- 'libs/*'
```

## 依赖管理策略

1. 共享依赖
将依赖安装到根目录 (所有子项目共享):

```bash
pnpm add -w <package-name>
```

​ 作为开发依赖安装到根目录:

```bash
pnpm add -wD <package-name>
```

2. 项目特定依赖
  为特定项目安装依赖:

  ```bash
  pnpm --filter <project-name> add <package-name>
  ```

  例如:

```bash
pnpm --filter root/web-app add react
```

3. 内部包依赖
引用工作区内的其他包:

```bash
pnpm --filter root/web-app add root/shared-lib@workspace:*
```

这会在 package.json 中创建类似这样的引用:

```json
{
  "dependencies": {
    "root/shared-lib": "workspace:*"
  }
}
```

## 常用命令

1.安装所有依赖:

```bash
pnpm install
```

在所有项目中运行脚本:

```bash
pnpm -r run <script-name>
```

在特定项目中运行脚本:

```bash
pnpm --filter <project-name> run <script-name>
```

列出所有工作区包:

```bash
pnpm ls -r
```

## 高级技巧

依赖提升控制:
在 .npmrc 中配置:

```bash
shamefully-hoist=true  # 提升所有依赖
hoist-pattern[]=*eslint*  # 只提升特定模式的依赖
```

选择性安装:

```bash
pnpm install --filter <project-name>...
```

并行任务执行:

```bash
pnpm -r --parallel run build
```

依赖检查:

```bash
pnpm dlx depcheck  # 检查未使用的依赖
```

## 最佳实践

- 尽量将通用依赖提升到根目录 - 减少重复安装
- 使用工作区协议 (workspace:*) - 确保始终使用最新的本地包版本
- 限制 peer 依赖版本 - 避免版本冲突
- 定期运行 pnpm update - 保持依赖最新
- 使用 changesets 或类似工具 - 管理包版本和变更日志

# 团队代码风格统一

通过 ESLint + Prettier + Stylelint 实现代码风格规范、格式化，通过 EditorConfig 实现 IDE 编码风格规范化

## 前言

此篇文章主要讲解如何来搭建一套代码规范体系，主要内容为：通过 ESLint + Prettier + Stylelint 实现代码风格规范、格式化，通过 EditorConfig 实现 IDE 编码风格规范化

本文约 7k 字，主要内容分为 7 个大章节，内分多个小章节。请耐心读完，相信你应该有所收获

本文也是[《通俗易懂的中后台系统建设指南》](https://github.com/QFifteen/Blog?tab=readme-ov-file#%E9%80%9A%E4%BF%97%E6%98%93%E6%87%82%E7%9A%84%E4%B8%AD%E5%90%8E%E5%8F%B0%E7%B3%BB%E7%BB%9F%E5%BB%BA%E8%AE%BE%E6%8C%87%E5%8D%97%E4%B8%93%E6%A0%8F)系列的第四篇文章，该系列旨在告诉你如何来构建一个优秀的中后台管理系统

## 写在前面

注意，在文章开始之前，你应该拉起一个 Vue 或者 React 项目，如果没有，你可以参考[收下这份 Vue + TS + Vite 中后台系统搭建指南，从此不再害怕建项目](https://github.com/QFifteen/Blog/issues/1)

本文环境中默认你已拉起 Vue3 + TS + Vite 项目，如果你是 React 项目，在不涉及框架方面的内容，你可以适当参考

在下面的篇章中，我们分为两个层面来构建规范体系：

* 代码层面(ESLint + Prettier + Stylelint)
* IDE 层面(EditorConfig)

下面我们先来介绍一下 ESLint

## 什么是 ESLint？

应用官网的话来说：

ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code, with the goal of making code more consistent and avoiding bugs.
ESLint 是一个用于识别和报告在 ECMAScript/JavaScript 代码中发现的模式的工具，其目标是使代码更加一致并避免错误。

大白话来说，ESLint 是一个 JavaScript 代码检查工具，帮助我们来确保代码风格一致，这对于团队协作来说是大有益处，也用来发现一些潜在错误或不规范的代码。ESLint 的规则是可配置的，因此可以根据团队偏好、项目需求来定义自己的 ESLint 规则

在下面的内容中，我们一致使用最新的大版本 ESLint v9

在 ESLint v9 中，一些比较大的变化是：

* 对 NodeJS 版本的要求，不再支持 v18.18.0 和 v19 版本
* 新的默认配置格式：`eslint.config.js` 和扁平化配置
* 删除了大部分的格式化程序，更专注于代码质量
* ...

新版本的 ESLint 变化较大，你应该先看看这份[迁移指南](https://eslint.nodejs.cn/docs/latest/use/migrate-to-9.0.0)

截止本文发布日，ESLint 的最新版本是 `v9.16.0`

### 安装 ESLint

注意，因为我们使用的是 ESLint v9 版本，请确保你的 NodeJS 版本至少大于 18.18.0
通过 `node -v` 来查看你的 `node` 版本，且推荐使用 `nvm` 来管理你的 node 版本

运行命令：

pnpm create @eslint/config@latest
运行后，eslint 会向你询问一些配置项：

以下打勾的选项表示本文选择的配置项（本文项目环境默认为 Vue3 + TS）
如果你的项目环境有差异，可自行选择配置项

**How would you like to use ESLint?（您希望如何使用 ESLint）**

1. To check syntax only（只检查语法）
2. To check syntax and find problems（检查语法并发现问题）√

**What type of modules does your project use?（你的项目使用什么类型的模块？）**

1. JavaScript modules (import/export) （JavaScript模块（导入/导出）√
2. CommonJS (require/exports) （CommonJS(需要/出口) ）
3. None of these （这些都不是）

**Which framework does your project use?（您的项目使用哪个框架？）**

1. React
2. Vue.js √
3. None of these （这些都不是）

**Does your project use TypeScript?（你的项目使用TypeScript吗？）**

1. No
2. Yes √

**Where does your code run?（你的代码在哪里运行？）**

1. Browser (浏览器) √
2. Node

**Would you like to install them now?（您现在要安装它们吗？）**

1. No
2. Yes √

**Which package manager do you want to use？（您想使用哪个包管理器）**

1. npm
2. yarn
3. pnpm √
4. bun

整体的配置如下： <img alt="Pasted image 20241125175227" width="593" src="https://private-user-images.githubusercontent.com/66454152/392203654-dde0f944-53e5-4bfe-bdeb-072f968ec6c0.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDc1MDE4MDksIm5iZiI6MTc0NzUwMTUwOSwicGF0aCI6Ii82NjQ1NDE1Mi8zOTIyMDM2NTQtZGRlMGY5NDQtNTNlNS00YmZlLWJkZWItMDcyZjk2OGVjNmMwLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTA1MTclMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwNTE3VDE3MDUwOVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWJkZDliNWEyMDk2NWRiNWIyNjU4YTAzMTFiMGVkNGY3ZDE4YWJmNjhkNjk0NGNhZmJhNWVkNTNiMDhjY2IwYTEmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.0acO52ooDKmV9BLv_XPItyVAq9F_EMUjM2VGJYwljz8">

如你所见，命令行配置选择完成后，会安装一些依赖到 `devDependencies`，打开 `package.json` 文件，找到它们：

{
"devDependencies": {
"@eslint/js": "^9.15.0",
"@vitejs/plugin-vue": "^5.1.4",
"eslint": "^9.15.0",
"eslint-plugin-vue": "^9.31.0",
"globals": "^15.12.0",
"typescript-eslint": "^8.15.0",
}
}
下面简单介绍一下这几个包：

* `@eslint/js`：ESLint 的核心包，用于支持 JavaScript 的代码分析功能，适用于基于 JavaScript 的代码检查
* `@vitejs/plugin-vue`：Vite 的官方 Vue 插件，专为 Vue 3 项目设计
* `eslint`：ESLint 包
* `eslint-plugin-vue`：专为 Vue 项目设计的 ESLint 插件，提供了对 Vue 特有语法（如模板、指令等）的代码检查和规则支持
* `globals`：JavaScript 全局变量的库，提供常见的全局变量，通常用于 ESLint 配置中定义哪些全局变量是允许的
* `typescript-eslint`：TypeScript 的 ESLint 插件，允许 ESLint 对 TypeScript 代码进行静态分析和代码检查

然后，在项目根目录下，你会发现生成了一个 `eslint.config.js` 文件，它是新的默认配置格式，参阅 [新的默认配置格式 (`eslint.config.js`)](https://eslint.nodejs.cn/docs/latest/use/migrate-to-9.0.0#-%E6%96%B0%E7%9A%84%E9%BB%98%E8%AE%A4%E9%85%8D%E7%BD%AE%E6%A0%BC%E5%BC%8F-eslintconfigjs)

打开这个文件，你的 ESLint 默认配置内容应该是这样的，它默认导出一个数组：

import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";

/**@type {import('eslint').Linter.Config[]} */
export default [
{files: ["**/*.{js,mjs,cjs,ts,vue}"]},
{languageOptions: { globals: globals.browser }},
pluginJs.configs.recommended,
...tseslint.configs.recommended,
...pluginVue.configs["flat/essential"],
{files: ["**/*.vue"], languageOptions: {parserOptions: {parser: tseslint.parser}}},
];
你可以在这里获取配置文件的详细信息：[Configuration Objects 配置对象](https://eslint.org/docs/latest/use/configure/configuration-files#configuration-objects)

注意，请确保在 `package.json` 中配置了`type`，指定 ES Module 方式导出

//package.json
{
"type": "module"
}

### VS Code 中集成 ESLint

VS Code 中集成 ESLint 插件，可以帮助你找出代码中不符合 ESLint 规则的地方，通过不同颜色下划线该告诉你错误信息、警告信息等，这很有用

注意，ESLint 扩展会自动查找 ESLint 全局安装版本，在项目根目录下找到你的配置文件(`eslint.config.js`)

在 VS Code 扩展中搜索 ESLint 插件并安装： <img alt="Pasted image 20241204085545" width="1031" src="https://private-user-images.githubusercontent.com/66454152/392203918-0d5f9445-1c7a-4d60-9539-b813014575ef.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDc1MDE4MDksIm5iZiI6MTc0NzUwMTUwOSwicGF0aCI6Ii82NjQ1NDE1Mi8zOTIyMDM5MTgtMGQ1Zjk0NDUtMWM3YS00ZDYwLTk1MzktYjgxMzAxNDU3NWVmLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTA1MTclMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwNTE3VDE3MDUwOVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTYxMGQ2ZmRiYjkzYTk0OTMxZDYwM2E5NmMxYWFkYTVhYmQzZGU4ODg3NzQ2MTAwNjI3YTMwMWQxYjk0OTM2MzcmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.P2cdsIFtP4rYLvwb5qdaQai82bvziQpxqkPCedqsX4Q">

### ESLint 配置

在配置之前，最好先了解一下 ESLint v9 中很重要的变化，Flat Config 即扁平化配置，强烈建议阅读由 ESLint 创始人**Nicholas C. Zakas**发布的此篇文章：[扁平化配置简介](https://eslint.org/blog/2022/08/new-config-system-part-2/)

然后，这里推荐三种配置 ESLint 的方案

* **快速使用**：如果你不想太过折腾配置 ESLint，那么我会推荐直接使用 `antfu` 的 [eslint-config](https://github.com/antfu/eslint-config?tab=readme-ov-file) ，它提供开箱即用的功能，并且支持自定义覆盖，是一个快速可靠的选择
* **动手学习**：如果你有很强的好奇心或者动手能力，想一探究竟，那么我推荐你可以参考 [eslint-config](https://github.com/antfu/eslint-config?tab=readme-ov-file) 的源码来配置自己的 ESLint 文件，这能让你学到更多
* **进阶方式**：最后一种进阶的方式，即创建修改并发布自己的 eslint-config，这种做法是强大又快捷，并且即插即用，事实上， 一些优秀的开源 Admin 也是如此做的

下面我们会介绍一些配置项属性的基本使用：

#### 使用  ignores  全局忽略文件

在 ESLint v9 之前，我们通过创建 `.eslintignore` 来忽略文件，在扁平化配置下，我们需要在 `eslint.config.js` 中配置 `ignores` 字段，它是一个字符串数组。可以实现局部忽略，也可以是全局，这取决于是否有 `files` 字段，参阅 [Ignoring Directories](https://eslint.org/docs/latest/use/configure/ignore#ignoring-directories)

例如：

//eslint.config.js
import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";

/**@type {import('eslint').Linter.Config[]} */
export default [
//...
{
ignores: [
"**/node_modules",
"**/public",
"**/assets",
"**/dist",
"**/package-lock.json",
"**/yarn.lock",
"**/pnpm-lock.yaml",
"**/.history",
"**/CHANGELOG*.md",
"**/*.min.*",
"**/LICENSE*",
"**/**snapshots**",
"**/auto-import?(s).d.ts",
"**/components.d.ts",
],
},
];

#### 使用 rules 配置规则

规则是 ESLint 的核心构建块。`@eslint/js` 包已经配置了大量规则`pluginJs.configs.recommended`，当然，你也可以在 `rules` 中覆盖这些规则来完成你的需要

以下是一个示例，我们配置一些规则，到 `main.ts` 中来实验是否生效

export default [
//...其他配置
{
files: ["src/main.ts"], //确定配置对象应用于哪些文件
ignores: ["node_modules"], //确定应该忽略哪些文件
rules: {
"no-alert": "error", //禁止使用 alert、confirm 和 prompt
"no-empty-function": "error", //禁止空函数
"no-var": "error", //禁止使用var
},
},
];
查看文件 `main.ts`

<img alt="Pasted image 20241126231034" width="561" src="https://private-user-images.githubusercontent.com/66454152/392204284-86cc841a-d4db-4fa2-a63c-d6f08da8b795.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDc1MDE4MDksIm5iZiI6MTc0NzUwMTUwOSwicGF0aCI6Ii82NjQ1NDE1Mi8zOTIyMDQyODQtODZjYzg0MWEtZDRkYi00ZmEyLWE2M2MtZDZmMDhkYThiNzk1LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTA1MTclMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwNTE3VDE3MDUwOVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWMwOWRhNzg3MTlmZWIzOGUzNDNjZDFhOWE4ZTM1YTBhZWE5NGRlOGY3NjU5MTcxNjNjMWE0NjM4MmUxMmQzMTgmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.V2q-NSBdwzaebiba745V5LyDaU91UKcA__c2EUOGyzQ">
请确保你已经安装了 ESLint 扩展，否则代码将不会出现红色下划线和报错信息

另外，我们可以使用命令来在终端输出全部错误：

npx eslint src/main.ts
<img alt="Pasted image 20241126231119" width="557" src="https://private-user-images.githubusercontent.com/66454152/392204581-5315a91e-7e5f-46d2-8b71-43603e5f369c.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDc1MDE4MDksIm5iZiI6MTc0NzUwMTUwOSwicGF0aCI6Ii82NjQ1NDE1Mi8zOTIyMDQ1ODEtNTMxNWE5MWUtN2U1Zi00NmQyLThiNzEtNDM2MDNlNWYzNjljLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTA1MTclMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwNTE3VDE3MDUwOVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTE5ZjZkMWJjNWQ4N2VkNGQyMTMyYjJkOTllMzE5MjYxNGMyOTRjNmY3NDkyM2QzMTkxYTcyZmM2MWU4ZmQwZmEmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.tUb-2q-4qbo3EluqR7hcYbtFAeQhI5diC2g-_H9Ofv0">
在命令后面加 `--fix` 将自动修复可以修复的错误

npx eslint src/main.ts  --fix
<img alt="Pasted image 20241126231144" width="594" src="https://private-user-images.githubusercontent.com/66454152/392204812-e74bd9bd-bd03-4322-a77a-e84ad9a3681d.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDc1MDE4MDksIm5iZiI6MTc0NzUwMTUwOSwicGF0aCI6Ii82NjQ1NDE1Mi8zOTIyMDQ4MTItZTc0YmQ5YmQtYmQwMy00MzIyLWE3N2EtZTg0YWQ5YTM2ODFkLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTA1MTclMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwNTE3VDE3MDUwOVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWUwZjkzMjQwN2M1Nzk3NWE4MjhjMzM2NjNlOGY1N2EwYzg3NzlmNTM5NWNiNjgwM2Q5ZTdiNzIzMDU0YmE0NTEmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.xu8IkgmAUG-mSt7I2oeGQ92MA76iPf2hkWuD4BjoGRY">
在上述截图中，修复操作把 `var` 转化为了 `let`，但下面的 `alert` 仍然报错，并非所有问题都能通过修复解决，比如第十二行的 `alert` 需要手动删除

这里有一些 ESLint 规则，你应该要知道：[ESLint 规则](https://eslint.nodejs.cn/docs/latest/rules/)

#### 使用 plugins 添加插件

ESLint 插件是一个 npm 模块，可以包含一组 ESLint 规则、配置、处理器和环境，

要在配置文件中配置插件，请使用  `plugins`

比如，Vue.js 的官方 ESLint 插件 [eslint-plugin-vue](https://github.com/vuejs/eslint-plugin-vue)

import pluginVue from 'eslint-plugin-vue';

export default [
{
files: ['**/*.vue'],
plugins: {
vue: pluginVue,
},
},
];

#### languageOptions 配置语言选项

ESLint 允许配置特定于项目中使用的 JavaScript 的语言选项，例如自定义全局变量 还可以使用插件来扩展 ESLint 以支持项目的语言选项

languageOptions 是一个对象，它拥有一些配置属性：

* `ecmaVersion`：默认值为 `latest`，指示正在检查的代码的 ECMAScript 版本，确定语法和可用的全局变量
* `sourceType`：默认值为 `module`，指示正在使用的 JavaScript 文件的模式。可能的值为 `module`，`commonjs`，`script`
* `parserOptions`：解析器选项
* `Globals`：指定全局变量

详细了解它们，请参阅 [Configure Language Options](https://eslint.org/docs/latest/use/configure/language-options)

老实说，这里列举太多的配置项意义不大，像是流水线一样。你可以在 ESLInt 的官网文档中找到更详细且全面的介绍，参阅 [配置 ESLInt](https://eslint.org/docs/latest/use/configure/)

#### 示例

这里，我们会实现一个针对 Vue 文件的 ESLInt 配置示例

此配置参考于 `antfu` 的 [eslint-config](https://github.com/antfu/eslint-config?tab=readme-ov-file)

首先，需要安装两个依赖：

**eslint-plugin-vue 插件**

Vue.js 的官方 ESLint 插件 - [GitHub](https://github.com/vuejs/eslint-plugin-vue)。如果你是使用上述的命令脚本 `@eslint/config` 安装，并且在引导程序选择框架(Which framework does your project use)时选择了Vue，那么这个插件应该是默认已安装在你的项目中，如果没有，请使用命令：

pnpm add eslint-plugin-vue --save-dev
**vue-eslint-parser 插件** 用于 `.vue` 文件的 ESLint 自定义解析器 - [GitHub](https://github.com/vuejs/vue-eslint-parser)，请使用命令：

pnpm add vue-eslint-parser --save-dev
然后，在 `eslint.config.js` 中配置（默认你使用了 TypeScript）

import globals from "globals";
import pluginJs from "@eslint/js";
import tsEslint from 'typescript-eslint';
import pluginVue from "eslint-plugin-vue";
import parserVue from 'vue-eslint-parser';

/** @type {import('eslint').Linter.Config[]} */
export default [
//...
{
files: ['**/*.vue'],
languageOptions: {
parser: parserVue,
parserOptions: {
ecmaFeatures: {
jsx: true,
},
extraFileExtensions: ['.vue'],
parser: tsEslint.parser,
sourceType: 'module',
},
},
plugins: {
vue: pluginVue,
},
processor: pluginVue.processors['.vue'],
rules: {
...pluginVue.configs.base.rules,
...pluginVue.configs['vue3-essential'].rules,
...pluginVue.configs['vue3-strongly-recommended'].rules,
...pluginVue.configs['vue3-recommended'].rules,
//...更多配置规则
},
},
]

### VS Code 中配置 ESLint 插件

还记得[上述篇章](# VS Code 中集成 ESLint)中，我们在 VS Code 中集成了 ESLint 扩展吗，我们可以在 `setting.json` 中定义它的配置

在 `.vscode/settings.json` (没有此文件就创建)文件写入以下配置：

{
"eslint.useFlatConfig": true, //vscode-eslint >= v8.57.0，确保扁平化配置开启
"editor.codeActionsOnSave": {
"source.fixAll.eslint": "explicit" // eslint自动修复
},
// 为列表中指定的文件类型启用 ESLint 验证
"eslint.validate": [
"javascript",
"javascriptreact",
"typescript",
"typescriptreact",
"vue",
"html",
"markdown",
"json",
"json5",
"jsonc",
"yaml",
"toml",
"xml"
],
}

* `eslint.useFlatConfig`：ESLInt扩展 8.57.0 及更高版本支持的设置
* `eslint.validate`：强制执行验证设置，仅验证该列表中的文件
* `"source.fixAll.eslint": "explicit"`：保存自动修复错误

### ESLint 脚本命令配置

ESLint CLI 允许从终端来执行 linting，且提供了多个选项来配置 ESLint 比如上面提到的 `npx eslint src/main.ts --fix

在实际项目中，我们会将命令写在 `package.json` 的 scripts 里 比如这样：

{
"scripts": {
"lint:eslint": "eslint --fix  --cache --max-warnings 0  \"src/**/*.{vue,ts,tsx}\"  --cache-location 'node_modules/.cache/eslint/'",
}
解释一下其中的配置：

* `--max-warnings`： 此选项允许您指定警告阈值，如果项目中存在过多的警告级别规则冲突，则该阈值可用于强制 ESLint 退出并显示错误状态
* `--fix`： 指示 ESLint 尝试修复尽可能多的问题
* `--cache`： 存储有关已处理文件的信息，以便仅对更改的文件进行操作。确保仅对更改的文件进行 linted 处理，从而显著提高 ESLint 的运行时性能
* `--cache-location`： 缓存位置的文件或目录的路径，因为缓存会生成一个 `.eslintcache` 文件，不配置将在根目录下生成，我们这里统一处理放在 `node_modules/.cache`

然后，我们就可以在终端来检查你的代码：

pnpm lint:eslint
<img alt="Pasted image 20241127143018" width="895" src="https://private-user-images.githubusercontent.com/66454152/392205045-38bf7c98-1c70-4f81-a1d8-c95a6b7dc6dd.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDc1MDE4MDksIm5iZiI6MTc0NzUwMTUwOSwicGF0aCI6Ii82NjQ1NDE1Mi8zOTIyMDUwNDUtMzhiZjdjOTgtMWM3MC00ZjgxLWExZDgtYzk1YTZiN2RjNmRkLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTA1MTclMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwNTE3VDE3MDUwOVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWEzODBiNTE0ZWJlNzU2ZWE4N2FkMzA0MjhlNzk1YTI2YWYxZjI3MjhmM2JkZmE5NjY1MzRjNDg5ZjFhZTYzMjAmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.BFil8CAoz7wZkItKgM98r95977-c7iNStIu2bj5myos">

### 实战案例

本系列专栏也提供了一个实战项目 [`vue-clean-admin`](https://github.com/QFifteen/vue-clean-admin) ，上述的 ESLint 配置都能在 [`eslint.config.js`](https://github.com/QFifteen/vue-clean-admin/blob/main/eslint.config.js) 中找到

### 在 Vite 中集成 ESLint 插件

这里推荐一个 Vite 中关于 ESLint 的插件：[vite-plugin-eslint](https://github.com/gxmari007/vite-plugin-eslint) 它可以在 Vite 程序中检查 ESLint 的错误，并将其错误或警告输出在终端和页面上

使用命令

pnpm add vite-plugin-eslint --save-dev
在 `vite.config.ts` 中配置：

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import eslint from "vite-plugin-eslint";

// <https://vitejs.dev/config/>
export default defineConfig({
plugins: [vue(), eslint()],
});
比如在应用程序页面中：

<img alt="Pasted image 20240713214221" width="1193" src="https://private-user-images.githubusercontent.com/66454152/392205345-e5719d36-4f89-4d0a-960c-3317e6e01cde.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDc1MDE4MDksIm5iZiI6MTc0NzUwMTUwOSwicGF0aCI6Ii82NjQ1NDE1Mi8zOTIyMDUzNDUtZTU3MTlkMzYtNGY4OS00ZDBhLTk2MGMtMzMxN2U2ZTAxY2RlLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTA1MTclMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwNTE3VDE3MDUwOVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWJlNzc5YWU0Y2NkNWY1NWFlMGQwMGM4MTRjYmZmYzgwNDU0ZjYwN2RkZjg0ZjczMWZiZDQ2ZTY5ZDAwY2Y1ZWImWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.srQb9_IiqhTPdYiFetJM3Tpfh2z9P-kNj83H2CxgVOk">
终端输出： <img alt="Pasted image 20240713214333" width="418" src="https://private-user-images.githubusercontent.com/66454152/392205517-61d386fa-dba2-4cb6-9f4f-175e6217db30.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDc1MDE4MDksIm5iZiI6MTc0NzUwMTUwOSwicGF0aCI6Ii82NjQ1NDE1Mi8zOTIyMDU1MTctNjFkMzg2ZmEtZGJhMi00Y2I2LTlmNGYtMTc1ZTYyMTdkYjMwLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTA1MTclMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwNTE3VDE3MDUwOVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTlkM2Y1ZWY5MzQ3NDI0NDkxMTE0M2Y4MTk2MjFlN2I1ZDkxZDk2ZjhkNzZlNGI4NTNkYWU4MTllMmEyYjU4ZGMmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.145GWvUmLmKsyYz47O1fMEZGetwt0xyYRa7fAoT74AY">

### FAQ

如果你的 VS Code 已集成 ESLint 插件，但代码未有错误提示，请在 VS Code 终端的输出页查看插件信息及是否报错，右侧下拉框记得选择 `ESLint`

<img alt="Pasted image 20240825222553" width="1044" src="https://private-user-images.githubusercontent.com/66454152/392205658-14afec2a-0010-4205-bb1f-39ba2ce1cb45.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDc1MDE4MDksIm5iZiI6MTc0NzUwMTUwOSwicGF0aCI6Ii82NjQ1NDE1Mi8zOTIyMDU2NTgtMTRhZmVjMmEtMDAxMC00MjA1LWJiMWYtMzliYTJjZTFjYjQ1LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTA1MTclMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwNTE3VDE3MDUwOVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTcwZDcwN2Q4NzkxYjVhZmM1OWY3ZWQzMzRiYWJmNTIzMGRhOTA4YzZiNTIwMTViMzU5MzkxYzBjNDM3OGVlZjkmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.CDuGhoqc-3TyHamTqMnDQIj0GQ056lIowpEZZZBZmQo">
### 关于 ESLInt 更多信息
你可以在 [awesome-eslint](https://github.com/dustinspecker/awesome-eslint)存储库中找到 ESLint 的其他流行集成的精选列表。

## 什么是 Prettier？

[Prettier](https://prettier.io/) 是一个代码格式化工具，主要用于自动化代码的风格统一和格式化，专注于确保代码的可读性和一致性

在官网的介绍是：一个固执己见的代码格式化程序

### 安装 Prettier

pnpm add --save-dev --save-exact prettier

### 配置 Prettier

在根目录下新增两个文件：

* `.prettierignore` 忽略文件，表示哪些文件忽略格式化，[官网说明](https://prettier.io/docs/en/ignore)
* `.prettierrc.js` Prettier 配置文件(ES Modules)

#### `.prettierignore` 忽略文件

要忽略什么文件，这取决于你的项目，比如：

```
dist
public/*
src/assets/*
```

#### `.prettierrc.js` 配置文件

配置文件写入你的格式化配置，在[这里](https://prettier.io/docs/en/options)查看 Prettier 可配置项

比如：

/** @type {import('prettier').Config} */
const config = {
printWidth: 100, // 每行最大字符数
tabWidth: 2, // 缩进空格数
semi: true, // 尾部添加分号
singleQuote: true, // 是否使用单引号而不是双引号
bracketSpacing: true, // 在对象字面量的括号内添加空格
arrowParens: 'always', // 总是为箭头函数的参数添加圆括号
proseWrap: 'preserve', // 不改变 Markdown 文本的换行
bracketSameLine: false,
};

export default config;

### VS Code 中集成 Prettier

在 VS Code 扩展中搜索 Prettier 并进行安装 <img alt="Pasted image 20241204085658" width="1130" src="https://private-user-images.githubusercontent.com/66454152/392205788-b161fff8-a4c2-4de7-bf95-be19fc23130e.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDc1MDE4MDksIm5iZiI6MTc0NzUwMTUwOSwicGF0aCI6Ii82NjQ1NDE1Mi8zOTIyMDU3ODgtYjE2MWZmZjgtYTRjMi00ZGU3LWJmOTUtYmUxOWZjMjMxMzBlLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTA1MTclMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwNTE3VDE3MDUwOVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWNlOTQwNWM2NTU2NTQ2NTVmODQxYTVmZjg4ZGEyMDk1MzQ3ODllNTkxNTdlZGQzOWUzZThiYjg4Y2I3ZWU1MzgmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.h5un_YSWRVDo49BDTufuMSfYwbAHgswPcUZW3l5WZH4">

Prettier 扩展会自动查找项目根目录下的配置文件、忽略文件，下面我们针对扩展进一步配置，

将**保存时格式化代码**、且**指定 Prettier 插件来格式化代码**写进 `settings.json` 中

{
"editor.formatOnSave": true, //保存时自动格式化
"editor.defaultFormatter": "esbenp.prettier-vscode"
}
文本 `esbenp.prettier-vscode` 是 VS Code 中 Prettier 插件的标识符

### Prettier 脚本命令配置

在你的 `package.json` 的 scripts 下新增脚本

{
"scripts": {
"lint:format": "prettier  --write --cache \"src/**/*.{js,ts,json,tsx,css,less,scss,vue,html,md}\"",
}

* `--write`：这将就地重写所有已处理的文件。这与  `eslint --fix`  工作流程相当。您也可以使用  `-w`  别名。
* `--cache`： 存储有关已处理文件的信息，以便仅对更改的文件进行操作

然后就可以在终端来格式化你的代码：

pnpm lint:format

## ESLint 和 Prettier 配合使用

在 ESLint v9.0.0 前的格式化程序和 Prettier 起冲突，这是一个常常发生的事情

这里介绍两个依赖：

* `eslint-config-prettier`：关闭所有不必要或可能与 Prettier 冲突的规则 - [GitHub](https://github.com/prettier/eslint-config-prettier)
* `eslint-plugin-prettier`：将 Prettier 作为规则插入到 ESLint 里 - [GitHub](https://github.com/prettier/eslint-plugin-prettier)

### eslint-config-prettier 依赖

`eslint-config-prettier` 用于关闭所有不必要或可能与 Prettier 冲突的规则

在 ESLint v9 已经移除了多个内置的格式化规则，使其更专注于代码质量检查而非格式，参阅 [ESLint v9 迁移指南](https://eslint.org/docs/latest/use/migrate-to-9.0.0#-removed-multiple-formatters)，这意味着 `eslint-config-prettier` 的用武之地有所减少

不过，一些广泛使用的 ESLint 插件可能仍然包含格式化相关的规则，比如 `eslint-plugin-vue` 的规则 ：

    rules: {
      "vue/max-attributes-per-line": "off",
      "vue/singleline-html-element-content-newline": "off", 
      "vue/multiline-html-element-content-newline": "off",
    },
对于这种情况，有两种方案：

1. 手动关闭冲突的规则
2. 使用插件 `eslint-config-prettier`

手动关闭具有精准性，为未来调整保留了灵活性，而 `eslint-config-prettier` 则是具有便捷性

选择哪种方式取决于你的项目需求和个人偏好。这里选择手动关闭规则，保持精准控制和灵活性。如果你需要使用 `eslint-config-prettier` ，请看相关 [README](https://github.com/prettier/eslint-config-prettier?tab=readme-ov-file#eslint-config-prettier)

### eslint-plugin-prettier 依赖

将 Prettier 作为规则插入到 ESLint 里，安装 `eslint-plugin-prettier`

pnpm add --save-dev eslint-plugin-prettier
在 `eslint.config.js` 中引入

//...其他依赖
import pluginPrettier from "eslint-plugin-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
//...
{
plugins: {
prettier: pluginPrettier,
},
rules: {
"prettier/prettier": "error",
},
},
];

### 争议的 Prettier

**Prettier is an opinionated code formatter** Prettier 是一个固执己见的代码格式化程序

推荐阅读 antfu 的 [Why I don't use Prettier](https://antfu.me/posts/why-not-prettier)

讨论：[eslint/eslint.org#435](https://github.com/eslint/eslint.org/issues/435)

其他：[ESLint Stylistic](https://eslint.style/)、[ESLint团队终于妥协了](https://juejin.cn/post/7295805817055166502)

## 什么是 Stylelint？

一个强大的 CSS 检测工具，可帮助您避免错误并执行约定，[官网](https://stylelint.io/)

### 安装 Stylelint

pnpm add stylelint --save-dev

### VS Code 中集成 Stylelint

在 VS Code 扩展模块搜索 Stylelint 进行安装，或者点击此链接：[stylelint 插件](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint) <img alt="Pasted image 20241204093912" width="1093" src="https://private-user-images.githubusercontent.com/66454152/392205927-c7f57067-2c0e-4ffd-aa0f-1eadd261db32.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDc1MDE4MDksIm5iZiI6MTc0NzUwMTUwOSwicGF0aCI6Ii82NjQ1NDE1Mi8zOTIyMDU5MjctYzdmNTcwNjctMmMwZS00ZmZkLWFhMGYtMWVhZGQyNjFkYjMyLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTA1MTclMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwNTE3VDE3MDUwOVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWU4YTBiMzcyMDE0ZjkyM2I0OGU1ZDJmMDE3OTkwZTEyZWI1ZTk2N2Q0MDVmZTI5YWI0ZjYzMzMyNGI4NDVkZDgmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.Lsqtqt9-7pExIqCWMkeHWLN9sOpBNFka5K4agFpvLms">

### VS Code 中配置 Stylelint 插件

在 `settings.json` 文件中写入以下配置：

之前我们已经配置过了 ESLint，这里的 Stylelint 类似

    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": "explicit",
      "source.fixAll.stylelint": "explicit",//配置 stylelint 保存自动修复
    },
    "stylelint.validate": ["css", "less", "scss", "sass", "postcss", "vue"]//插件检查范围

### Stylelint 配置文件

在根目录下新建一个 `stylelint.config.js` 文件，同时确保你的 `package.json` 配置了 `"type": "module"`，表示使用 ESM 模块导出

然后，就像官网的示例一样，在 `stylelint.config.js` 文件写入：

/** @type {import('stylelint').Config} */
export default {
rules: {
"block-no-empty": true, //禁止空块，比如 a{ }
},
};

### `.stylelintignore` 忽略文件

同样的，在根目录下新建一个 `.stylelintignore` 文件，表示忽略特定文件

```
node_modules
dist
public
src/assets/*
```

注意，在 `stylelint.config.js` 文件也有一个 `ignoreFiles` 属性，表示忽略特定文件

/**@type {import('stylelint').Config} */
export default {
ignoreFiles: ["**/*.json", "**/*.js", "**/*.ts", "**/*.jsx", "**/*.tsx"],
};
但这不是忽略大量文件的有效方法。如果想有效地忽略大量文件，请在单独的  `.stylelintignore` 文件内写入

### Stylelint 依赖安装

简单来说，Stylelint 和 ESLint 很类似，都是定义规则、风格来进行代码检查，保证代码风格一致性，并发现一些潜在错误或不规范的代码。不同在于 Stylelint 针对的是 CSS 样式的代码检查

下面介绍一些 Stylelint 相关的依赖：

pnpm add stylelint-config-standard stylelint-config-standard-scss --save-dev

* `stylelint-config-standard`：Stylelint 的 CSS 标准配置 - [GitHub](https://github.com/stylelint/stylelint-config-standard)
* `stylelint-config-standard-scss`：Stylelint 的标准可共享 SCSS 配置。
* Scss：`stylelint-config-recommended-scss`：Stylelint 推荐的可共享 SCSS 配置

pnpm add stylelint-config-recommended-vue stylelint-config-recess-order stylelint-config-html --save-dev

* `stylelint-config-recommended-vue`：扩展 stylelint-config-recommended 配置，并提供推荐的 Vue 相关规则，[GitHub](https://github.com/ota-meshi/stylelint-config-recommended-vue)
* `stylelint-config-recess-order`：对 CSS 属性进行排序 - [GitHub](https://github.com/stormwarning/stylelint-config-recess-order)
* `stylelint-config-html`：此配置捆绑  `postcss-html`  自定义语法并对其进行配置 - [GitHub](https://github.com/ota-meshi/stylelint-config-html)

pnpm add postcss postcss-html postcss-scss --save-dev

# 如果你使用的是Less，把 postcss-scss 替换成 postcss-less

* `postcss`：使用 JavaScript 转换 CSS 的工具，[官网](https://postcss.org/)
* `postcss-html`: 用于解析 HTML（和类 HTML）的 PostCSS 语法，比如 Vue SFC 文件 - [GitHub](https://github.com/ota-meshi/postcss-html)
* Less：`postcss-less`：用于解析 Less 的 PostCSS 语法 - [GitHub](https://github.com/shellscape/postcss-less)
* Scss：`postcss-scss`： 用于解析 Scss 的 PostCSS 语法 - [GitHub](https://github.com/postcss/postcss-scss)

上面的依赖中，除了可选的 Less 和 Scss 外，其余依赖建议全部安装(默认你使用 Vue 框架)，具体使用方法先看简介后面给出的 GitHub 链接

由于此专栏也提供了一个实战项目，你也可以看[这里](https://github.com/QFifteen/vue-clean-admin/blob/main/stylelint.config.js)，上述中的所有配置都写入在内

### 与 Prettier 配合

在 ESLint 部分，我们为配合 Prettier 时介绍了两个包， `eslint-config-prettier` 和 `eslint-plugin-prettier`

而在 Stylelint 中，也有类似的包，分别是

* `stylelint-config-prettier`，用于解决 Stylelint 和 Prettier 之间的规则冲突问题
* `stylelint-prettier`，作为 Stylelint 规则运行 Prettier，并将差异报告为单独的 Stylelint 问题

但是，`stylelint-config-prettier` 包现在已经不维护了，因为从 Stylelint v15 开始，所有与样式相关的格式规则都已被弃用，比如那些强制执行特定代码风格或格式的规则，参阅 [Stylelint 15.0.0 版本](https://stylelint.io/migration-guide/to-15/) 如果您使用的是 v15 或更高版本，并且没有使用这些已弃用的规则，则不再需要此插件

Stylelint 跟随着 ESLint 的脚步，更专注于代码质量而非格式

所以我们这里只安装 `stylelint-prettier` - [GitHub](https://github.com/prettier/stylelint-prettier)

注意，请确保你已经安装了 Stylelint 和 Prettier

pnpm add stylelint-prettier --save-dev
然后在 `stylelint.config.js` 中配置

/** @type {import('stylelint').Config} */

export default {
plugins: ["stylelint-prettier"],
rules: {
"prettier/prettier": true,
},
};

### stylelint.config.js 配置

在上述篇章中，我们安装了很多的依赖，现在我们来配置他们，在这之前先来了解一下 stylelint 文件的 Config，如果你对 ESLint 很熟悉，那么对 Stylelint 配置项也不会陌生

#### extends 扩展现有配置

扩展现有配置（无论是你自己的还是第三方的）。配置可以捆绑插件、自定义语法、选项和配置规则

比如，引入我们之前安装的依赖包：

/**@type {import('stylelint').Config} */
export default {
extends: [
"stylelint-config-standard",
"stylelint-config-recess-order",
"stylelint-config-html",
]
}

#### rules 规则

同 ESLint 一样，rules 属性用来自定义规则，Stylelint 已经内置了一些规则，在[这里](https://stylelint.io/user-guide/rules/)找到它们，比如：

/**@type {import('stylelint').Config} */
export default {
//...
rules: {
"block-no-empty": true,// 禁止空块
'max-nesting-depth': 3,// 限制嵌套层数
}
};

#### overrides 指定应用的文件

使用该  `overrides`  属性，可以指定要应用配置的文件子集，参阅 [overrides](https://stylelint.io/user-guide/configure#overrides)，比如可以针对类型文件进行配置：

{
overrides: [
{
files: ["*.less", "**/*.less"],
customSyntax: "postcss-less",
   extends: ['stylelint-config-standard', 'stylelint-config-recommended-vue']
},
{
files: ["*.scss", "**/*.scss"],
customSyntax: "postcss-scss",
extends: ["stylelint-config-standard-scss", "stylelint-config-recommended-vue/scss"],
},
}

#### 示例

结合上面的基本配置，`stylelint.config.js` 配置可以是这样的：

假设你使用 Vue 框架，并且安装了 Tailwind Css 和 Scss

/**@type {import('stylelint').Config} */
export default {
extends: ["stylelint-config-standard", "stylelint-config-recess-order", "stylelint-config-html"],
plugins: ["stylelint-prettier"],
rules: {
"prettier/prettier": true,
"no-empty-source": null,
"import-notation": null,
"at-rule-no-unknown": [
true,
{
ignoreAtRules: [
"tailwind",
"apply",
"variants",
"responsive",
"screen",
"use",
"mixin",
"include",
"extend",
],
},
],
"selector-pseudo-class-no-unknown": [
true,
{
ignorePseudoClasses: ["global", "deep"],
},
],
},
overrides: [
{
files: ["*.scss", "**/*.scss"],
customSyntax: "postcss-scss",
extends: ["stylelint-config-standard-scss", "stylelint-config-recommended-vue/scss"],
},
{
files: ["*.vue", "**/*.vue", "*.html", "**/*.html"],
customSyntax: "postcss-html",
extends: ["stylelint-config-standard", "stylelint-config-recommended-vue"],
},
],
ignoreFiles: [
"**/*.js",
"**/*.jsx",
"**/*.ts",
"**/*.tsx",
"**/*.json",
"**/*.md",
"**/*.yaml",
"**/*.yml",
"**/*.d.ts",
],
};
我们来测试一下是否生效，比如一个 css 文件有这么一段代码：

.box {
background-color: red;
border: none;

width: 100%;
height: 100%;
}

.title {
}
在 VS Code 中安装了 Stylelint 插件后 ，你可以看到如下报错：

<img alt="Pasted image 20240826170722" width="611" src="https://private-user-images.githubusercontent.com/66454152/392206144-2e5cabca-8527-4247-8f48-d2bfde4bc615.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDc1MDE4MDksIm5iZiI6MTc0NzUwMTUwOSwicGF0aCI6Ii82NjQ1NDE1Mi8zOTIyMDYxNDQtMmU1Y2FiY2EtODUyNy00MjQ3LThmNDgtZDJiZmRlNGJjNjE1LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTA1MTclMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwNTE3VDE3MDUwOVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWExNzU1NmNjMzZhMWM1NDlkNDdmODQ3NTZlY2Q3OTA4NzczZmUwMWVhMzcwMmZhMGIyODNmMmRiMWNhODQ4OTAmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.1uZCVZFDyDoPk-wKGTYuVDFjLgONxi-nHLVNw2Ccy0Q">
这段css代码中会标记三个问题：

* 排序问题，来自于 `stylelint-config-recess-order`
* 意外的空行问题，来自于`stylelint-config-standard`
* 空代码块问题，来自于`stylelint-config-standard`

其中，前两个问题可以通过保存使其自动修复

空代码块问题则需要配置规则

/**@type {import('stylelint').Config} */
export default {
rules: {
"block-no-empty": null,//关闭空代码块规则
},
}
如果没有消除报错，在 VS Code 中，打开命令面板，搜索 Reload ，回车选中来重新加载窗口
Win 使用 `Ctrl + Shift + P` 打开命令面板，Mac 使用 `Command + Shift + P`

### FAQ

**tailwind css 文件报错 Unexpected unknown at-rule "[@tailwind](https://github.com/tailwind)"**

答：在文件 `stylelint.config.js` 中配置规则：

/**@type {import('stylelint').Config} */

export default {
rules: {
"at-rule-no-unknown": [
true,
{
ignoreAtRules: ["tailwind", "apply"],
},
],
},
}
无效果请先重新加载 VS Code 窗口

### stylelint 脚本命令配置

{
"scripts": {
"lint:style": "stylelint --fix --max-warnings 0 --cache \"**/*.{css,scss,sass,vue}\" --cache-location 'node_modules/.cache/stylelint/'"
}

* `--fix`：自动修复规则报告的问题
* `--max-warnings`：设置接受的警告数量限制
* `--cache`：存储已处理文件的结果，以便 Stylelint 仅对更改的文件进行操作
* `--cache-location`：作用同 ESLint，将缓存文件放在 `node_modules/.cache` 下

然后就可以在终端执行命令来调用脚本：

pnpm lint:style

## 什么是 EditorConfig？

EditorConfig helps maintain consistent coding styles for multiple developers working on the same project across various editors and IDEs
EditorConfig 有助于为跨各种编辑器和 IDE 处理同一项目的多个开发人员保持一致的编码风格

简单来说，EditorConfig 帮助我们在不同 IDE 编辑器中维持一致的编码风格和格式化规范，比如缩进，字符编码等，[官网](https://editorconfig.org/)

### .editorconfig 配置

我们在根目录下新建一个 `.editorconfig` 文件,并写入以下配置 下列配置项给出了其配置解释，当然，配置不止这些，你可以在[这里](https://editorconfig.org/#file-format-details)找到更多

```
# 官网：https://editorconfig.org/
root = true # 表示最顶层的 EditorConfig 文件，即停止向上找，直接使用该配置文件

[*] # 匹配所有文件
charset = utf-8 # 控制字符集
indent_style = space # 缩进方式 (tabl | space)
indent_size = 2 # 缩进大小

end_of_line = lf # 设置换行符的类型。可选值为 lf（Unix 风格）、cr（Mac 风格）或 crlf（Windows 风格）。
insert_final_newline = true # 是否在文件末尾插入一个空行，以确保文件总是以换行符结尾
trim_trailing_whitespace = true # 是否保存文件时删除行尾的空白字符
```

### VS Code 集成 EditorConfig

VS Code 本身不支持 EditorConfig，我们通过插件来使用

WebStorm 原生支持，无须安装插件

在 VS Code 扩展模块搜索 EditorConfig 进行安装，或者点击此链接：[EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig) <img alt="Pasted image 20241204094520" width="1338" src="https://private-user-images.githubusercontent.com/66454152/392206363-492849f8-b58a-43ab-9121-5e250b3d9976.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDc1MDE4MDksIm5iZiI6MTc0NzUwMTUwOSwicGF0aCI6Ii82NjQ1NDE1Mi8zOTIyMDYzNjMtNDkyODQ5ZjgtYjU4YS00M2FiLTkxMjEtNWUyNTBiM2Q5OTc2LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTA1MTclMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwNTE3VDE3MDUwOVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTExYjQyNDBiNjE3MGE2YzA5Y2U0OWIwYTliNDM3OWZlZjBmOTlmN2JmNDlkMmFiYTE5OTNmNmRkNTkyMzJlZWYmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.KT3-PH4ExnPjOB55vfIDhBQ2Hodjdb8A6-51y-Q-TbY">

插件会在根目录下找到配置文件，读取 `.editorconfig` 文件中定义的规则，并覆盖工作区的对应配置

## 聚合丰富配置

以下配置是可选的，请根据自己的需求选择

### 脚本命令

上面我们配置了 ESLint、Prettier、Stylelint的脚本命令，我们可以写一个聚合的命令，统一执行我们的三条脚本

确保你已经定义过 `lint:eslint`，`lint:format`，`lint:style`  这三个脚本命令，如果没有，请看上文

{
"scripts": {
"lint": "pnpm lint:format && pnpm lint:eslint && pnpm lint:style",
}
}
注意这里的顺序，我们应该先格式化代码后再调用 ESLint，Stylelint 进行代码检查

### 缓存文件删除

在上面的 Eslint 和 Stylelint 命令中，会生成缓存文件，这些文件存在 `node_modules/.cache` 目录中，有些时候我们可以删除这些缓存，它的作用在于删除缓存会强制重新检查所有文件，而不是依赖可能过时的缓存结果 <img alt="Pasted image 20241203222723" width="248" src="https://private-user-images.githubusercontent.com/66454152/392206597-b7facd66-137f-4dbe-9ada-0c3ef492ee7b.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDc1MDE4MDksIm5iZiI6MTc0NzUwMTUwOSwicGF0aCI6Ii82NjQ1NDE1Mi8zOTIyMDY1OTctYjdmYWNkNjYtMTM3Zi00ZGJlLTlhZGEtMGMzZWY0OTJlZTdiLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTA1MTclMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwNTE3VDE3MDUwOVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWY3MmE5NmJjZDM2OTlkZjBhNTRiOWUwM2UyMzBjYjAwYTI3MTdmMDQ0ZmY0NmIyZmVmZjdkMDEwM2M3OWM0MzMmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.0ryXSR0QTxihP8He9YX-MUCcRny6UsqvnbseUVIF-r0">

[`rimraf`](https://github.com/isaacs/rimraf) 是一个跨平台的删除工具，我们借助它来删除缓存文件

安装 `rimraf`：

pnpm add -D rimraf
在 `package.json` 的 `scripts` 中写入删除缓存文件脚本：

"scripts": {
"clear:cache": "rimraf node_modules/.cache",
}
然后就可以在终端执行命令来删除 `node_modules/.cache` 文件：

pnpm clear:cache

### 文件折叠

上文配置中，ESLint、Stylelint、Prettier都有其配置文件及忽略文件等，可以在 VS Code 中写入配置来折叠它们，显得整洁

在 `.vscode/settings.json` 中写入以下配置：

"explorer.fileNesting.enabled": true, //是否启用文件折叠
"explorer.fileNesting.expand": false, //控制是否自动扩展文件嵌套
"explorer.fileNesting.patterns": {
"eslint.config.js": ".prettierrc.*, stylelint.*, .editorconfig, .prettierignore, .stylelintignore",
},
假设你的配置文件与本文一致，此配置应该是这样的。你也可以自行配置折叠规则

<img alt="Pasted image 20240731142852" width="247" src="https://private-user-images.githubusercontent.com/66454152/392206793-96147e74-6e1f-48c9-98a4-61c9cf58e5d1.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDc1MDE4MDksIm5iZiI6MTc0NzUwMTUwOSwicGF0aCI6Ii82NjQ1NDE1Mi8zOTIyMDY3OTMtOTYxNDdlNzQtNmUxZi00OGM5LTk4YTQtNjFjOWNmNThlNWQxLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTA1MTclMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwNTE3VDE3MDUwOVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWY3YzZlN2EwNTE1NzJiZjYyM2MwMTM5OWQzNTcxNzJhMGFkNjE3ZGNjMGIxNGUzMzQxNmIzNWZmNThhNjU4NTAmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.4yaxM0svRkAayv2sgtCTiia06Plo4xXQf8PlfE0mQks">

import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "项目文档",
  // description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "base", link: "/base" },
    ],

    sidebar: [
      {
        text: "开始",
        items: [
          { text: "pnpm monorepo 项目配置", link: "/pnpm_monorepo" },
          { text: "团队代码风格统一", link: "/base" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});

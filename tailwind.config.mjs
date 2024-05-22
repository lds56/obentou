/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				"notosans": ['Noto Sans', 'sans-serif'],
			},
		},
	},
	plugins: [require("@tailwindcss/typography"), require("daisyui")],
	daisyUI: {
		themes: ["light", "dark", "cupcake"], // 选择要启用的主题
		// base: true, // 是否使用 daisyUI 的基础样式
		// utils: true, // 是否包含 daisyUI 的实用程序类
		// logs: true, // 是否在控制台输出日志
		// rtl: false, // 是否支持从右到左的布局
		// prefix: "", // daisyUI 组件的 CSS 前缀
		// darkTheme: "dark", // 深色模式下使用的主题名称
	  },
}

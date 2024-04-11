// 从 Tailwind CSS 配置中获取颜色定义
const colors = require('tailwindcss/colors');

// 合并 Tailwind 默认颜色和自定义颜色
const colorPalette = {
  ...colors,
  'base-100': '#FFFFFF',
  'base-200': '#F5F5F5',
  'base-300': '#D1D5DB',
  'base-content': '#374151',
  'base-900': '#0F172A',
};

/**
 * 根据颜色名称获取颜色的亮度值
 * @param {string} colorName - 颜色名称
 * @returns {number} 颜色的亮度值 (0-255)
 */
export function getColorBrightness(colorName) {
  const hex = colorPalette[colorName];
  if (!hex) {
    throw new Error(`未找到颜色 ${colorName} 的定义`);
  }

  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return (r * 299 + g * 587 + b * 114) / 1000;
}
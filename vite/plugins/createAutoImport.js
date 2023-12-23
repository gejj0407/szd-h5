import autoImport from "unplugin-auto-import/vite";

/**
 * 全局导入全家桶
 * @returns
 */
export default function createAutoImport() {
  return autoImport({
    include: [
      /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
      /\.vue$/,
      /\.vue\?vue/, // .vue
      /\.md$/, // .md
    ],
    imports: ["vue", "vue-router", "pinia"],
    // 配置type文件生成位置
    dts: false,
  });
}

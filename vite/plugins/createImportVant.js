import Components from "unplugin-vue-components/vite";
import { VantResolver } from "unplugin-vue-components/resolvers";

/**
 * 全局按需引入vant组件
 * @returns
 */
export default function createImportVant() {
  return Components({
    resolvers: [VantResolver()],
    extensions: ["vue"], // 文件扩展
    dts: false, // 配置type文件生成位置
  });
}

import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

import createAutoImport from "./createAutoImport";
import createImportVant from "./createImportVant";
import createSetupExtend from "./createSetupExtend";

export default function createVitePlugins() {
  const vitePlugins = [
    vue(),
    vueJsx(),
    createAutoImport(),
    createImportVant(),
    createSetupExtend(),
  ];

  return vitePlugins;
}

import setupExtend from "unplugin-vue-setup-extend-plus/vite";

/**
 * Make the vue script setup syntax support the name attribute
 * @returns
 */
export default function createSetupExtend() {
  return setupExtend({});
}

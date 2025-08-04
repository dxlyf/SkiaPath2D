import { defineConfig } from "vite";
import dts from 'vite-plugin-dts'
import { resolve } from "path";

export default defineConfig({
 
  plugins: [
    dts({
    outDir: 'dist/types',      // 指定输出目录
   // include: ['src'],          // 包含的源码
    //exclude: ['**/*.test.ts'], // 排除测试文件
  })],
  resolve:{
    alias:{
      'skia-path2d': resolve(__dirname, './dist/skia-path2d.es.js'),

    }
  },
  build: {
    outDir:'dist',
    lib: {
      entry: 'src/index.ts', // 入口文件
      name: "SkPath2d", // UMD 全局变量名
      fileName: (format) => `skia-path2d.${format}.js`, // 输出文件名
      formats: ["es", "umd", "cjs"], // 打包格式
    },
    rollupOptions: {
    },
    minify:true
  },
  optimizeDeps: {
   // disabled: true
  }
});
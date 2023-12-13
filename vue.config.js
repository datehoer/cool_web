const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: "localhost",
    open: false, // 自动打开浏览器
    port: 8081,
},
});

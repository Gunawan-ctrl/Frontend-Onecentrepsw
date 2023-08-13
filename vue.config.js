module.exports = {
  devServer: {
    open: false,
  },
  runtimeCompiler: true,
  publicPath: "./",
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "One Centre Pesawaran";
      return args;
    });
  },
};

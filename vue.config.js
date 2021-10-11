module.exports = {
  devServer: {
    overlay: {
      errors: true,
    },
  },
  css: {
    requireModuleExtension: false,
    loaderOptions: {
      css: {
        modules: {
          localIdentName:
            process.env.NODE_ENV !== 'production'
              ? '[name]__[local]'
              : '[hash:base64]',
        },
      },
    },
  },
};

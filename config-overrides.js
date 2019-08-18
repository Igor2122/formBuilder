module.exports = config => {
  require(`react-app-rewire-postcss`)(config, {
    plugins: loader => [
      require(`postcss-preset-env`)({
        stage: 3,
        features: {
          'nesting-rules': true
        }
      }),
      require(`postcss-custom-media`)({
        importFrom: `./src/config.css`
      }),
      require(`postcss-custom-properties`)({
        preserve: false,
        importFrom: `./src/config.css`
      })
    ]
  });
  return config;
};

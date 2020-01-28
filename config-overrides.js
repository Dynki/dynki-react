const { injectBabelPlugin } = require('react-app-rewired');

module.exports = function override(config, env) {
    config = injectBabelPlugin(
        ['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }],
        config,
    );
    config.output.globalObject = 'this'
    config.module.rules[0].parser.requireEnsure = true
  
    return config;
};
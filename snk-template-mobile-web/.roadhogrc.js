const path = require('path');
const pxtorem = require('postcss-pxtorem');

const svgSpriteDirs = [
  require.resolve('antd-mobile').replace(/warn\.js$/, ''), // antd-mobile 内置svg
  path.resolve(__dirname, 'src/assets/svgs'),  // 业务代码本地私有 svg 存放目录
];

export default {
  entry: 'src/index.js',
  theme: 'src/theme/theme.js',
  svgSpriteLoaderDirs: svgSpriteDirs,
  extraBabelPlugins: [
    'transform-runtime',
    ['import', { 'libraryName': 'antd-mobile', 'libraryDirectory': 'lib', 'style': true }]
  ],
  extraPostCSSPlugins: [
    pxtorem({
      rootValue: 100,
      propWhiteList: [],
    }),
  ],
  env: {
    development: { // 开发环境
      extraBabelPlugins: [
        'dva-hmr',
      ],
      define: {
        SERVER: '',
      }
    },
    uat: {// UAT环境
      define: {
        SERVER: 'uat server', 
      }
    },
    production: {// 生产环境
      define: {
        SERVER: 'prod server', 
      }
    }
  },
  define: {
    VERSION: require('./package.json').version
  }
}

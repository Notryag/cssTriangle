import { defineConfig } from 'umi';

export default defineConfig({
  history:{
    type:'hash'
  },
  nodeModulesTransform: {
    type: 'none',
  },
  base: './', // 打包路径，默认是/
  publicPath: './', // 资源访问路径，默认/
  routes: [
    { path: '/', component: '@/pages/index' },
  ],
  fastRefresh: {},
});

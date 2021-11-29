import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import * as echarts from 'echarts'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 富文本编辑器
import VueQuillEditor from 'vue-quill-editor/dist/vue-quill-editor.js'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'


Vue.use(ElementUI);
Vue.use(VueQuillEditor);
Vue.config.productionTip = false;
axios.defaults.baseURL = 'http://localhost:port/'
Vue.prototype.$http = axios;
Vue.prototype.$echarts = echarts;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

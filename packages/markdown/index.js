import 'core-js/stable'; 
import markDown from './index.vue'
markDown.install = function (Vue) {
  Vue.component(markDown.name, markDown)
}
 
export default markDown
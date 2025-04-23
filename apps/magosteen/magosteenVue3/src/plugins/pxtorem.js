import { VueElementConstructor } from 'vue';

export default {
  install(Vue) {
    Vue.prototype.$pxtorem = function pxtorem(px) {
      const rem = px / 37.5;
      const fontSize = parseFloat(document.documentElement.style.fontSize);
      return rem * fontSize;
    };
  },
};

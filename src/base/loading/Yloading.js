import YloadingMain from './main.vue'
import Vue from 'vue'

const Mask = Vue.extend(YloadingMain);

const YLoadingDirective = {
    install(Vue, option){
        Vue.directive('loading', {
            bind(el, binding, vnode){
                let instance = new Mask();
                instance.$mount();
                el.maskInstance = instance;
                el.appendChild(instance.$el);
                instance.visible = binding.value
            },
            inserted(el, binding, vnode){
                
            },
            update(el, binding){
                el.maskInstance.visible = binding.value
            },
            unbind(el, binding){

            }
        })
    }
}

export default YLoadingDirective
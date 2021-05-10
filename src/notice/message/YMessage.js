import Vue from 'vue'
import mainVue from './main.vue'

const MessageConstructor = Vue.extend(mainVue);

export default function Message(options){
    options = options || {};
    if(typeof options == 'string'){
        options = {
            message: options
        }
    }
    let instance = new MessageConstructor({
        data: options
    });
    instance.$mount();
    let el = instance.$el;
    document.body.appendChild(el);
    return instance
}
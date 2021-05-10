import app from './app.vue'
import Vue from 'vue'
import './base/regist'
import './common/reset.scss'
import '../assets/font/iconfont.css'
import './common/transition.scss'

window.app = new Vue({
    el: '#app',
    render(h){
        return h(app)
    }
})
import app from './app.vue'
import Vue from 'vue'

import './common/reset.scss'
import '../assets/font/iconfont.css'
import './common/transition.scss'

import './base/regist'
import './view-components/regist'

window.app = new Vue({
    el: '#app',
    render(h){
        return h(app)
    }
})
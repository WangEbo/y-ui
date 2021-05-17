import Vue from 'vue'
import YInput from './YInput.vue'
import YSelect from './YSelect.vue'
import YForm from './YForm.vue'
import YFormItem from './YFormItem.vue'
import YPopper from './YPopper.vue'
import YIcon from './YIcon.vue'
import YTree from './YTree/Tree.vue'
import YCheckbox from './YCheckbox/YCheckbox.vue'

import YMessage from '../notice/message/YMessage'
import Yloading from './loading/Yloading'


import YTabs from '../view-components/y-tabs/YTabs.vue'
Vue.prototype.$message = YMessage
Vue.use(Yloading)
    
Vue.component('y-input', YInput);
Vue.component('y-select', YSelect);
Vue.component('y-form', YForm);
Vue.component('y-form-item', YFormItem);
Vue.component('y-popper', YPopper);
Vue.component('y-icon', YIcon);
Vue.component('y-tree', YTree);
Vue.component('y-checkbox', YCheckbox);

Vue.component('y-tabs', YTabs)
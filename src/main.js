import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import VueMultiselect from 'vue-multiselect'
import VueAwesomePaginate from 'vue-awesome-paginate'

createApp(App)
  .component('Multiselect', VueMultiselect)
  .use(VueAwesomePaginate)
  .mount('#app')



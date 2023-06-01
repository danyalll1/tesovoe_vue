import { createApp } from 'vue'
import App from './App.vue'
import LineChart from './LineChart.vue'
const app = createApp(App)
app.component('LineChart',LineChart)
app.mount('#app')


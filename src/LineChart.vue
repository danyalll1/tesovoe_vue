<template>
    <Line id="my-chart-id" :data="props.chartData" :options="chartOptions"/>
</template>
  
  <script setup>
  import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  } from 'chart.js'
  import { Line } from 'vue-chartjs'
 
  
    ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  )
  


  const props = defineProps({
    chartData: Object,
    chartOptions: Object
  })
  
 
  


  
  
  

 

 
  
  </script>
  
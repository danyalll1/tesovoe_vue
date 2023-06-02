<script setup>

import {computed,ref,reactive, watch, nextTick} from 'vue'
import set from "./assets/data.json" 


let dataSet = ref(set)
let active = ref(1)
let chart = ref(1)



const chartOptions = reactive({
  responsive: true,
  maintainAspectRatio: false,
  update : true,
})

const labelss = computed(()=>{
  let mass = []
  dataSet.value.forEach(el => {
    mass.push(el.date)
  })
  return mass
})

const totalToday = computed (()=>{
  return (dataSet.value[active.value].cash+dataSet.value[active.value].credit+dataSet.value[active.value].debit)
})

const totalYesterday = computed (()=>{
  return (dataSet.value[active.value-1].cash+dataSet.value[active.value-1].credit+dataSet.value[active.value-1].debit)
})

const averageToday = computed(()=>{
  return Math.round(totalToday.value/dataSet.value[active.value].count)
})


const averageYesterday = computed(()=>{
  return Math.round(totalYesterday.value/dataSet.value[active.value-1].count)
})


function percent(num1,num2){
  if (num2 < num1){
    return `+${Math.round((num1/(num2/100)-100))}%`
  }
  if (num2 > num1){
    return `${Math.round((num1/(num2/100)-100))}%`
  }
  else return '0'

}




const chartDataTotal = computed(()=>{
  let mass = []
  if(chart.value === 1){
    dataSet.value.forEach(el =>{
      mass.push(el.cash+el.credit+el.debit)
    })
  return mass
  }
  if(chart.value === 2){
    dataSet.value.forEach(el =>{
      mass.push(el.cash)
    })
  return mass
  }
  if(chart.value === 3){
    dataSet.value.forEach(el =>{
      mass.push(el.debit)
    })
  return mass
  }
  if(chart.value === 4){
    dataSet.value.forEach(el =>{
      mass.push(el.credit)
    })
  return mass
  }
  if(chart.value === 5){
    dataSet.value.forEach(el =>{
      mass.push(el.count)
    })
  return mass
  }
  if(chart.value === 6){
    dataSet.value.forEach(el =>{
      mass.push(Math.round((el.cash+el.credit+el.debit)/el.count))
    })
  return mass
  }

 
})


let vis = ref(true)
watch(chartDataTotal,(n)=>{
  vis.value = false;
  setTimeout(()=>vis.value = true,1)
})

let rowVis1 = ref(true)
let rowVis2 = ref(true)
let rowVis3 = ref(true)
let rowVis4 = ref(true)
let rowVis5 = ref(true)
let rowVis6 = ref(true)


function hide (n){
  if (n===1){
    rowVis1.value = false
  }
  if (n===2){
    rowVis2.value = false
  }
  if (n===3){
    rowVis3.value = false
  }
  if (n===4){
    rowVis4.value = false
  }
  if (n===5){
    rowVis5.value = false
  }
  if (n===6){
    rowVis6.value = false
  }
}

const data = ref({
  labels: labelss,
  datasets:
      [
        {
          label: 'stats',
          backgroundColor: ['rgba(217, 24, 24, 0.51)'],
          data: chartDataTotal,
        },

      ]
})







</script>

<template>

<div class="container">
  <div class="header">
    <span class="header__name">
      {{ chart }}
      Общая статистика
    </span>
  </div>
  <div class="main">
    <div class="table">
      <div class="table__row">
        <div class="table__box">Показатель</div>
        <div class="table__box today">Текущий день</div>
        <div class="table__box">Вчера</div>
      </div>
      <div class="table__row" v-if="rowVis1">
        <button class="table__button-del" @click="hide(1)">X</button>
        <div class="table__box" @click="chart = 1;">Выручка, Руб</div>
        <div class="table__box today">{{ totalToday }}</div>
        <div class="table__box" :class="{'green' : percent(totalToday,totalYesterday).includes('+'),'red' : percent(totalToday,totalYesterday).includes('-')}">{{ totalYesterday }} <div class="table__percent" :class="{'green' : percent(totalToday,totalYesterday).includes('+'),'red' : percent(totalToday,totalYesterday).includes('-')}">{{percent(totalToday,totalYesterday)}}</div></div>
      </div>
      <div class="table__row">
        <div class="table__chart">
          <LineChart v-if="vis" :chartOptions="chartOptions" :chartData="data"></LineChart>
        </div>
      </div>
      <div class="table__row" v-if="rowVis2">
        <button class="table__button-del" @click="hide(2)">X</button>
        <div class="table__box" @click="chart = 2">Наличные</div>
        <div class="table__box today">{{dataSet[active].cash}}</div>
        <div class="table__box" :class="{'green' : percent(dataSet[active].cash,dataSet[active-1].cash).includes('+'),'red' : percent(dataSet[active].cash,dataSet[active-1].cash).includes('-')}">{{dataSet[active-1].cash}}<div class="table__percent" :class="{'green' : percent(dataSet[active].cash,dataSet[active-1].cash).includes('+'),'red' : percent(dataSet[active].cash,dataSet[active-1].cash).includes('-')}">{{percent(dataSet[active].cash,dataSet[active-1].cash)}}</div></div>
      </div>
      <div class="table__row" v-if="rowVis3">
        <button class="table__button-del" @click="hide(3)">X</button>
        <div class="table__box" @click="chart = 3" >Безналичный расчёт</div>
        <div class="table__box today">{{dataSet[active].debit}}</div>
        <div class="table__box" :class="{'green' : percent(dataSet[active].debit,dataSet[active-1].debit).includes('+'),'red' : percent(dataSet[active].debit,dataSet[active-1].debit).includes('-')}">{{dataSet[active-1].debit}}<div class="table__percent" :class="{'green' : percent(dataSet[active].debit,dataSet[active-1].debit).includes('+'),'red' : percent(dataSet[active].debit,dataSet[active-1].debit).includes('-')}">{{percent(dataSet[active].debit,dataSet[active-1].debit)}}</div></div>
      </div>
      <div class="table__row" v-if="rowVis4">
        <button class="table__button-del" @click="hide(4)">X</button>
        <div class="table__box" @click="chart = 4">Кредитные карты</div>
        <div class="table__box today">{{dataSet[active].credit}}</div>
        <div class="table__box" :class="{'green' : percent(dataSet[active].credit,dataSet[active-1].credit).includes('+'),'red' : percent(dataSet[active].credit,dataSet[active-1].credit).includes('-')}">{{dataSet[active-1].credit}}<div class="table__percent" :class="{'green' : percent(dataSet[active].credit,dataSet[active-1].credit).includes('+'),'red' : percent(dataSet[active].credit,dataSet[active-1].credit).includes('-')}">{{percent(dataSet[active].credit,dataSet[active-1].credit)}}</div></div>
      </div>
      <div class="table__row" v-if="rowVis5">
        <button class="table__button-del" @click="hide(5)">X</button>
        <div class="table__box" @click="chart = 5">Количество чеков</div>
        <div class="table__box today">{{dataSet[active].count}}</div>
        <div class="table__box" :class="{'green': percent(dataSet[active].count,dataSet[active-1].count).includes('+'),'red': percent(dataSet[active].count,dataSet[active-1].count).includes('-')}">{{dataSet[active-1].count}}<div class="table__percent" :class="{'green': percent(dataSet[active].count,dataSet[active-1].count).includes('+'),'red': percent(dataSet[active].count,dataSet[active-1].count).includes('-')}" >{{percent(dataSet[active].count,dataSet[active-1].count)}}</div></div>
      </div>
      <div class="table__row" v-if="rowVis6">
        <button class="table__button-del" @click="hide(6)">X</button>
        <div class="table__box" @click="chart = 6">Средний чек</div>
        <div class="table__box today">{{averageToday}}</div>
        <div class="table__box" :class="{'green' : percent(averageToday,averageYesterday).includes('+'),'red' : percent(averageToday,averageYesterday).includes('-')}">{{averageYesterday}}<div class="table__percent" :class="{'green' : percent(averageToday,averageYesterday).includes('+'),'red' : percent(averageToday,averageYesterday).includes('-')}">{{percent(averageToday,averageYesterday)}}</div></div>
      </div>
      
    </div>
  </div>
</div>

</template>

<style scoped>


.table__button-del{
  cursor: pointer;
  padding: 0;
  position: absolute;
  left: 1%;
  width: 30px;
  height: 100%;
  background-color: rgb(255, 103, 103,0.2);;
  border: none;
  border-radius: 4px;
  transition: ease-in-out 0.2s;
}

.table__button-del:hover{
  transition: ease-in-out 0.2s;
  background-color: rgb(255, 103, 103,0.4);;
}

@media (max-width: 720px){
  .table__button-del{
  top: 25%;
  left: 1%;
  width: 30px;
  height: 50%;
}
}
@media (max-width: 660px){
  .table__box{
 font-size: 11px;
 }
}


@media (max-width: 550px){
  .table__button-del{
  top: 25%;

  width: 10px;
  height: 50%;
}
}
</style>

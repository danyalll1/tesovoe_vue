<script setup>

import {computed,ref,reactive, watch} from 'vue'
import dataSet from "./assets/data.json" 

let active = ref(1)

const chartOptions = reactive({
  responsive: true,
  maintainAspectRatio: false
})

const labelss = computed(()=>{
  let mass = []
  dataSet.forEach(el => {
    mass.push(el.date)
  })
  return mass
})

const chartData = computed(()=>{
  let mass = []
  dataSet.forEach(el =>{
    mass.push(el.cash)
  })
  return mass
})

console.log(labelss)
console.log(chartData)

const totalToday = computed (()=>{
  return (dataSet[active.value].cash+dataSet[active.value].credit+dataSet[active.value].debit)
})

const totalYesterday = computed (()=>{
  return (dataSet[active.value-1].cash+dataSet[active.value-1].credit+dataSet[active.value-1].debit)
})

const averageToday = computed(()=>{
  return Math.round(totalToday.value/dataSet[active.value].count)
})


const averageYesterday = computed(()=>{
  return Math.round(totalYesterday.value/dataSet[active.value-1].count)
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


const data = reactive({
  labels: labelss,
  datasets:
      [
        {
          label: 'Выручка',
          backgroundColor: ['rgba(217, 24, 24, 0.51)'],
          data: chartData
        },

      ]
})




</script>

<template>

<div class="container">
  <div class="header">
    <span class="header__name">
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
      <div class="table__row">
        <div class="table__box">Выручка, Руб</div>
        <div class="table__box today">{{ totalToday }}</div>
        <div class="table__box" :class="{'green' : percent(totalToday,totalYesterday).includes('+'),'red' : percent(totalToday,totalYesterday).includes('-')}">{{ totalYesterday }} <div class="table__percent" :class="{'green' : percent(totalToday,totalYesterday).includes('+'),'red' : percent(totalToday,totalYesterday).includes('-')}">{{percent(totalToday,totalYesterday)}}</div></div>
      </div>
      <div class="table__row">
        <div class="table__chart">
          <LineChart :chartOptions="chartOptions" :chartData="data"></LineChart>
        </div>
      </div>
      <div class="table__row">
        <div class="table__box">Наличные</div>
        <div class="table__box today">{{dataSet[active].cash}}</div>
        <div class="table__box" :class="{'green' : percent(dataSet[active].cash,dataSet[active-1].cash).includes('+'),'red' : percent(dataSet[active].cash,dataSet[active-1].cash).includes('-')}">{{dataSet[active-1].cash}}<div class="table__percent" :class="{'green' : percent(dataSet[active].cash,dataSet[active-1].cash).includes('+'),'red' : percent(dataSet[active].cash,dataSet[active-1].cash).includes('-')}">{{percent(dataSet[active].cash,dataSet[active-1].cash)}}</div></div>
      </div>
      <div class="table__row">
        <div class="table__box">Безналичный расчёт</div>
        <div class="table__box today">{{dataSet[active].debit}}</div>
        <div class="table__box" :class="{'green' : percent(dataSet[active].debit,dataSet[active-1].debit).includes('+'),'red' : percent(dataSet[active].debit,dataSet[active-1].debit).includes('-')}">{{dataSet[active-1].debit}}<div class="table__percent" :class="{'green' : percent(dataSet[active].debit,dataSet[active-1].debit).includes('+'),'red' : percent(dataSet[active].debit,dataSet[active-1].debit).includes('-')}">{{percent(dataSet[active].debit,dataSet[active-1].debit)}}</div></div>
      </div>
      <div class="table__row">
        <div class="table__box">Кредитные карты</div>
        <div class="table__box today">{{dataSet[active].credit}}</div>
        <div class="table__box" :class="{'green' : percent(dataSet[active].credit,dataSet[active-1].credit).includes('+'),'red' : percent(dataSet[active].credit,dataSet[active-1].credit).includes('-')}">{{dataSet[active-1].credit}}<div class="table__percent" :class="{'green' : percent(dataSet[active].credit,dataSet[active-1].credit).includes('+'),'red' : percent(dataSet[active].credit,dataSet[active-1].credit).includes('-')}">{{percent(dataSet[active].credit,dataSet[active-1].credit)}}</div></div>
      </div>
      <div class="table__row">
        <div class="table__box">Количество чеков</div>
        <div class="table__box today">{{dataSet[active].count}}</div>
        <div class="table__box" :class="{'green': percent(dataSet[active].count,dataSet[active-1].count).includes('+'),'red': percent(dataSet[active].count,dataSet[active-1].count).includes('-')}">{{dataSet[active-1].count}}<div class="table__percent" :class="{'green': percent(dataSet[active].count,dataSet[active-1].count).includes('+'),'red': percent(dataSet[active].count,dataSet[active-1].count).includes('-')}" >{{percent(dataSet[active].count,dataSet[active-1].count)}}</div></div>
      </div>
      <div class="table__row">
        <div class="table__box">Средний чек</div>
        <div class="table__box today">{{averageToday}}</div>
        <div class="table__box" :class="{'green' : percent(averageToday,averageYesterday).includes('+'),'red' : percent(averageToday,averageYesterday).includes('-')}">{{averageYesterday}}<div class="table__percent" :class="{'green' : percent(averageToday,averageYesterday).includes('+'),'red' : percent(averageToday,averageYesterday).includes('-')}">{{percent(averageToday,averageYesterday)}}</div></div>
      </div>
      
    </div>
  </div>
</div>

</template>

<style scoped>

*{
  font-family:sans-serif ;
}

.table{

}
.table__row{
  display: flex;
  justify-content: center;
  gap: 3px;
  margin-top: 3px;
}

.table__box{
  background-color: rgba(244, 253, 243, 0.438);
  height: 40px;
  justify-content: center;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 2px 5px;
  border-radius: 5px;
  gap: 10%;
}

.table__box.green{
  background-color: rgba(159, 250, 126, 0.3);
}

.table__box.red{
  background-color: rgb(255, 103, 103,0.2);
}

.table__box.today{
  background-color: rgba(174, 243, 255, 0.226);
 
}

.table__percent{
  color: black;
}
.table__percent.red{
  color:red;
}

.table__percent.green{
  color:green;
}

.table__chart{
  width: 60vw;
  height: 60vh;
  display: flex;
  justify-content: center;
}
</style>

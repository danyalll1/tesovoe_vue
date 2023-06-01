<script setup>

import {computed,ref} from 'vue'
import dataSet from "./assets/data.json" 

let active = ref(1)


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


const persent = computed(()=>{
  return 0
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
        <div class="table__box">{{ totalYesterday }}</div>
      </div>
      <div class="table__chart">
        График..............................................
      </div>
      <div class="table__row">
        <div class="table__box">Наличные</div>
        <div class="table__box today">{{dataSet[active].cash}}</div>
        <div class="table__box">{{dataSet[active-1].cash}}</div>
      </div>
      <div class="table__row">
        <div class="table__box">Безналичный расчёт</div>
        <div class="table__box today">{{dataSet[active].debit}}</div>
        <div class="table__box">{{dataSet[active-1].debit}}</div>
      </div>
      <div class="table__row">
        <div class="table__box">Кредитные карты</div>
        <div class="table__box today">{{dataSet[active].credit}}</div>
        <div class="table__box">{{dataSet[active-1].credit}}</div>
      </div>
      <div class="table__row">
        <div class="table__box">Количество чеков</div>
        <div class="table__box today">{{dataSet[active].count}}</div>
        <div class="table__box">{{dataSet[active-1].count}}</div>
      </div>
      <div class="table__row">
        <div class="table__box">Средний чек</div>
        <div class="table__box today">{{averageToday}}</div>
        <div class="table__box">{{averageYesterday}} {{ persent }}</div>
      </div>
      
    </div>
  </div>
</div>

</template>

<style scoped>

*{
  font-family:sans-serif ;
}

.main__table{
  display:grid;
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
  justify-content: space-evenly;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 2px, 5px;
  border-radius: 5px;
}

.table__box.today{
  background-color: rgba(174, 243, 255, 0.226);
 
}
</style>

<script setup>
import { useRequestStore } from '@/stores/request';

const store = useRequestStore();

const ls = JSON.parse(localStorage.getItem('userDemoData'));
const isAdmin = ls.login === 'adminka' && ls.password === 'password';
</script>

<template>
  <h1>{{isAdmin ? 'Все Заявки' : 'Ваши заявки'}}</h1>

  <div class="reqList" v-if="isAdmin">
    <div class="reqItem" v-for="elem in store.requestData" @click="store.getReqById(elem.id)">
      <p>{{ elem.request_type || 'Названия нет' }}</p>
      <p>{{ elem.status || 'Статуса нет' }}</p>
    </div>
  </div>

  <div class="reqList" v-else>
    <div class="reqItem" v-for="elem in store.userReqData" @click="store.getReqById(elem.id)">
      <p>{{ elem.request_type || 'Названия нет' }}</p>
      <p>{{ elem.status || 'Статуса нет' }}</p>
    </div>
  </div>
</template>

<style scoped>
.reqList {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.reqItem{
  border: 3px solid #DEDEDE;
  border-radius: 10px;
  padding: 15px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  cursor: pointer;
}

.reqItem:hover{
  background-color: #DEDEDE;
}

.reqItem>p:first-child{
  font-size: 18px;
  font-weight: 600;
}
</style>

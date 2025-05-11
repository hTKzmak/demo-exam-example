import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import router from '@/router';

export const useRequestStore = defineStore('request', () => {
  // все запросв
  const requestData = ref([]);
  // запросы пользователя
  const userReqData = ref([]);

  const ls = JSON.parse(localStorage.getItem('userDemoData'));

  // запрос на получение данных всех запросов
  function fetchData() {
    fetch('http://localhost:3030/api/request')
      .then((response) => response.json())
      .then((data) => {
        requestData.value = data
        userReqData.value = data.filter((elem) => {
          if (ls) {
            elem.person_id === ls.id
          }
        })
        console.log(requestData.value)
      })
  }

  fetchData()

  // редирект на определённую страницу и хранение данных в LS
  function getReqById(id) {
    router.push(`/request/${id}`)
    localStorage.setItem('currentReq', JSON.stringify(requestData.value.find(elem => elem.id === id)))
  }

  return { requestData, userReqData, getReqById, fetchData }
})

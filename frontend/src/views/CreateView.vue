<script setup>
import router from '@/router';
import { useRequestStore } from '@/stores/request';

const store = useRequestStore();

const values = {
    address: '',
    status: 'В работе',
    contacts: '',
    date: '',
    time: '',
    person_id: 2,
    request_type: 'Общий клининг',
    payment_type: 'Наличные',
}

function submitFunc(e) {
    e.preventDefault();

    console.log(values)

    fetch('http://localhost:3030/api/request', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            // обновление данных
            store.fetchData()
            store.fetchUserReqData()
            router.push("/");
        })
}
</script>

<template>
    <h1>Создать заявку</h1>
    <form v-on:submit="(e) => submitFunc(e)">
        <input required type="text" placeholder="Адрес" v-model="values.address" @input="e => values.address = e.target.value">
        <input required type="text" placeholder="Контактные данные" v-model="values.contacts"
            @input="e => values.contacts = e.target.value">
        <input required type="date" placeholder="Дата" v-model="values.date" @input="e => values.date = e.target.value">
        <input required type="time" placeholder="Время" v-model="values.time" @input="e => values.time = e.target.value">

        <select @change="e => values.request_type = e.target.value">
            <option selected value="Общий клининг">Общий клининг</option>
            <option value="Генеральная уборка">Генеральная уборка</option>
            <option value="Послестроительная уборка">Послестроительная уборка</option>
            <option value="Химчистка ковров и мебели">Химчистка ковров и мебели</option>
        </select>

        <select @change="e => values.payment_type = e.target.value">
            <option selected value="Наличные">Наличные</option>
            <option value="Банковская карта">Банковская карта</option>
        </select>
        <button>Создать</button>
    </form>
</template>

<style scoped>
form {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

input,
select {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 10px;
    border: 3px solid #D9D9D9;
    padding: 10px;
    font-size: 18px;
}

button {
    background-color: #67BA80;
    border: 3px solid #67BA80;
    border-radius: 10px;
    font-size: 18px;
    color: #FFF;
    padding: 15px;
    cursor: pointer;
}
</style>
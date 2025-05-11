<script setup>
import router from '@/router';
import { useRequestStore } from '@/stores/request';

const store = useRequestStore();

// получение данные о запросе 
const ls = JSON.parse(localStorage.getItem('currentReq'));

const values = {
    id: ls.id,
    address: ls.address,
    contacts: ls.contacts,
    date: ls.date,
    description: ls.description,
    payment_type: ls.payment_type,
    request_type: ls.request_type,
    status: ls.status,
    time: ls.time,
}

// получаем данные о пользователе
const lsUser = JSON.parse(localStorage.getItem('userDemoData'));
const isAdmin = lsUser.login === 'adminka' && lsUser.password === 'password';

// функция по изменению статуса
async function changeStatus(e) {
    const newStatus = e.target.value;
    values.status = newStatus;
    
    if (newStatus === 'Отменён') {
        const reason = prompt('Укажите причину отмены:');
        if (reason === null) {
            // Пользователь отменил ввод, возвращаем предыдущий статус
            e.target.value = values.status;
            return;
        }
        
        // Обновляем описание
        values.description = reason;
        
        try {
            // Отправляем обновление описания
            await fetch('http://localhost:3030/api/request/desc', {
                method: 'PUT',
                body: JSON.stringify({
                    id: values.id,
                    description: reason
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });
        } catch (error) {
            console.error('Ошибка при обновлении описания:', error);
        }
    }
    
    try {
        // Отправляем обновление статуса
        const response = await fetch('http://localhost:3030/api/request/status', {
            method: 'PUT',
            body: JSON.stringify({
                id: values.id,
                status: newStatus
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        
        if (response.ok) {
            // Обновляем данные в хранилище и localStorage
            store.fetchData();
            localStorage.setItem('currentReq', JSON.stringify(values));
        }
    } catch (error) {
        console.error('Ошибка при обновлении статуса:', error);
    }
}
</script>

<template>
    <div class="reqContent">
        <button @click="router.push('/')">Назад</button>
        <div class="reqInfo">
            <h1>Тип заявки: {{ values.request_type }}</h1>
            <ul>
                <li>Адрес: {{ values.address }}</li>
                <li>Контакты: {{ values.contacts }}</li>
                <li>Дата и время: {{ values.date }} - {{ values.time }}</li>
                <li>Тип оплаты: {{ values.payment_type }}</li>
                <li>Статус: {{ values.status }}</li>
            </ul>

            <div v-if="isAdmin">
                Изменить статус: 
                <select :value="values.status" @change="changeStatus">
                    <option value="Завершён">Завершён</option>
                    <option value="В работе">В работе</option>
                    <option value="Отменён">Отменён</option>
                </select>
            </div>
        </div>
        <div class="reqInfo" v-if="values.status === 'Отменён' && values.description">
            <h3>Причина отмены</h3>
            <p>{{ values.description }}</p>
        </div>
    </div>
</template>

<style scoped>
.reqInfo {
    background-color: #F4E8D3;
    border-radius: 20px;
    padding: 30px;
}

.reqInfo:last-child {
    margin-top: 20px;
}
</style>

<script setup>
import router from '@/router';
import { useRoute } from 'vue-router';

// отслеживание ссылки
const navigation = useRoute();

const values = {
    full_name: '',
    login: '',
    password: '',
    email: '',
    phone: '',
}

// подтверждение формы
const submitFunc = async (e) => {
    e.preventDefault();

    if (navigation.path.includes('reg')) {
        console.log('Регистрация')

        fetch('http://localhost:3030/api/person', {
            method: 'POST',
            body: JSON.stringify(values),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                localStorage.setItem('userDemoData', JSON.stringify(data));
                router.push("/");
            }
            )
    }
    else {
        console.log('Авторизация')

        fetch(`http://localhost:3030/api/person/${values.login}/${values.password}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                localStorage.setItem('userDemoData', JSON.stringify(data));
                router.push("/");
            }
            )
    }

    console.log(values)
}
</script>

<template>
    <h1>{{ navigation.path.includes('reg') ? 'Регистрация' : 'Авторизация' }}</h1>

    <RouterLink to="/auth/login" v-if="navigation.path.includes('reg')">Есть аккаунт? Войдите</RouterLink>
    <RouterLink to="/auth/reg" v-else>Нет аккаунта? Зарегистрируйтесь</RouterLink>

    <!-- Форма для регистрации -->
    <form v-on:submit="(e) => submitFunc(e)" v-if="navigation.path.includes('reg')">
        <input required type="text" placeholder="ФИО" v-model="values.full_name" @input="e => values.full_name = e.target.value">
        <input required type="text" placeholder="Логин" v-model="values.login" @input="e => values.login = e.target.value">
        <input required type="password" placeholder="Пароль" v-model="values.password"
            @input="e => values.password = e.target.value">
        <input required type="email" placeholder="Электронная почта" v-model="values.email"
            @input="e => values.email = e.target.value">
        <input required type="tel" placeholder="Телефон" v-model="values.phone" @input="e => values.phone = e.target.value">
        <button>Зарегистрироваться</button>
    </form>

    <!-- Форма для авторизации -->
    <form v-on:submit="(e) => submitFunc(e)" v-else>
        <input required type="text" placeholder="Логин" v-model="values.login" @input="e => values.login = e.target.value">
        <input required type="password" placeholder="Пароль" v-model="values.password"
            @input="e => values.password = e.target.value">
        <button>Авторизоваться</button>
    </form>
</template>

<style scoped>
form {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

input {
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

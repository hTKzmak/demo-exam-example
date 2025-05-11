<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <img src="./assets/logo.png" alt="#">
    <nav>
      <RouterLink to="/">Главная</RouterLink>
      <RouterLink to="/create">Создать заявку</RouterLink>
      <RouterLink to="/auth/login">Выйти с аккаунта</RouterLink>
    </nav>
  </header>

  <div class="container">
    <RouterView />
  </div>
</template>

<style scoped>
header{
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 5px 10px 0px #00000025;
}

img{
  width: 50px;
}

nav{
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  font-weight: 700;
}
</style>

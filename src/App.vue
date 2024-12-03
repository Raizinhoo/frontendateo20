<script setup>
import { onMounted } from 'vue';
import { PassageUser } from '@passageidentity/passage-elements/passage-user';
import { useAuthStore } from '@/stores/auth';
import Menu from './components/MenuView.vue';

const authStore = useAuthStore();

</script>

<template>
 <div id="app">
    <Menu />
    <router-view />
  </div>
  <header>
    <!-- <router-link :to="{ name: 'home' }">Home</router-link> |
    <router-link to="/categorias">Categorias</router-link> |
    <router-link to="/compras">Compras</router-link> |
    <router-link to="/livros">Livros</router-link>|
    <div v-if="authStore.loggedIn">
    <router-link  to="/logout">Logout</router-link> |
      {{ authStore.user.email }}
    </div>
    <router-link v-else to="/login">Login</router-link> -->
  </header>
  <main>
  
  </main>
</template>

<template>
  <nav class="navbar">
    <ul class="nav-links">
      <li v-for="item in menuItems" :key="item.name" class="nav-item">
        <router-link :to="item.link" class="nav-link">{{ item.name }}</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      menuItems: [
        { name: "Início", link: "/" },
        { name: "Compras", link: "/compras" },
        { name: "Livros", link: "/livros" },
        { name: "Categorias", link: "/categorias"},
        { name: "Login", link: "/login" }
        
      ]
      
    };
  }
};
</script>

<style scoped>
.navbar {
  background-color: #333;
  padding: 10px;
}

.nav-links {
  list-style-type: none;
  display: flex;
  justify-content: center;
}

.nav-item {
  margin: 0 15px;
}

.nav-link {
  text-decoration: none;
  color: white;
  font-size: 18px;
  transition: color 0.3s;
}

.nav-link:hover {
  color: #ff6347;
}
</style>

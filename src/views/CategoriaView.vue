<script setup>
import { ref, reactive, onMounted } from "vue";
import { useCategoriaStore } from '@/stores/categoria'

const categoriaStore = useCategoriaStore()
const defaultCategoria = { id: null, descricao: "" };
const categoria = reactive({ ...defaultCategoria });

const limpar = () => { Object.assign(categoria, { ...defaultCategoria })}
const editar = (categoria_para_editar) => { Object.assign(categoria, categoria_para_editar)}

async function salvar() {
  await categoriaStore.salvarCategoria(categoria)
  limpar();
}

async function excluir(id) {
  categoriaStore.excluirCategoria(id)
  limpar();
}

onMounted(() => {
  categoriaStore.buscarTodasAsCategorias();
});

</script>

<template>
  <h1>Categoria</h1>
  <hr />
  <div class="form">
    <input type="text" v-model="categoria.descricao" placeholder="Descrição" />
    <button @click="salvar">Salvar</button>
    <button @click="limpar">Limpar</button>
  </div>
  <hr />
  <!-- {{ categoriaStore.categorias }}  -->
  <ul>
    <li v-for="categoria in categoriaStore.categorias" :key="categoria.id">
      <span @click="editar(categoria)">
        ({{ categoria.descricao }})
      </span>
      <button @click="excluir(categoria.id)">X</button>
    </li>
  </ul>
</template>

<style scoped>
/* Estilos gerais para o corpo da página */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f4f4f4;
}

/* Cabeçalho */
h1 {
  text-align: center;
  color: #333;
  margin-top: 20px;
  font-size: 2rem;
}

/* Estilo do formulário de entrada */
.form {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin: 20px;
}

.form input {
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  max-width: 300px; /* Tamanho máximo */
}

.form button {
  padding: 10px 15px;
  font-size: 1rem;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.form button:hover {
  background-color: #0056b3;
}

/* Estilo da lista de categorias */
ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

li {
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 10px;
  margin: 10px;
  width: 250px;
  padding: 15px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

li:hover {
  transform: scale(1.05);
}

li span {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
  color: #333;
  cursor: pointer;
}

li small {
  font-size: 0.9rem;
  color: #666;
  display: block;
}

li button {
  padding: 8px 12px;
  font-size: 0.9rem;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

li button:hover {
  background-color: #c82333;
}

hr {
  border: 1px solid #ccc;
  margin: 20px 0;
}

/* Estilo responsivo */
@media (max-width: 768px) {
  .form {
    flex-direction: column;
    align-items: center;
  }

  .form input {
    width: 100%;
    max-width: 300px;
  }

  .form button {
    width: 100%;
    max-width: 300px;
  }

  ul {
    flex-direction: column;
    align-items: center;
  }

  li {
    width: 90%;
    max-width: 400px;
  }
}
</style>


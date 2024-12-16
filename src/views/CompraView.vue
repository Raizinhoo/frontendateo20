<script setup>
import { ref, reactive, onMounted } from "vue";
import { useCompraStore } from '@/stores/compra'

const compraStore = new useCompraStore();
const defaultCompra = { id: null, status: 0, status_display: ""};
const compras = ref([]);
const compra = reactive({ ...defaultCompra });

const editar = (compra_para_editar) => {Object.assign(compra, compra_para_editar)}
const limpar = ()=> {Object.assign(compra, {...defaultCompra})}

async function salvar() {  
  await compraStore.salvarCompra(compra);
  limpar();
}

async function excluir(id) {
  await compraStore.excluirCompra(id);
  limpar();
}
  
onMounted(() => {
  compraStore.buscarTodasAsCompras();
});
</script>

<template>
  <h1>Compras</h1>
  <hr />
  <div class="form">
    <select v-model="compra.status"> 
      <option disabled value=""></option>
      <option value=1>Carrinho</option>
      <option value=2>Realizado</option>
      <option value=3>Pago</option>
      <option value=4>Entregue</option>
    </select>
    <button @click="salvar">Salvar</button>
    <button @click="limpar">Limpar</button>
  </div>
  <hr />
        {{compraStore.compras}}
  <ul>
    <li v-for="c in compraStore.compras" :key="c.id">
      <span @click="editar(c)">
        ({{ c.id }}) ({{c.usuario}}) - STATUS: {{ c.status_display }}
      </span>
      <button @click="excluir(compra.id)">X</button>
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

.form select {
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

/* Estilo da lista de compras */
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

  .form select {
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

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
/* Estilos para o título e layout principal */
h1 {
    font-family: Arial, sans-serif;
    font-size: 24px;
    color: #333;
    text-align: center;
    margin-bottom: 10px;
}

hr {
    border: 1px solid #ddd;
    margin: 20px 0;
}

.form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
}

/* Inputs e select */
select {
    width: 300px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    background-color: #f9f9f9;
}

button {
    padding: 10px 20px;
    font-size: 16px;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

button:hover {
    background-color: #0056b3;
}

button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

/* Lista de compras */
ul {
    list-style: none;
    padding: 0;
    margin: 0 auto;
    max-width: 600px;
}

li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
    font-family: Arial, sans-serif;
}

li span {
    cursor: pointer;
    color: #007bff;
    text-decoration: none;
    transition: color 0.3s;
}

li span:hover {
    color: #0056b3;
}

/* Botão de excluir */
li button {
    background-color: #dc3545;
    border-radius: 3px;
    padding: 5px 10px;
    font-size: 14px;
}

li button:hover {
    background-color: #c82333;
}

li span {
    cursor: pointer;
    color: #333; /* Cor preta, ou qualquer outra cor */
    text-decoration: none;
    transition: color 0.3s;
}

li span:hover {
    color: #555; /* Cor um pouco mais clara ou qualquer outra cor */
}

</style>
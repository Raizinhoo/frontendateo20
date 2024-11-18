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

<style></style>
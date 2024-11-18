<script setup>
import { ref, reactive, onMounted } from "vue";
import { useCompraStore } from '@/stores/compra'

const compraStore = new useCompraStore();
const defaultCompra = { id: null, status: "" };
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
      <option value="Carrinho">Carrinho</option>
      <option value="Realizado">Realizado</option>
      <option value="Pago">Pago</option>
      <option value="Entregue">Entregue</option>
    </select>
    <button @click="salvar">Salvar</button>
    <button @click="limpar">Limpar</button>
  </div>
  <hr />
        {{compraStore.compras}}
  <ul>
    <li v-for="compra in compraStore.compras" :key="compra.id">
      <span @click="editar(compra)">
        ({{ compra.id }}) ({{compra.usuario}}) - STATUS: {{ compra.status }}
      </span>
      <button @click="excluir(compra.id)">X</button>
    </li>
  </ul>
</template>

<style></style>
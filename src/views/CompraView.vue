<script setup>
import { ref, reactive, onMounted } from "vue";
import ComprasApi from "@/api/compras";

const comprasApi = new ComprasApi();
const defaultCompra = { id: null, itens: "" };
const compras = ref([]);
const compra = reactive({ ...defaultCompra });

onMounted(async () => {
  compras.value = await comprasApi.buscarTodasAsCompras();
});

function limpar() {
  Object.assign(compra, { ...defaultCompra });
}

async function salvar() {
  if (categoria.id) {
    await comprasApi.atualizarCompra(compra);
  } else {
    await comprasApi.adicionarCompra(compra);
  }
  compras.value = await comprasApi.buscarTodasAsCompras();
  limpar();
}

function editar(compra_para_editar) {
  Object.assign(compra, compra_para_editar);
}

async function excluir(id) {
  await comprasApi.excluirCompra(id);
  compras.value = await comprasApi.buscarTodasAsCompras();
  limpar();
}
</script>

<template>
  <h1>Compras</h1>
  <hr />
  <div class="form">
    <input type="text" v-model="compra.itens" placeholder="Descrição" />
    <button @click="salvar">Salvar</button>
    <button @click="limpar">Limpar</button>
  </div>
  <hr />
        {{compras}}
  <ul>
    <li v-for="compra in compras" :key="compra.id">
      <span @click="editar(compra)">
        ({{ compra.id }}) ({{compra.usuario}})
      </span>
      <button @click="excluir(compra.id)">X</button>
    </li>
  </ul>
</template>

<style></style>
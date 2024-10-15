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
  {{ categoriaStore.categorias }} 
  <ul>
    <li v-for="categoria in categoriaStore.categorias" :key="categoria.id">
      <span @click="editar(categoria)">
        ({{ categoria.descricao }})
      </span>
      <button @click="excluir(categoria.id)">X</button>
    </li>
  </ul>
</template>

<style></style>

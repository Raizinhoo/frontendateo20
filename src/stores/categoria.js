import {ref} from 'vue'
import { defineStore } from 'pinia'

import CategoriasApi from "@/api/categorias";
const categoriasApi = new CategoriasApi()

export const useCategoriaStore = defineStore('categoria', () =>{
  const categorias = ref([])

  async function buscarTodasAsCategorias() {
    categorias.value = await categoriasApi.buscarTodasAsCategorias();
  }

  async function excluirCategoria(id) {
    await categoriasApi.excluirCategoria(id);
    categorias.value = await categoriasApi.buscarTodasAsCategorias();
  }

  async function salvarCategoria(categoria) {
    if (categoria.id) {
      await categoriasApi.atualizarCategoria(categoria);
    } else {
      await categoriasApi.adicionarCategoria(categoria);
    }
    categorias.value = await categoriasApi.buscarTodasAsCategorias();
  }

  return { categorias, buscarTodasAsCategorias, excluirCategoria, salvarCategoria}

})

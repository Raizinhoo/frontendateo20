import { ref } from 'vue'
import { defineStore } from 'pinia'

import LivrosApi from '@/api/livros'
const livrosApi = new LivrosApi()

export const useLivroStore = defineStore('livro', () => {
  const livros = ref([])

  async function excluirLivro(id) {
    await livrosApi.excluirLivro(id)
    livros.value = await livrosApi.buscarTodosOsLivros()
  }

  async function salvarLivro(livro) {
    if (livro.id) {
      livro.categoria = livro.categoria.id
      await livrosApi.atualizarLivro(livro)
    } else {
      livro.categoria = livro.categoria.id  
      await livrosApi.adicionarLivro(livro)
    }
    livros.value = await livrosApi.buscarTodosOsLivros()
  }

  async function buscarTodosOsLivros() {
    livros.value = await livrosApi.buscarTodosOsLivros()
  }

  return { livros, buscarTodosOsLivros, salvarLivro, excluirLivro }
})

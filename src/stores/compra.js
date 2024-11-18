import { ref } from 'vue'
import { defineStore } from 'pinia'

import ComprasApi from '@/api/compras'
const comprasApi = new ComprasApi()

export const useCompraStore = defineStore('compra', () => {
  const compras = ref([])

  async function excluirCompra(id) {
    await comprasApi.excluirCompra(id)
    compras.value = await comprasApi.buscarTodasAsCompras()
  }

  async function salvarCompra(compra) {
    if (compra.id) {
      await comprasApi.atualizarCompra(compra)
    } else {
      await comprasApi.adicionarCompra(compra)
    }
    compras.value = await comprasApi.buscarTodasAsCompras()
  }

  async function buscarTodasAsCompras() {
    compras.value = await comprasApi.buscarTodasAsCompras()
  }

  return { compras, excluirCompra, salvarCompra, buscarTodasAsCompras }
})

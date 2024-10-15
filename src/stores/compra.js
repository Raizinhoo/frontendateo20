import {ref} from 'vue'
import { defineStore } from 'pinia'

import ComprasApi from "@/api/compras";
const ComprasApi = new ComprasApi()

export const useCompraStore = defineStore('categoria', () =>{
    const compras = ref ([])

    async function buscarTodasAsCompras() {
        compras.value = await comprasApi.buscarTodasAsCompras();
    }
})
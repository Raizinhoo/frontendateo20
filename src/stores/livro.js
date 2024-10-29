import { ref } from "vue"
import { defineStore } from "pinia"

import LivrosApi from "@/api/livros";
const livrosApi = new LivrosApi()

export const useLivroStore = defineStore('livro', ()=>{
    const livros = ref ([])

    async function buscarTodosOsLivros() {
        livros.value = await livrosApi.buscarTodosOsLivros();
    }

    return { livros, buscarTodosOsLivros}
        
})
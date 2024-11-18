<script setup>
import {ref, reactive, onMounted} from "vue";
import {useLivroStore} from '@/stores/livro'

const livroStore = useLivroStore()
const defaultLivro = {id: null, descricao: ""};
const livro = reactive({...defaultLivro});

const limpar = ()=> {Object.assign(livro, {...defaultLivro})}
const editar = (livro_para_editar) => {Object.assign(livro, livro_para_editar)}

async function salvar() {
    await livroStore.salvarLivro(livro)
    limpar();
}

async function excluir(id) {
    livroStore.excluirLivro(id)
    limpar();
}

onMounted(()=> {
    livroStore.buscarTodosOsLivros();
});
</script>

<template>
    <h1>Livro</h1>
    <hr />
    <div class="form">
        <input type="text" v-model="livro.titulo" placeholder="Titulo"/>
        <button @click="salvar">salvar</button>
        <button @click="limpar">limpar</button>
    </div>
    <hr />
    {{livroStore.livros}}

    <ul>
        <li v-for="livro in livroStore.livros" :key="livro.id">
            <span @click="editar(livro)">
                ({{livro.titulo}})
            </span>
            <button @click="excluir(livro.id)">excluir</button>
        </li>
    </ul>
</template>
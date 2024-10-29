import axios from "axios";
export default class LivrosApi {
  async buscarTodosOsLivros() {
    const { data } = await axios.get("/livros/");
    return data.results;
  }
  async adicionarLivro (livro) {
    const { data } = await axios.post("/livros/", livro);
    return data.results;
  }
  async atualizarLivro (livro) {
    const { data } = await axios.put(`/livros/${livro.id}/`, livro);
    return data.results;
  }
  async excluirLivro(id) {
    const { data } = await axios.delete(`/livros/${id}/`);
    return data.results;
  }
}

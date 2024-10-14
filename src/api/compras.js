import axios from "axios";
export default class ComprasApi {
  async buscarTodasAsCompras() {
    const { data } = await axios.get("/compras/");
    return data.results;
  }
  async adicionarCompra(compra) {
    const { data } = await axios.post("/compras/", compra);
    return data.results;
  }
  async atualizarCategoria(compra) {
    const { data } = await axios.put(`/compras/${compra.id}/`, compra);
    return data.results;
  }
  async excluirCategoria(id) {
    const { data } = await axios.delete(`/compras/${id}/`);
    return data.results;
  }
}

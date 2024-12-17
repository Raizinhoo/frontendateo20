import axios from "axios";
export default class ComprasApi {
  async buscarTodasAsCompras() {
    const { data } = await axios.get("/compras/");
    return data;
  }
  async adicionarCompra(compra) {
    const { data } = await axios.post("/compras/", compra);
    return data;
  }
  async atualizarCompra(compra) {    
    const { data } = await axios.put(`/compras/${compra.id}/`, compra);
    return data;
  }
  async excluirCompra(id) {
    const { data } = await axios.delete(`/compras/${id}/`);
    return data;
  }
}

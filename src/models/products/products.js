import axios from "axios";
import { toast } from "react-toastify";

export async function getAllProducts() {
  const options = {
    method: "GET",
    url: "https://estoque-api.herokuapp.com/products",
  };

  return axios
    .request(options)
    .then(function (response) {
      return response.data;
    })
    .catch((error) => {
      toast.error("Ops, deu algum erro");
    });
}

export async function registerProducts(
  name,
  manufacturer,
  quantity,
  validationDate,
  entryDate,
  description
) {
  const options = {
    method: "POST",
    url: "https://estoque-api.herokuapp.com/products",
    headers: { "Content-Type": "application/json" },
    data: {
      name,
      manufacturer,
      quantity,
      validationDate,
      entryDate,
      description,
    },
  };

  return axios
    .request(options)
    .then(function (response) {
      toast.success("Produto cadastrado com sucesso!");
      return response.data;
    })
    .catch(function (error) {
      toast.error("Ops, deu algum erro.");
    });
}

export async function deleteProducts(id) {
  const options = {
    method: "DELETE",
    url: `https://estoque-api.herokuapp.com/products/${id}`,
  };

  return axios
    .request(options)
    .then(function (response) {
      toast.success("Produto deletado com sucesso!");
      return response.data;
    })
    .catch(function (error) {
      toast.error("Ops, deu algum erro.");
    });
}

export async function updateProducts(
  id,
  name,
  manufacturer,
  quantity,
  validationDate,
  entryDate,
  description
) {
  const options = {
    method: "PUT",
    url: `https://estoque-api.herokuapp.com/products/${id}`,
    headers: { "Content-Type": "application/json" },
    data: {
      name,
      manufacturer,
      quantity,
      validationDate,
      entryDate,
      description,
    },
  };

  axios
    .request(options)
    .then(function (response) {
      toast.success("Produto editado com sucesso!");
      return response.data;
    })
    .catch(function (error) {
      toast.error("Ops, deu algum erro.");
    });
}

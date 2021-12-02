import { useState, useEffect } from "react";
import ProductsModel from "../../models/products/products.js";
import "./products.css";
import Title from "../../components/Title";
import { FiEdit2, FiMessageSquare, FiPlus, FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import Modal from "../../components/Modal";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const [detail, setDetail] = useState();

  useEffect(() => {
    async function ProductsList(){
      const data = await ProductsModel()
      updateState(data)
    }
    ProductsList()
  }, []);

  async function updateState(snapshot) {
    const isCollectionEmpty = snapshot.length === 0;

    if (!isCollectionEmpty) {
      let lista = [];
      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          description: doc.description,
          manufacturer: doc.manufacturer,
          quantity: doc.quantity,
          name: doc.name,
        });
      });
      setProducts((products) => [...products, ...lista]);
    } else {
      setIsEmpty(true);
    }
    setLoading(false);
    setLoadingMore(false)

  }

  function togglePostModal(item) {
    setShowPostModal(!showPostModal); // se esta true ele vai negar e vai mudar pra false (!)
    setDetail(item);
  }

  if (loading) {
    return (
      <div>
        <div className="content">
          <Title name="Produtos">
            <FiMessageSquare size={25} />
          </Title>
          <div className="container dashboard">
            <span>Buscando produtos...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="content">
        <Title name="Lista de Produtos">
          <FiMessageSquare size={25} />
        </Title>

        {products.length === 0 ? (
          <div className="container dashboard">
            <span>Nenhum produto registrado...</span>
            <Link to="/new" className="new">
              <FiPlus size={25} color="white" />
              Novo produto
            </Link>
          </div>
        ) : (
          <>
            <Link to="/new" className="new">
              <FiPlus size={25} color="white" />
              Novo produto
            </Link>

            <table>
              <thead>
                <tr>
                  <th scope="col">Produto</th>
                  <th scope="col">Tipo</th>
                  <th scope="col">Quantidade</th>
                  <th scope="col">...</th>
                </tr>
              </thead>
              <tbody>
                {products.map((item, index) => {
                  console.log("ITEMASDM", item)
                  return (
                    <tr key={index}>
                      <td data-label="Produto">{item.name}</td>
                      <td data-label="Descrição">{item.description}</td>
                      <td data-label="Quantidade">{item.quantity}
                        <span
                          className="badge"
                          style={{
                            backgroundColor:
                              item.quantity === "#000"
                          }}
                        >
                          {item.quantity}
                        </span>
                      </td>
                      <td data-label="#">
                        <button
                          className="action"
                          style={{ backgroundColor: "#3583f6" }}
                          onClick={() => togglePostModal(item)}
                        >
                          <FiSearch color="#fff" size={17} />
                        </button>
                        <Link
                          className="action"
                          style={{ backgroundColor: "#f6a935" }}
                          to={`/new/${item.id}`}
                        >
                          <FiEdit2 color="#fff" size={17} />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {loadingMore && (
              <h3 style={{ textAlign: "center", marginTop: 15 }}>
                Buscando produtos...               
              </h3>
            )}
          </>
        )}
      </div>
      {showPostModal && <Modal conteudo={detail} close={togglePostModal} />}
    </div>
  );
}

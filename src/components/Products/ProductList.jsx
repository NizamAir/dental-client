import { useEffect, useState } from "react";
import Product from "./Product";
import axios from "axios";
import "./ProductList.css";

export default function ProductList() {
  const [productList, setProductList] = useState([]);
  const [recordForEdit, setRecordForEdit] = useState(null);

  useEffect(() => {
    refreshEmployeeList();
  }, []);

  const productAPI = (url = "http://localhost:5288/api/products") => {
    return {
      fetchAll: () => axios.get(url),
      create: (newRecord) => axios.post(url, newRecord),
      update: (id, updatedRecord) => axios.put(`${url}/${id}`, updatedRecord),
      delete: (id) => axios.delete(`${url}/${id}`),
    };
  };

  function refreshEmployeeList() {
    productAPI()
      .fetchAll()
      .then((response) => {
        console.log(response.data);
        setProductList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const addOrEdit = (formData, onSuccess) => {
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    if (formData.get("Id") === "") {
      productAPI()
        .create(formData)
        .then((response) => {
          onSuccess(response.data);
          refreshEmployeeList();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      productAPI()
        .update(formData.get("Id"), formData)
        .then((response) => {
          onSuccess(response.data);
          refreshEmployeeList();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const showRecordDetails = (data) => {
    console.log("ShowRecordDetails", data);
    setRecordForEdit(data);
  };

  const onDelete = (e, id) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this product"))
      productAPI()
        .delete(id)
        .then((response) => {
          refreshEmployeeList();
        })
        .catch((error) => {
          console.log(error);
        });
  };

  const imageCard = (data) => {
    data.imageSrc = `http://localhost:5288/images/${data.imagePath}`;
    return (
      <div
        className="card"
        onClick={() => {
          showRecordDetails(data);
        }}
      >
        <img src={data.imageSrc} className="card-img-top " />
        <div className="card-body">
          <h5>{data.name}</h5>
          {/* <p>{data.description}</p> */}
          <h2>{`₽ ${Number(data.price).toFixed(2)}`}</h2> <br />
          <button
            className="btn btn-light delete-button"
            onClick={(e) => onDelete(e, data.id)}
          >
            <i className="far fa-trash-alt"></i>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="row">
        <div className="col-md-12">
          <div className="jumbotron jumbotron-fluid py-4">
            <div className="container text-center">
              <h1 className="display-4">Products</h1>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <Product addOrEdit={addOrEdit} recordForEdit={recordForEdit} />
        </div>
        <div className="col-md-8">
          <div>
            <table>
              <tbody>
                {[...Array(Math.ceil(productList.length / 3))].map(
                  (elem, index) => (
                    <tr key={index}>
                      <td>{imageCard(productList[3 * index])}</td>
                      <td>
                        {productList[3 * index + 1]
                          ? imageCard(productList[3 * index + 1])
                          : null}
                      </td>
                      <td>
                        {productList[3 * index + 2]
                          ? imageCard(productList[3 * index + 2])
                          : null}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

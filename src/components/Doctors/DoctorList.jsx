import { useEffect, useState } from "react";
import Doctor from "./Doctor";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { doctorAPI } from "../../services/DoctorService";

export default function DoctorList() {
  const [doctorList, setDoctorList] = useState([]);
  const [recordForEdit, setRecordForEdit] = useState(null);

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    refreshDoctorList();
  }, []);

  // const doctorAPI = (url = "/doctors") => {
  //   return {
  //     fetchAll: () => axiosPrivate.get(url),
  //     // create: (newRecord) => axios.post(url, newRecord),
  //     update: (id, updatedRecord) =>
  //       axiosPrivate.put(`${url}/${id}`, updatedRecord, {
  //         headers: { "Content-Type": "multipart/form-data" },
  //       }),
  //     delete: (id) => axiosPrivate.delete(`${url}/${id}`),
  //   };
  // };

  function refreshDoctorList() {
    doctorAPI(axiosPrivate)
      .fetchAll()
      .then((response) => {
        console.log(response.data);
        setDoctorList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const addOrEdit = (formData, onSuccess) => {
    const reqData = {};

    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
      reqData[pair[0]] = pair[1];
    }
    // console.log("JSON.stringify(formData)", JSON.stringify(formData));
    // console.log("reqData", reqData);
    // console.log("JSON.stringify(reqData)", JSON.stringify(reqData));
    doctorAPI(axiosPrivate)
      .update(formData.get("Id"), formData)
      .then((response) => {
        onSuccess(response.data);
        refreshDoctorList();
      })
      .catch((error) => {
        console.log(error);
      });
    // for (var pair of formData.entries()) {
    //   console.log(pair[0] + ", " + pair[1]);
    // }
    // if (formData.get("Id") === "") {
    //   productAPI()
    //     .create(formData)
    //     .then((response) => {
    //       onSuccess(response.data);
    //       refreshEmployeeList();
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // } else {
    //   productAPI()
    //     .update(formData.get("Id"), formData)
    //     .then((response) => {
    //       onSuccess(response.data);
    //       refreshEmployeeList();
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // }
  };

  const showRecordDetails = (data) => {
    console.log("ShowRecordDetails", data);
    setRecordForEdit(data);
  };

  const onDelete = (e, id) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this product"))
      doctorAPI(axiosPrivate)
        .delete(id)
        .then((response) => {
          refreshDoctorList();
        })
        .catch((error) => {
          console.log(error);
        });
  };

  const imageCard = (data) => {
    data.imageSrc = `http://localhost:5288/images/${data.imageName}`;

    return (
      <div
        className="card"
        onClick={() => {
          showRecordDetails(data);
        }}
      >
        <img src={data.imageSrc} className="card-img-top " />
        <div className="card-body">
          <h5>
            {data.firstName} {data.lastName}
          </h5>
          <p>{data.fatherName}</p>

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
              <h1 className="display-4">Doctors</h1>
            </div>
          </div>
        </div>
        <div className="mypage">
          <div className="col-md-4">
            <Doctor addOrEdit={addOrEdit} recordForEdit={recordForEdit} />
          </div>
          <div className="col-md-8">
            <div>
              <table>
                <tbody>
                  {[...Array(Math.ceil(doctorList.length / 3))].map(
                    (elem, index) => (
                      <tr key={index}>
                        <td>{imageCard(doctorList[3 * index])}</td>
                        <td>
                          {doctorList[3 * index + 1]
                            ? imageCard(doctorList[3 * index + 1])
                            : null}
                        </td>
                        <td>
                          {doctorList[3 * index + 2]
                            ? imageCard(doctorList[3 * index + 2])
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
    </div>
  );
}

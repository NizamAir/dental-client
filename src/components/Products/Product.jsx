import { useState, useEffect } from "react";

const defaultImageSrc = "/img/image_placeholder.png";

const initialFieldValues = {
  id: "",
  name: "",
  description: "",
  price: 0.0,
  imagePath: "",
  imageSrc: defaultImageSrc,
  ImageFile: null,
};

export default function Product({ addOrEdit, recordForEdit }) {
  const [values, setValues] = useState(initialFieldValues);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (recordForEdit !== null) {
      console.log("recordForEdit", recordForEdit);
      setValues(recordForEdit);
    }
  }, [recordForEdit]);

  const handleInputChange = (event) => {
    console.log(event.target.name, event.target.value);
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const showPreview = (event) => {
    if (event.target.files && event.target.files[0]) {
      let imageFile = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (x) => {
        setValues({
          ...values,
          ImageFile: imageFile,
          imageSrc: x.target.result,
        });
      };
      reader.readAsDataURL(imageFile);
    } else {
      setValues({
        ...values,
        ImageFile: null,
        imageSrc: defaultImageSrc,
      });
      console.log("else", values.ImageFile);
    }
  };

  const validate = () => {
    let temp = {};
    temp.name = values.name === "" ? false : true;
    temp.description = values.description === "" ? false : true;
    temp.price = values.price === 0.0 ? false : true;
    temp.imageSrc = values.imageSrc === defaultImageSrc ? false : true;
    setErrors(temp);
    return Object.values(temp).every((x) => x === true);
  };

  const resetForm = () => {
    setValues(initialFieldValues);
    document.getElementById("image-uploader").value = null;
    setErrors({});
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      const formData = new FormData();
      console.log("imageFile", values.ImageFile);
      formData.append("Id", values.id);
      formData.append("Name", values.name);
      formData.append("Description", values.description);
      formData.append("strPrice", values.price);
      formData.append("imagePath", values.imagePath);
      if (values.ImageFile === undefined) formData.append("ImageFile", null);
      else formData.append("ImageFile", values.ImageFile);

      addOrEdit(formData, resetForm);
    }
  };

  const applyErrorClass = (field) =>
    field in errors && errors[field] === false ? "invalid-field" : "";

  return (
    <>
      <div className="container text-center">
        <p className="lead">Product</p>
      </div>
      <form autoComplete="off" noValidate onSubmit={handleFormSubmit}>
        <div className="card">
          <img src={values.imageSrc} className="card-img-top" />
          <div className="card-body d-flex flex-column">
            <div className="form-group mb-3">
              <input
                type="file"
                accept="image/*"
                className={"form-control-file " + applyErrorClass("imageSrc")}
                onChange={showPreview}
                id="image-uploader"
              />
            </div>

            <div className="form-group mb-3">
              <input
                type="text"
                className={"form-control " + applyErrorClass("name")}
                placeholder="Product Name"
                name="name"
                value={values.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group mb-3">
              <input
                type="text"
                className={"form-control " + applyErrorClass("description")}
                placeholder="Product Description"
                name="description"
                value={values.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group mb-3">
              <input
                type="number"
                min={0}
                max={100000}
                step={0.01}
                className={"form-control " + applyErrorClass("price")}
                placeholder="Product Price"
                name="price"
                value={Number(values.price).toFixed(2)}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group text-center mb-3">
              <button type="submit" className="btn btn-light">
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

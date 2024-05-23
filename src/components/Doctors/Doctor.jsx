import { useState, useEffect } from "react";

const defaultImageSrc = "/img/image_placeholder.png";

const initialFieldValues = {
  id: "",
  firstName: "",
  lastName: "",
  fatherName: "",
  workExperience: 0,
  education: "",
  specialization: "",
  comment: "",
  imagePath: "",
  imageSrc: defaultImageSrc,
  ImageFile: null,
};

export default function Product({ addOrEdit, recordForEdit }) {
  const [values, setValues] = useState(initialFieldValues);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (recordForEdit !== null) {
      if (recordForEdit.fatherName === null) {
        recordForEdit.fatherName = "";
        recordForEdit.comment = "";
        recordForEdit.education = "";
        recordForEdit.specialization = "";
        recordForEdit.imageName = "";
      }

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
    temp.FirstName = values.firstName === "" ? false : true;
    temp.LastName = values.LastName === "" ? false : true;
    temp.FatherName = values.FatherName === "" ? false : true;
    temp.WorkExperience = values.WorkExperience === 0 ? false : true;
    temp.Education = values.Education === "" ? false : true;
    temp.Specialization = values.Specialization === "" ? false : true;
    temp.Comment = values.Comment === "" ? false : true;
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
      console.log("imageName", values.imagePath);
      formData.append("Id", values.id);
      formData.append("FirstName", values.firstName);
      formData.append("LastName", values.lastName);
      formData.append("FatherName", values.fatherName);
      formData.append("WorkExperience", values.workExperience);
      formData.append("Education", values.education);
      formData.append("Specialization", values.specialization);
      formData.append("Comment", values.comment);
      formData.append("ImageName", values.imagePath);
      if (values.ImageFile === undefined) formData.append("ImageFile", null);
      else formData.append("ImageFile", values.ImageFile);

      console.log("imageFile2", formData.get("ImageFile"));
      console.log("imageName2", formData.get("imageName"));
      addOrEdit(formData, resetForm);
    }
  };

  const applyErrorClass = (field) =>
    field in errors && errors[field] === false ? "invalid-field" : "";

  return (
    <>
      <div className="container text-center">
        <p className="lead">Doctor</p>
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
                className={"form-control " + applyErrorClass("firstName")}
                placeholder="First Name"
                name="firstName"
                value={values.firstName}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group mb-3">
              <input
                type="text"
                className={"form-control " + applyErrorClass("lastName")}
                placeholder="Last Name"
                name="lastName"
                value={values.lastName}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group mb-3">
              <input
                type="text"
                className={"form-control " + applyErrorClass("fatherName")}
                placeholder="Father Name"
                name="fatherName"
                value={values.fatherName}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group mb-3">
              <input
                type="number"
                min={1}
                max={50}
                className={"form-control " + applyErrorClass("workExperience")}
                placeholder="Work WorkExperience"
                name="workExperience"
                value={values.workExperience}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group mb-3">
              <input
                type="text"
                className={"form-control " + applyErrorClass("education")}
                placeholder="Education"
                name="education"
                value={values.education}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group mb-3">
              <input
                type="text"
                className={"form-control " + applyErrorClass("specialization")}
                placeholder="Specialization"
                name="specialization"
                value={values.specialization}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group mb-3">
              <input
                type="text"
                className={"form-control " + applyErrorClass("comment")}
                placeholder="Comment"
                name="comment"
                value={values.comment}
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

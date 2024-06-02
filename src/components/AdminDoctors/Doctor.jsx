import { useState, useEffect } from "react";

import style from "./style.module.scss";

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

export default function Doctor({ addOrEdit, recordForEdit }) {
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
    temp.LastName = values.lastName === "" ? false : true;
    temp.FatherName = values.fatherName === "" ? false : true;
    temp.WorkExperience = values.workExperience === 0 ? false : true;
    temp.Education = values.education === "" ? false : true;
    temp.Specialization = values.specialization === "" ? false : true;
    temp.Comment = values.comment === "" ? false : true;
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
      <form
        autoComplete="off"
        className={style.form}
        noValidate
        onSubmit={handleFormSubmit}
      >
        <div className={style.form__items}>
          <img src={values.imageSrc} className={style.form__items__img_top} />
          <div className={style.custom_file_upload}>
            <input
              type="file"
              accept="image/*"
              className={"form-control-file " + applyErrorClass("imageSrc")}
              onChange={showPreview}
              id="image-uploader"
            />
          </div>

          <div>
            <label>
              Имя
              <input
                type="text"
                className={"form-control " + applyErrorClass("firstName")}
                name="firstName"
                value={values.firstName}
                onChange={handleInputChange}
              />
            </label>
          </div>

          <div>
            <label>
              Фамилия
              <input
                type="text"
                className={"form-control " + applyErrorClass("lastName")}
                name="lastName"
                value={values.lastName}
                onChange={handleInputChange}
              />
            </label>
          </div>

          <div>
            <label>
              Отчество
              <input
                type="text"
                className={"form-control " + applyErrorClass("fatherName")}
                name="fatherName"
                value={values.fatherName}
                onChange={handleInputChange}
              />
            </label>
          </div>

          <div>
            <label>
              Стаж
              <input
                type="number"
                min={1}
                max={50}
                className={"form-control " + applyErrorClass("workExperience")}
                name="workExperience"
                value={values.workExperience}
                onChange={handleInputChange}
              />
            </label>
          </div>

          <div>
            <label>
              Образование
              <input
                type="text"
                className={"form-control " + applyErrorClass("education")}
                name="education"
                value={values.education}
                onChange={handleInputChange}
              />
            </label>
          </div>

          <div>
            <label>
              Специальность
              <input
                type="text"
                className={"form-control " + applyErrorClass("specialization")}
                name="specialization"
                value={values.specialization}
                onChange={handleInputChange}
              />
            </label>
          </div>

          <div>
            <label>
              О себе
              <textarea
                cols="25"
                rows="5"
                type="text"
                className={"form-control " + applyErrorClass("comment")}
                name="comment"
                value={values.comment}
                onChange={handleInputChange}
              />
            </label>
          </div>

          <button className={style.form__items_btn} type="submit">
            Изменить
          </button>
        </div>
      </form>
    </>
  );
}

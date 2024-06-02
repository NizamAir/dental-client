export const adminAPI = (axiosPrivate, url = "/userslist") => {
  return {
    fetchDoctorsShifts: () => axiosPrivate.get(url + "/doctors"),
    fetchProductsShifts: () => axiosPrivate.get(url + "/products"),
    fetchDoctorList: () => axiosPrivate.get(url + "/doctorslist"),
    fetchDoctorRates: () => axiosPrivate.get(url + "/rating"),
  };
};

export const reviewAPI = (axiosPrivate, url = "/reviews") => {
  return {
    fetchAll: () => axiosPrivate.get(url),
    fetchOne: (id) => axiosPrivate.get(`${url}/${id}`),
    fetchByShiftId: (shiftId) => axiosPrivate.get(`${url}/shift/${shiftId}`),
    create: (newRecord) => axiosPrivate.post(url, newRecord),
    delete: (id) => axiosPrivate.delete(`${url}/${id}`),
  };
};

export const clientShiftsAPI = (axiosPrivate, url = "/clientshifts") => {
  return {
    fetchDoctors: () => axiosPrivate.get(url + "/doctors"),
    fetchProducts: () => axiosPrivate.get(url + "/products"),
    fetchDoctorDates: (doctorId) =>
      axiosPrivate.get(`${url}/doctordates/${doctorId}`),
    fetchTimesForDay: (newRecord) =>
      axiosPrivate.post(url + "/times", newRecord),
    create: (newRecord) => axiosPrivate.post(url, newRecord),
    // fetchAssistantDates: () => axiosPrivate.get(url + "/dates"),
    // create: (newRecord) => axiosPrivate.post(url, newRecord),
    // fetchAll: () => axiosPrivate.get(url),
    // fetchDates: () => axiosPrivate.get(url + "/dates"),
    // update: (id, updatedRecord) =>
    //   axiosPrivate.put(`${url}/${id}`, updatedRecord, {
    //     headers: { "Content-Type": "multipart/form-data" },
    //   }),
    // delete: (id) => axiosPrivate.delete(`${url}/${id}`),
  };
};

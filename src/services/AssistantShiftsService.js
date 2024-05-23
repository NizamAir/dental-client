export const assistantShiftsAPI = (axiosPrivate, url = "/assistantshifts") => {
  return {
    fetchDoctors: () => axiosPrivate.get(url + "/doctors"),
    fetchDoctorDates: (doctorId) =>
      axiosPrivate.get(`${url}/doctordates/${doctorId}`),
    fetchAssistantDates: () => axiosPrivate.get(url + "/dates"),
    create: (newRecord) => axiosPrivate.post(url, newRecord),
    // fetchAll: () => axiosPrivate.get(url),
    // fetchDates: () => axiosPrivate.get(url + "/dates"),
    // update: (id, updatedRecord) =>
    //   axiosPrivate.put(`${url}/${id}`, updatedRecord, {
    //     headers: { "Content-Type": "multipart/form-data" },
    //   }),
    // delete: (id) => axiosPrivate.delete(`${url}/${id}`),
  };
};

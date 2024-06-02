export const doctorShiftsAPI = (axiosPrivate, url = "/doctorshifts") => {
  return {
    fetchAll: () => axiosPrivate.get(url),
    fetchShifts: () => axiosPrivate.get(url + "/shifts"),
    fetchDates: () => axiosPrivate.get(url + "/dates"),
    fetchReviews: () => axiosPrivate.get(url + "/reviews"),
    fetchClients: (newRecord) => axiosPrivate.post(url + "/clients", newRecord),
    create: (newRecord) => axiosPrivate.post(url, newRecord),
    update: (id, updatedRecord) =>
      axiosPrivate.put(`${url}/${id}`, updatedRecord, {
        headers: { "Content-Type": "multipart/form-data" },
      }),
    delete: (newRecord) => axiosPrivate.post(url + "/delete", newRecord),
  };
};

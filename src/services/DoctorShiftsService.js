export const doctorShiftsAPI = (axiosPrivate, url = "/doctorshifts") => {
  return {
    fetchAll: () => axiosPrivate.get(url),
    fetchDates: () => axiosPrivate.get(url + "/dates"),
    create: (newRecord) => axiosPrivate.post(url, newRecord),
    update: (id, updatedRecord) =>
      axiosPrivate.put(`${url}/${id}`, updatedRecord, {
        headers: { "Content-Type": "multipart/form-data" },
      }),
    delete: (id) => axiosPrivate.delete(`${url}/${id}`),
  };
};

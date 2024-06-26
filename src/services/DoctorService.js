export const doctorAPI = (axiosPrivate, url = "/doctors") => {
  return {
    fetchAll: () => axiosPrivate.get(url),
    fetchAllForAdmin: () => axiosPrivate.get(url + "/admin"),
    // create: (newRecord) => axios.post(url, newRecord),
    update: (id, updatedRecord) =>
      axiosPrivate.put(`${url}/${id}`, updatedRecord, {
        headers: { "Content-Type": "multipart/form-data" },
      }),
    delete: (id) => axiosPrivate.delete(`${url}/${id}`),
  };
};

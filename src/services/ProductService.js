export const productAPI = (axiosPrivate, url = "/products") => {
  return {
    fetchAll: () => axiosPrivate.get(url),
    create: (newRecord) =>
      axiosPrivate.post(url, newRecord, {
        headers: { "Content-Type": "multipart/form-data" },
      }),
    update: (id, updatedRecord) =>
      axiosPrivate.put(`${url}/${id}`, updatedRecord, {
        headers: { "Content-Type": "multipart/form-data" },
      }),
    delete: (id) => axiosPrivate.delete(`${url}/${id}`),
  };
};

export const assistantShiftsAPI = (axiosPrivate, url = "/assistantshifts") => {
  return {
    fetchShifts: () => axiosPrivate.get(url),
    fetchDoctors: () => axiosPrivate.get(url + "/doctors"),
    fetchDoctorDates: (doctorId) =>
      axiosPrivate.get(`${url}/doctordates/${doctorId}`),
    fetchAssistantDates: () => axiosPrivate.get(url + "/dates"),
    create: (newRecord) => axiosPrivate.post(url, newRecord),
    delete: (newRecord) => axiosPrivate.post(url + "/delete", newRecord),
  };
};

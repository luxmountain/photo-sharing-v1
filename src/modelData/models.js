import fetchModel from "../lib/fetchModelData";

const models = {
  userListModel: async () => await fetchModel("/user/list"),
  userModel: async (userId) => await fetchModel(`/user/${userId}`),
  photoOfUserModel: async (userId) => await fetchModel(`/photo/${userId}`)
};

export default models;

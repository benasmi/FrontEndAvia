import RequestType from '../Networking/NetworkLayerCentral'

const getUsers = () => RequestType.getRequest("/users/all");
const insertUsers = (data) => RequestType.postRequest("/users/insert", data);
const updateUsers = (data) => RequestType.postRequest("/users/update", data);
const removeUsers = (data) => RequestType.postRequest("/users/remove", data);

const UsersAPI = {getUsers, insertUsers, updateUsers, removeUsers};

export default UsersAPI;
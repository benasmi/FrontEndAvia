import RequestType from '../Networking/NetworkLayerCentral'

//Users
const getUsers = () => RequestType.getRequest("/users/all");
const insertUsers = (data) => RequestType.postRequest("/users/insert", data);
const updateUsers = (data) => RequestType.postRequest("/users/update", data);
const removeUsers = (data) => RequestType.postRequest("/users/remove", data);
const UsersAPI = {getUsers, insertUsers, updateUsers, removeUsers};

//CardsProviders
const getCardsProviders = () => RequestType.getRequest("/cardprovider/all");
const CardsProviderAPI = {getCardsProviders};

//Countries
const getCountries = () => RequestType.getRequest("/country/all");
const CountryAPI ={getCountries};

//Cards
const insertCardsWithUser = (data) => RequestType.postRequest("/cards/insert", data);
const CardsAPI ={insertCardsWithUser};

const API = {UsersAPI, CardsProviderAPI, CountryAPI, CardsAPI};

export default API


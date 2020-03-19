import RequestType from '../Networking/NetworkLayerCentral'

//Users
const getUsers = () => RequestType.getRequest("/users/all");
const insertUsers = (data) => RequestType.postRequest("/users/insert", data);
const updateUsers = (data) => RequestType.postRequest("/users/update", data);
const removeUsers = (data) => RequestType.postRequest("/users/delete", data);
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

//Currency
const getCurencies = () => RequestType.getRequest("/currency/all");
const CurrencyAPI ={getCurencies};

//City
const getCities = () => RequestType.getRequest("/city/all");
const insertCities = (data) => RequestType.postRequest("/city/insert", data);
const updateCities = (data) => RequestType.postRequest("/city/update", data);
const deleteCities = (data) => RequestType.postRequest("/city/delete", data);
const CityAPI = {getCities, insertCities, updateCities,deleteCities};

//TimeZones
const getTimeZones = () => RequestType.getRequest("/timezone/all")
const TimeZoneAPI = {getTimeZones};

const API = {UsersAPI, CardsProviderAPI, CountryAPI, CardsAPI, CurrencyAPI, CityAPI, TimeZoneAPI};

export default API


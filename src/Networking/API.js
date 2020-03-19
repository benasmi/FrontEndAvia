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
const updateCountry = () => RequestType.postRequest("/country/update");
const deleteCountry = () => RequestType.postRequest("/country/delete");
const CountryAPI ={getCountries, updateCountry, deleteCountry};

//Cards
const insertCardsWithUser = (data) => RequestType.postRequest("/cards/insert", data);
const CardsAPI ={insertCardsWithUser};

//Currency
const getCurencies = () => RequestType.getRequest("/currency/all");
const updateCurrency = () => RequestType.postRequest("/currency/update");
const deleteCurrency = () => RequestType.postRequest("/currency/delete");
const CurrencyAPI ={getCurencies, updateCurrency, deleteCurrency};

//City
const getCities = () => RequestType.getRequest("/city/all");
const insertCities = (data) => RequestType.postRequest("/city/insert", data);
const updateCities = (data) => RequestType.postRequest("/city/update", data);
const deleteCities = (data) => RequestType.postRequest("/city/delete", data);
const CityAPI = {getCities, insertCities, updateCities,deleteCities};

//TimeZones
const getTimeZones = () => RequestType.getRequest("/timezone/all")
const updateTimeZones = () => RequestType.postRequest("/timezone/update");
const deleteTimeZones = () => RequestType.postRequest("/timezone/delete");

const TimeZoneAPI = {getTimeZones, updateTimeZones,deleteTimeZones};

//Suggestions
const getSuggestions = () => RequestType.getRequest("/suggestion/all")
const updateSuggestion = () => RequestType.postRequest("/suggestion/update");
const deleteSuggestion = () => RequestType.postRequest("/suggestion/delete");
const SuggestionAPI = {getSuggestions,updateSuggestion,deleteSuggestion}

const API = {UsersAPI, CardsProviderAPI, CountryAPI, CardsAPI, CurrencyAPI, CityAPI, TimeZoneAPI, SuggestionAPI};

export default API


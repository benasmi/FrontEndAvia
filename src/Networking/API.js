import RequestType from '../Networking/NetworkLayerCentral'

//Users
const getUsers = () => RequestType.getRequest("/users/all");
const insertUsers = (data) => RequestType.postRequest("/users/insert", data);
const updateUsers = (data) => RequestType.postRequest("/users/update", data);
const updateUsersWithCards = (data) => RequestType.postRequest("/users/updatewithcards", data);
const removeUsers = (data) => RequestType.postRequest("/users/delete", data);
const UsersAPI = {getUsers, insertUsers, updateUsers, removeUsers, updateUsersWithCards};

//CardsProviders
const getCardsProviders = () => RequestType.getRequest("/cardprovider/all");
const CardsProviderAPI = {getCardsProviders};

//Countries
const getCountries = () => RequestType.getRequest("/country/all");
const updateCountry = (data) => RequestType.postRequest("/country/update", data);
const deleteCountry = (data) => RequestType.postRequest("/country/delete", data);
const CountryAPI ={getCountries, updateCountry, deleteCountry};

//Cards
const insertCardsWithUser = (data) => RequestType.postRequest("/cards/insert", data);
const getAllCards = () => RequestType.getRequest("/cards/all");
const getCardsByUser = (data) =>RequestType.postRequest("cards/usercards",data);
const removeCard = (data) => RequestType.postRequest("/cards/remove",data);
const getCardsByReservation = (data) => RequestType.postRequest("/cards/byreservation",data);
const CardsAPI ={insertCardsWithUser, getAllCards, removeCard, getCardsByReservation, getCardsByUser};

//Currency
const getCurencies = () => RequestType.getRequest("/currency/all");
const updateCurrency = (data) => RequestType.postRequest("/currency/update", data);
const deleteCurrency = (data) => RequestType.postRequest("/currency/delete", data);
const CurrencyAPI ={getCurencies, updateCurrency, deleteCurrency};

//City
const getCities = () => RequestType.getRequest("/city/all");
const insertCities = (data) => RequestType.postRequest("/city/insert", data);
const updateCities = (data) => RequestType.postRequest("/city/update", data);
const deleteCities = (data) => RequestType.postRequest("/city/delete", data);
const insertCityWithSugs = (data) => RequestType.postRequest("/city/citywithsugs", data);
const CityAPI = {getCities, insertCities, updateCities,deleteCities, insertCityWithSugs};

//TimeZones
const getTimeZones = () => RequestType.getRequest("/timezone/all");
const updateTimeZones = (data) => RequestType.postRequest("/timezone/update", data);
const deleteTimeZones = (data) => RequestType.postRequest("/timezone/delete", data);

const TimeZoneAPI = {getTimeZones, updateTimeZones,deleteTimeZones};

//Suggestions
const getSuggestions = () => RequestType.getRequest("/suggestion/all");
const updateSuggestion = (data) => RequestType.postRequest("/suggestion/update", data);
const deleteSuggestion = (data) => RequestType.postRequest("/suggestion/delete", data);
const SuggestionAPI = {getSuggestions,updateSuggestion,deleteSuggestion};

//Stats
const getFlightStats = (data) => RequestType.postRequest("/stats/flights",data);
const StatsAPI = {getFlightStats};

//Payments
const getPaymentsByReservation = (data) => RequestType.postRequest("/payments/byreservation", data);
const PaymentsAPI = {getPaymentsByReservation};

const API = {UsersAPI, CardsProviderAPI, CountryAPI, CardsAPI, CurrencyAPI, CityAPI, TimeZoneAPI, SuggestionAPI, StatsAPI, PaymentsAPI};

export default API


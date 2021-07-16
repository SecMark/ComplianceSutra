import api from '../../../apiServices';

const getCountryCodeList = (payload) => api.post('/api/Loginsuccess', payload);
export default {
    getCountryCodeList
};
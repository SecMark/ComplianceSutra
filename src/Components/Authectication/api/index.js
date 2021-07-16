import api from '../../../apiServices';

const loginAccount = (payload) => api.post('/api/Loginsuccess', payload);
const updatePassword = (payload) => api.post('api/UpdatePassword', payload);
export default {
    loginAccount,
    updatePassword
};
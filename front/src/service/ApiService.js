import axios from 'axios';

const USER_API_BASE_URL = 'http://192.168.56.1:8080/customers';

class ApiService {

    fetchUsers() {
        return axios.get(USER_API_BASE_URL);
    }

    fetchUserById(userId) {
        return axios.get(USER_API_BASE_URL + '/' + userId);
    }

    deleteUser(userId) {
        return axios.delete(USER_API_BASE_URL + '/' + userId);
    }

    addCustomer(customer) {
        return axios.post(USER_API_BASE_URL, customer);
    }

    editUser(id, customer) {
        return axios.put(USER_API_BASE_URL + '/' + id, customer);
    }

}

export default new ApiService();
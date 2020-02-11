import axios from 'axios';

const CUSTOMERS_URL = 'http://192.168.56.1:8080/customers';
let getAddressesUrl = customerId => {
    return CUSTOMERS_URL + '/' + customerId + '/addresses';
}

class ApiService {

    fetchCustomers() {
        return axios.get(CUSTOMERS_URL);
    }

    fetchCustomerById(id) {
        return axios.get(CUSTOMERS_URL + '/' + id);
    }

    deleteCustomer(id) {
        return axios.delete(CUSTOMERS_URL + '/' + id);
    }

    addCustomer(customer) {
        return axios.post(CUSTOMERS_URL, customer);
    }

    editCustomer(id, address) {
        return axios.put(CUSTOMERS_URL + '/' + id, address);
    }

    addAddress(customerId, address) {
        return axios.post(getAddressesUrl(customerId), address);
    }

    fetchAddresses(customerId) {
        return axios.get(getAddressesUrl(customerId));
    }

    deleteAddress(customerId, addressId) {
        return axios.delete(getAddressesUrl(customerId) + '/' + addressId);
    }

    editAddress(customerId, addressId, newData) {
        return axios.put(getAddressesUrl(customerId) + '/' + addressId, newData);
    }
}

export default new ApiService();
import axios from 'axios';

const baseURL = '/api/persons';

const getAll = function () {
    return (
        axios
            .get(baseURL)
            .then(response => response.data)
    );
};

const addEntry = function (newPerson) {
    return (
        axios
            .post(baseURL, newPerson)
            .then(response => response.data)
    );
};

const deleteEntry = function (id) {
    const targetURL = `${baseURL}/${id}`;
    return (
        axios
            .delete(targetURL)
            .then(response => console.log(response.data))
    );
};


// eslint-disable-next-line
export default {getAll, addEntry, deleteEntry};
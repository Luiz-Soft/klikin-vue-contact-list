import axios from 'axios';
import contacts from "@/assets/contacts.json";


//---------------------------------------------------------only for testing purporses
// Mock the GET request to the contacts API to return the mocked contacts from the json
import MockAdapter from 'axios-mock-adapter';
const mock = new MockAdapter(axios);
mock.onGet('/api/contacts').reply(200, contacts);
//---------------------------------------------------------


export const getContacts = async () => {
  try {
    const response = await axios.get('/api/contacts');
    return response.data;
  } catch (error) {
    console.log('Error fetching contacts:', error);
    throw error;
  }
};
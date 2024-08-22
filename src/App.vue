<template>
  <div id="app" data-app="true">
    <ContactList 
      :contacts="contactsSortedByLastname" 
      @add-contact="addContact"
      @update-contact="updateContact"
      @delete-contact="deleteContact"
    />
  </div>
</template>

<script>
import ContactList from "@/components/ContactList";
import { getContacts } from "@/services/contactsService";

export default {
  name: "App",
  components: {
    ContactList
  },
  data() {
    return {
      contacts: []
    };
  },
  created() {
    this.fetchContacts();
  },
  computed: {
    contactsSortedByLastname() {
      return this.contacts.slice().sort((a, b) => {
        return a.lastname.localeCompare(b.lastname);
      });
    }
  },
  methods: {
    async fetchContacts() {
      try {
        this.contacts = await getContacts();
      } catch (error) {
        console.error('Failed to fetch contacts:', error);
      }
    },
    addContact(newContact) {
      this.contacts.push(newContact);
    },
    updateContact({ index, contact }) {
      this.$set(this.contacts, index, contact);
    },
    deleteContact({ index }) {
      this.contacts.splice(index, 1);
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

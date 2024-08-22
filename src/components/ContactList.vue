<template>
  <div>
    <div class="search-add-container">
      <input 
        id="search-contact" 
        v-model="searchQuery"
        type="text" 
        placeholder="Search contact..." 
        autofocus 
      >
      <v-btn
        color="primary"
        dark
        rounded
        @click="showCreateContactModal = true"
      >
        <v-icon left>
          mdi-plus
        </v-icon>         Add Contact
      </v-btn>
    </div>
    <div id="contacts-container">
      <Contact 
        v-for="contact in filteredContacts"
        :key="contact.id"
        :contact="contact"
        @update-contact="updateContact"
        @delete-contact="deleteContact"
      />
    </div>
    <CreateContactModal
      :dialog="showCreateContactModal"
      @close="showCreateContactModal = false"
      @add-contact="addContact"
    />
  </div>
</template>

<script>
import Contact from './Contact.vue'; 
import CreateContactModal from './CreateContactModal.vue';

export default {
  name: "ContactList",
  components: {
    Contact,
    CreateContactModal,  
  },
  props: {
    contacts: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      searchQuery: "",
      showCreateContactModal: false,
    };
  },
  computed: {
    filteredContacts() {
      return this.contacts.filter(contact => {
        const searchTerm = this.searchQuery.toLowerCase();
        return (
          contact.firstname.toLowerCase().includes(searchTerm) ||
          contact.lastname.toLowerCase().includes(searchTerm) ||
          contact.phoneNumber.some(phone => phone.includes(searchTerm)) ||
          contact.email.some(email => email.toLowerCase().includes(searchTerm))
        );
      });
    },
  
  },
  methods: {
    addContact(newContact) {
      this.$emit('add-contact', newContact);
    },
    updateContact(updatedContact) {
      const contactIndex = this.contacts.findIndex(c => c.id === updatedContact.id);
      if (contactIndex !== -1) {
        this.$emit('update-contact', { index: contactIndex, contact: updatedContact });
      }
    },
    deleteContact(contactToDelete) {
      const contactIndex = this.contacts.findIndex(c => c.id === contactToDelete.id);
      if (contactIndex !== -1) {
        this.$emit('delete-contact', { index: contactIndex, contact: contactToDelete });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  $primary-color: #007bff;
  html, body {
    overflow-x: hidden; 
    width: 100%;
  }

  .search-add-container {
    display: flex;
    justify-content: center; 
    align-items: center;
    gap: 10px; 
    margin-bottom: 20px;
    padding: 0 15px;

    @media (max-width: 600px) { 
      flex-direction: column;
      gap: 15px;
      padding: 0 10px;
    }
  }

  #search-contact {
    width: 300px;
    padding: 10px 15px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    transition: border-color 0.3s ease;

    &:focus {
      outline: none;
      border-color: $primary-color;
    }

    &::placeholder {
      color: #aaa;
      font-style: italic;
    }

    @media (max-width: 600px) { 
      width: 100%; 
      max-width: 70%; 
      padding: 8px 12px;
    }
  }

  #contacts-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 15px;
  }
</style>
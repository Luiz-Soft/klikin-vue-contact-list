<template>
  <v-card 
    elevation="3"
    width="40%"
    class="custom-card"
  >
    <v-card-title class="custom-title">
      {{ editedContact.lastname.toUpperCase() }} {{ editedContact.firstname }} 
    </v-card-title>
    <v-card-text>
      <v-form ref="form">
        <v-text-field
          v-model="editedContact.firstname"
          label="First Name"
          :readonly="!isEditing"
          dense
          outlined
          class="custom-input-field"
        />
        <v-text-field
          v-model="editedContact.lastname"
          label="Last Name"
          outlined
          :readonly="!isEditing"
          dense
          class="custom-input-field"
        />

        <div
          v-for="(phone, index) in editedContact.phoneNumber"
          :key="'phone-' + index"
          class="custom-input-field"
        >
          <v-row
            no-gutters
            align="center"
          >
            <v-col>
              <v-text-field
                :value="phone"
                label="Phone Number"
                outlined
                :readonly="!isEditing"
                dense
                class="custom-input-field"
                :rules="[phoneRule]"
                @input="updatePhoneNumber(index, $event)"
              />
            </v-col>

            <v-col cols="auto">
              <v-btn
                v-if="isEditing"
                icon
                @click="removePhoneNumber(index)"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </div>

        <div
          v-for="(email, index) in editedContact.email"
          :key="'email-' + index"
          class="custom-input-field"
        >
          <v-row
            no-gutters
            align="center"
            justify="space-between" 
          >
            <v-col>
              <v-text-field
                :value="email"
                label="Email"
                outlined
                :readonly="!isEditing"
                dense
                class="custom-input-field"
                :rules="[emailRule]"
                @input="updateEmail(index, $event)"
              />
            </v-col>
            <v-col cols="auto">
              <v-btn
                v-if="isEditing"
                icon
                @click="removeEmail(index)"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </div>
        <v-row
          justify="center"
          class="custom-row add-buttons-row"
        >
          <v-btn
            v-if="isEditing"
            class="custom-button"
            rounded
            dark
            @click="addPhoneNumber"
          >
            <v-icon left>
              mdi-plus
            </v-icon> Add Phone
          </v-btn>

          <v-btn
            v-if="isEditing"
            class="custom-button"
            dark
            rounded
            @click="addEmail"
          >
            <v-icon left>
              mdi-plus
            </v-icon> Add Email
          </v-btn>
        </v-row>
        <v-row
          justify="space-between"
          class="custom-row"
        >
          <v-btn
            v-if="!isEditing"
            icon
            @click="toggleEdit"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn
            v-if="!isEditing"
            icon
            @click="deleteContact"
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-row>
      </v-form>
    </v-card-text>
    <v-card-actions v-if="isEditing">
      <v-spacer />
      <v-btn
        color="blue darken-1"
        text
        @click="cancelEdit"
      >
        Cancel
      </v-btn>
      <v-btn
        color="blue darken-1"
        text
        @click="saveContact"
      >
        Save
      </v-btn>
    </v-card-actions>
  </v-card>
</template>



<script>
export default {
  name: "Contact",
  props: {
    contact: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isEditing: false,
      editedContact: JSON.parse(JSON.stringify(this.contact)), // Create a deep copy of the contact
      emailRule: (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      phoneRule: (v) => /^[0-9]*$/.test(v) || 'Phone number must be valid',
    };
  },
  watch: {
    contact(newContact) {
      this.editedContact = JSON.parse(JSON.stringify(newContact)); // Reset the edited contact when the prop changes
    },
  },
  methods: {
    toggleEdit() {
      this.isEditing = true;
    },
    saveContact() {
      if (this.$refs.form.validate()) {
        this.isEditing = false;
        this.$emit("update-contact", this.editedContact);
      }
    },
    cancelEdit() {
      this.isEditing = false;
      this.editedContact = JSON.parse(JSON.stringify(this.contact)); // Reset the edited contact to the original data
    },
    deleteContact() {
      this.$emit("delete-contact", this.editedContact);
    },
    addPhoneNumber() {
      this.editedContact.phoneNumber.push('');
    },
    removePhoneNumber(index) {
      this.editedContact.phoneNumber.splice(index, 1);
    },
    updatePhoneNumber(index, value) {
      this.$set(this.editedContact.phoneNumber, index, value);
    },
    addEmail() {
      this.editedContact.email.push('');
    },
    removeEmail(index) {
      this.editedContact.email.splice(index, 1);
    },
    updateEmail(index, value) {
      this.$set(this.editedContact.email, index, value);
    },
  },
};
</script>

<style>
.custom-card {
  padding: 16px;
  margin-bottom: 16px;
  margin: 10px;
  min-width: 300px;
}

.custom-title {
  text-align: center;
  font-size: 24px;
}

.custom-input-field {
  margin-bottom: 16px;
}

.add-buttons-row {
  justify-content: center;
  padding-bottom: 35px;
}

.custom-button {
margin: 5px;
}

</style>
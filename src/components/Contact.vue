<template>
  <v-card 
    id="contact-card"
    elevation="3"
    width="40%"
    class="custom-card"
  >
    <v-card-title id="contact-name" class="custom-title">
      {{ editedContact.lastname.toUpperCase() }}, {{ editedContact.firstname }} 
    </v-card-title>
    <v-card-text>
      <v-form ref="form">
        <v-text-field
          id="contact-firstname"
          v-model="editedContact.firstname"
          :label="$t('contact.firstName')"
          :readonly="!isEditing"
          dense
          outlined
          :rules="[requiredRule]"
          class="custom-input-field"
        />
        <v-text-field
          id="contact-lastname"
          v-model="editedContact.lastname"
          :label="$t('contact.lastName')"
          outlined
          :rules="[requiredRule]"
          :readonly="!isEditing"
          dense
          class="custom-input-field"
        />

        <div
          v-for="(phone, index) in editedContact.phoneNumber"
          :key="'phone-' + index"
          class="custom-input-field"
          :id="'phone-' + index"
        >
          <v-row
            no-gutters
            align="center"
          >
            <v-col>
              <v-text-field
                :id="'phone-input-' + index"
                :value="phone"
                :label="$t('contact.phoneNumber')"
                outlined
                :readonly="!isEditing"
                dense
                class="custom-input-field"
                :rules="[phoneRule, requiredRule]"
                @input="updatePhoneNumber(index, $event)"
              />
            </v-col>

            <v-col cols="auto">
              <v-btn
                v-if="isEditing"
                :id="'remove-phone-' + index"
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
          :id="'email-' + index"
        >
          <v-row
            no-gutters
            align="center"
            justify="space-between" 
          >
            <v-col>
              <v-text-field
                :id="'email-input-' + index"
                :value="email"
                :label="$t('contact.email')"
                outlined
                :readonly="!isEditing"
                dense
                class="custom-input-field"
                :rules="[emailRule, requiredRule]"
                @input="updateEmail(index, $event)"
              />
            </v-col>
            <v-col cols="auto">
              <v-btn
                v-if="isEditing"
                :id="'remove-email-' + index"
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
            id="add-phone-button"
            class="custom-button"
            rounded
            dark
            @click="addPhoneNumber"
          >
            <v-icon left>
              mdi-plus
            </v-icon> {{ $t('contact.addPhone') }}
          </v-btn>

          <v-btn
            v-if="isEditing"
            id="add-email-button"
            class="custom-button"
            dark
            rounded
            @click="addEmail"
          >
            <v-icon left>
              mdi-plus
            </v-icon> {{ $t('contact.addEmail') }}
          </v-btn>
        </v-row>
        <v-row
          justify="space-between"
          class="custom-row"
        >
          <v-btn
            v-if="!isEditing"
            id="edit-contact-button"
            icon
            @click="toggleEdit"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn
            v-if="!isEditing"
            id="delete-contact-button"
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
        id="cancel-edit-button"
        color="blue darken-1"
        text
        @click="cancelEdit"
      >
        {{ $t('contact.cancel') }}
      </v-btn>
      <v-btn
        id="save-contact-button"
        color="blue darken-1"
        text
        @click="saveContact"
      >
        {{ $t('contact.save') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { validationMixin } from '@/mixins/validationMixin';


export default {
  name: "Contact",
  mixins: [validationMixin],
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
<template>
  <v-dialog
    id="create-contact-modal"
    v-model="dialog"
    max-width="600px"
    persistent
  >
    <v-card>
      <v-card-title>
        <span class="text-h5">{{ isEditing ? $t('createContactModal.title.edit') : $t('createContactModal.title.add') }}</span>
      </v-card-title>

      <v-card-text>
        <v-form ref="form">
          <v-text-field
            id="contact-firstname-input"
            v-model="contactForm.firstname"
            :label="$t('createContactModal.form.firstName')"
            required
            :rules="[requiredRule]"
          />
          <v-text-field
            id="contact-lastname-input"
            v-model="contactForm.lastname"
            :label="$t('createContactModal.form.lastName')"
            required
            :rules="[requiredRule]"
          />

          <div
            v-for="(phone, index) in contactForm.phoneNumber"
            :key="'phone-' + index"
          >
            <v-row align="center">
              <v-col>
                <v-text-field
                  :id="'phone-input-' + index"
                  v-model="contactForm.phoneNumber[index]"
                  :label="$t('createContactModal.form.phoneNumber')"
                  required
                  :rules="[requiredRule, phoneRule]"
                />
              </v-col>
              <v-col cols="auto">
                <v-btn
                  :id="'remove-phone-' + index"
                  icon
                  color="red"
                  @click="removePhoneNumber(index)"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </div>

          <div
            v-for="(email, index) in contactForm.email"
            :key="'email-' + index"
          >
            <v-row align="center">
              <v-col>
                <v-text-field
                  :id="'email-input-' + index"
                  v-model="contactForm.email[index]"
                  :label="$t('createContactModal.form.email')"
                  required
                  :rules="[requiredRule, emailRule]"
                />
              </v-col>
              <v-col cols="auto">
                <v-btn
                  :id="'remove-email-' + index"
                  icon
                  color="red"
                  @click="removeEmail(index)"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </div>

          <v-row
            justify="center"
            class="add-buttons-row"
          >
            <v-btn
              id="add-phone-button"
              class="custom-buttom"
              dark
              rounded
              @click="addPhoneNumber"
            >
              <v-icon left>
                mdi-plus
              </v-icon> {{ $t('createContactModal.buttons.addPhone') }}
            </v-btn>

            <v-btn
              id="add-email-button"
              class="custom-buttom"
              dark
              rounded
              @click="addEmail"
            >
              <v-icon left>
                mdi-plus
              </v-icon> {{ $t('createContactModal.buttons.addEmail') }}
            </v-btn>
          </v-row>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn
          id="cancel-button"
          color="blue darken-1"
          text
          @click="close"
        >
          {{ $t('createContactModal.buttons.cancel') }}
        </v-btn>
        <v-btn
          id="save-contact-button"
          color="blue darken-1"
          text
          @click="saveContact"
        >
          {{ $t('createContactModal.buttons.save') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { validationMixin } from '@/mixins/validationMixin';

export default {
  name: "CreateContactModal",
  mixins: [validationMixin],
  props: {
    dialog: Boolean,
    contact: Object,
  },
  data() {
    return {
      contactForm: this.resetForm(),
      isEditing: false,
    };
  },
  watch: {
    dialog(val) {
      if (!val) {
        this.contactForm = this.resetForm();
      } else if (this.contact) {
        this.isEditing = true;
        this.contactForm = { ...this.contact };
      }
    },
  },
  methods: {
    resetForm() {
      return {
        id: null,
        firstname: "",
        lastname: "",
        phoneNumber: [""],
        email: [""],
      };
    },
    addPhoneNumber() {
      this.contactForm.phoneNumber.push("");
    },
    removePhoneNumber(index) {
      if (this.contactForm.phoneNumber.length > 1) {
        this.contactForm.phoneNumber.splice(index, 1);
      }
    },
    addEmail() {
      this.contactForm.email.push("");
    },
    removeEmail(index) {
      if (this.contactForm.email.length > 1) {
        this.contactForm.email.splice(index, 1);
      }
    },
    saveContact() {
      if (this.$refs.form.validate()) {
        if (this.isEditing) {
          this.$emit('update-contact', this.contactForm);
        } else {
          this.contactForm.id = Date.now();
          this.$emit('add-contact', this.contactForm);
        }
        this.close();
      }
    },
    close() {
      this.$emit('close');
    },
  },
};
</script>

<style>
.custom-buttom {
  margin: 5px;
}
</style>
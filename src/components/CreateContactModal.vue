<template>
  <v-dialog
    v-model="dialog"
    max-width="600px"
    persistent
  >
    <v-card>
      <v-card-title>
        <span class="text-h5">{{ isEditing ? 'Edit Contact' : 'Add New Contact' }}</span>
      </v-card-title>

      <v-card-text>
        <v-form ref="form">
          <v-text-field
            v-model="contactForm.firstname"
            label="First Name"
            required
          />
          <v-text-field
            v-model="contactForm.lastname"
            label="Last Name"
            required
          />

          <div
            v-for="(phone, index) in contactForm.phoneNumber"
            :key="'phone-' + index"
          >
            <v-row align="center">
              <v-col>
                <v-text-field
                  v-model="contactForm.phoneNumber[index]"
                  label="Phone Number"
                  required
                />
              </v-col>
              <v-col cols="auto">
                <v-btn
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
                  v-model="contactForm.email[index]"
                  label="Email"
                  required
                  :rules="[emailRule]"
                />
              </v-col>
              <v-col cols="auto">
                <v-btn
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
              class="custom-buttom"
              dark
              rounded
              @click="addPhoneNumber"
            >
              <v-icon left>
                mdi-plus
              </v-icon> Add Phone
            </v-btn>

            <v-btn
              class="custom-buttom"

              dark
              rounded
              @click="addEmail"
            >
              <v-icon left>
                mdi-plus
              </v-icon> Add Email
            </v-btn>
          </v-row>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn
          color="blue darken-1"
          text
          @click="close"
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
  </v-dialog>
</template>

<script>
export default {
  name: "CreateContactModal",
  props: {
    dialog: Boolean,
    contact: Object,
  },
  data() {
    return {
      contactForm: this.resetForm(),
      isEditing: false,
      emailRule: (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
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
.custom-buttom{
  margin: 5px;
}
</style>
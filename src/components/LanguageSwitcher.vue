<template>
  <div>
    <v-btn
      color="primary"
      dark
      fab
      small
      @click="showLanguageModal = true"
    >
      <v-icon>mdi-earth</v-icon>
    </v-btn>
    
    <v-dialog
      v-model="showLanguageModal"
      max-width="300px"
      persistent
    >
      <v-card>
        <v-card-title>{{ $t('languageSwitcher.title') }}</v-card-title>
        <v-card-text>
          <v-select
            v-model="selectedLanguage"
            :items="languages"
            label="Select Language"
            outlined
            dense
            @change="changeLanguage"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="blue darken-1"
            text
            @click="showLanguageModal = false"
          >
            {{ $t('languageSwitcher.close') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
  
  <script>
  export default {
    data() {
      return {
        languages: [
          { text: 'English', value: 'en' },
          { text: 'Español', value: 'es' },
          { text: 'Português', value: 'pt' },
          { text: 'Français', value: 'fr' },
        ],
        selectedLanguage: this.$i18n.locale,
        showLanguageModal: false,
      };
    },
    methods: {
      changeLanguage() {
        this.$i18n.locale = this.selectedLanguage;
        this.showLanguageModal = false;
      },
    },
  };
  </script>
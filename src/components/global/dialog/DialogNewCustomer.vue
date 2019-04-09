<template>
  <v-dialog
    v-model="showDialog"
    scrollable
    persistent
    max-width="600px"
    transition="dialog-transition"
  >
    <v-card>
      <v-card-title primary-title>
        <v-btn flat icon color="light-blue darken-1" @click="showDialog = false">
          <v-icon>close</v-icon>
        </v-btn>
        <h2 class="light-blue--text">Add New Customer</h2>
      </v-card-title>
      <v-divider/>

      <v-text-field
        :loading="loading"
        class="px-5"
        label="Name"
        prepend-icon="account_circle"
        v-model="name"
      />

      <v-text-field
        class="px-5"
        label="Phone"
        prepend-icon="phone_android"
        :loading="loading"
        mask="####-####-####"
        v-model="phone"
      />

      <v-autocomplete
        color="primary"
        :items="dusunMapToArray"
        placeholder="Dusun"
        v-model="dusun"
        :loading="loading"
        clearable
        class="px-5"
        prepend-icon="location_city"
      ></v-autocomplete>

      <v-divider/>
      <v-card-actions>
        <v-spacer/>
        <v-btn color="light-blue darken-1" dark :loading="loading" @click="submitCustomer">add</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    loading: false,
    showDialog: false,
    name: "",
    phone: "",
    dusun: "",
    dusunId: ""
  }),

  watch: {
    dusun: function() {
      this.dusunId = this.setDusunId(this.dusun);
    }
  },

  computed: {
    dusunMapToArray() {
      return Object.values(this.$store.state.dusunMap);
    }
  },

  mounted() {
    window.getApp.$on("EVENT_NEW_CUSTOMER_DIALOG", () => {
      this.showDialog = true;
    });

    window.getApp.$on("EVENT_ADD_CUSTOMER_PROCESS", () => {
      this.showDialog = this.loading = false;
    });
  },

  methods: {
    setDusunId(dusunName) {
      const object = this.$store.state.dusunMap;
      return Object.keys(object).find(key => object[key] === dusunName);
    },

    submitCustomer() {
      this.loading = true;
      let customer = {
        name: this.name,
        phone: this.phone,
        dusun: this.dusunId,
        timestamp: new Date()
      };

      this.$store.dispatch("addCustomer", customer);
    }
  }
};
</script>
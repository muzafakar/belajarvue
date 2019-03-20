<template>
  <v-layout row justify-center>
    <!-- Form Dialog -->
    <v-dialog
      v-model="formDialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      lazy
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="formDialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Add New Owner</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click="addNewOwner">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-flex xs6>
          <v-form>
            <v-text-field id="name" label="Name" type="text" required v-model="name" :counter="25"/>
            <v-text-field
              id="address"
              label="Address"
              type="text"
              required
              :counter="75"
              v-model="address"
            />
            <v-text-field id="phone" label="Phone" type="text" required v-model="phone"></v-text-field>
            <v-text-field id="email" label="Email" type="text" required v-model="email"></v-text-field>
            <v-text-field
              id="password"
              label="Password"
              type="password"
              required
              v-model="password"
            ></v-text-field>
            <!-- <v-text-field label="Confirm Password" type="password" required></v-text-field> -->
          </v-form>
        </v-flex>
      </v-card>
    </v-dialog>

    <!-- Progress Dialog -->
    <v-dialog v-model="progressDialog" transition="dialog-transition" width="300">
      <v-card color="primary" dark>
        <v-card-text>Processing...
          <v-progress-linear :indeterminate="true" color="white" class="mb-0"/>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, maxLength, email } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],

  validations: {
    name: { required, maxLength: maxLength(25) },
    address: { required, maxLength: maxLength(75) },
    email: { required, email }
  },

  data: () => ({
    formDialog: false,
    progressDialog: false,
    name: "",
    address: "",
    email: "",
    password: "",
    phone: ""
  }),

  methods: {
    addNewOwner() {
      this.progressDialog = true;

      // preparing the object
      const newOwner = {
        name: this.name,
        email: this.email,
        address: this.address,
        phone: this.phone,
        password: this.password
      };

      this.$store.dispatch("addNewOwner", newOwner);
    }
  },

  created() {
    window.getApp.$on("Owner", () => {
      this.formDialog = true;
    });

    window.getApp.$on("TOGGLE_PROGRESS_DIALOG", () => {
      this.progressDialog = false;
      this.formDialog = false;

      this.name = "";
      this.phone = "";
      this.address = "";
      this.email = "";
      this.password = "";
    });
  }
};
</script>

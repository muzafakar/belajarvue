<template>
  <v-layout row justify-center>
    <v-dialog
      v-model="formDialog"
      scrollable
      persistent
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card>
        <v-toolbar color="blue darken-3" dark>
          <v-btn icon @click="formDialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Add Owner</v-toolbar-title>
          <v-spacer/>
          <v-toolbar-items>
            <v-btn dark flat @click="addNewOwner">Submit</v-btn>
          </v-toolbar-items>
        </v-toolbar>

        <v-card-text>
          <v-container grid-list-md>
            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field name="name" label="Name" required v-model="name" type="text"/>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  name="phone"
                  type="text"
                  label="Phone"
                  required
                  v-model="phone"
                  hint="Tidak harus +62"
                />
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  name="email"
                  label="Email"
                  required
                  type="text"
                  v-model="email"
                  hint="Digunakan login di apps"
                />
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  textarea
                  name="address"
                  label="Address"
                  required
                  v-model="address"
                  type="text"
                />
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  name="password"
                  label="Password"
                  required
                  type="password"
                  v-model="password"
                  hint="tolong kasi regex"
                />
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  required
                  v-model="confirmPassword"
                  hint="tolong kasi regex"
                />
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="progressDialog" scrollable max-width="250px" transition="dialog-transition">
      <v-card color="blue darken-3" dark class="px-3">
        <v-card-title primary-title>
          <strong>Submitting...</strong>
        </v-card-title>
        <v-progress-linear :indeterminate="true" color="white"></v-progress-linear>
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
    confirmPassword: "",
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
        password: this.password,
        confirmPassword: this.confirmPassword
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
      this.confirmPassword = "";
    });
  }
};
</script>

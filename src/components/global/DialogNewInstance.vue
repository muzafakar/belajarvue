<template>
  <v-dialog
    v-model="showDialog"
    scrollable
    persistent
    max-width="750px"
    transition="dialog-transition"
  >
    <v-card>
      <v-card-title primary-title>
        <v-btn flat icon color="light-blue darken-1" @click="showDialog = false">
          <v-icon>close</v-icon>
        </v-btn>
        <h2 class="light-blue--text">Create New Instance</h2>
      </v-card-title>

      <v-card-text>
        <v-window v-model="step">
          <v-window-item :value="1">
            <v-container grid-list-md>
              <v-layout row wrap>
                <v-flex xs6>
                  <v-form ref="form" v-model="valid" lazy-validation>
                    <v-text-field
                      label="Owner"
                      v-model="instance.owner"
                      prepend-icon="person"
                      required
                    ></v-text-field>

                    <v-text-field
                      label="Phone"
                      v-model="instance.phone"
                      prepend-icon="phone_android"
                      required
                      mask="####-####-####"
                    ></v-text-field>

                    <v-text-field
                      label="Email"
                      v-model="email"
                      prepend-icon="email"
                      required
                      :error-messages="emailErrors"
                      @input="$v.email.$touch()"
                      @blur="$v.email.$touch()"
                    ></v-text-field>

                    <v-text-field
                      label="Address"
                      v-model="instance.address"
                      prepend-icon="location_on"
                      required
                    ></v-text-field>
                  </v-form>
                </v-flex>

                <v-flex xs6>
                  <h1>image picker</h1>
                </v-flex>
              </v-layout>
            </v-container>
          </v-window-item>
          <v-window-item :value="2">
            <v-container grid-list-md>
              <v-layout row wrap>
                <v-flex xs6>
                  <v-form ref="form" v-model="valid" lazy-validation>
                    <v-text-field
                      label="Owner"
                      v-model="instance.owner"
                      prepend-icon="person"
                      required
                    ></v-text-field>

                    <v-text-field
                      label="Phone"
                      v-model="instance.phone"
                      prepend-icon="phone_android"
                      required
                      mask="####-####-####"
                    ></v-text-field>

                    <v-text-field
                      label="Email"
                      v-model="email"
                      prepend-icon="email"
                      required
                      :error-messages="emailErrors"
                      @input="$v.email.$touch()"
                      @blur="$v.email.$touch()"
                    ></v-text-field>

                    <v-text-field
                      label="Address"
                      v-model="instance.address"
                      prepend-icon="location_on"
                      required
                    ></v-text-field>
                  </v-form>
                </v-flex>

                <v-flex xs6>
                  <h1>image picker</h1>
                </v-flex>
              </v-layout>
            </v-container>
          </v-window-item>
        </v-window>
      </v-card-text>

      <v-card-actions>
        <v-btn color="blue-grey darken-2" class="white--text" @click="step--" :disabled="step === 1">Previous</v-btn>
        <v-btn color="light-blue darken-1" class="white--text" @click="step++" :disabled="step === 2">Next</v-btn>
        <v-spacer/>
        <v-btn color="light-blue darken-1" class="white--text" :disabled="cacheProgress < 30">Submit</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { validationMixin } from "vuelidate";
import { email, required } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],
  validations: {
    email: { required, email }
  },
  data: () => ({
    valid: true,
    showDialog: false,
    step: 1,
    isFined: false,
    email: "",
    cacheProgress: 0,
    instance: {
      name: "",
      owner: "",
      phone: "",
      address: "",
      cost: 0,
      workerFee: 0,
      channelCount: 0,
      fineCharge: 0,
      paymentStart: 0,
      paymentEnd: 0
    }
  }),
  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;

      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    }
  },
  mounted() {
    window.getApp.$on("EVENT_NEW_INSTANCE_DIALOG", () => {
      this.showDialog = true;
    });
  }
};
</script>

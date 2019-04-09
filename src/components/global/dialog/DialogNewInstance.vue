<template>
  <div>
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
          <h2 class="light-blue--text">Create New Instance</h2>
        </v-card-title>

        <v-card-text>
          <v-window v-model="step">
            <v-window-item :value="1">
              <v-layout column align-center justify-center fill-height>
                <v-flex xs6>
                  <v-form ref="form" v-model="valid" lazy-validation>
                    <v-text-field label="Owner" v-model="owner" prepend-icon="person" required></v-text-field>

                    <v-text-field
                      label="Phone"
                      v-model="phone"
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
                      v-model="address"
                      prepend-icon="location_on"
                      required
                    ></v-text-field>
                  </v-form>
                </v-flex>
              </v-layout>
            </v-window-item>

            <v-window-item :value="2">
              <v-layout column wrap fill-height justify-center align-center>
                <v-flex xs8>
                  <v-form ref="form" v-model="valid" lazy-validation>
                    <v-text-field
                      label="Instance Name"
                      v-model="name"
                      prepend-icon="domain"
                      required
                    ></v-text-field>

                    <v-layout row wrap>
                      <v-flex xs6>
                        <v-text-field
                          label="Channel"
                          v-model="channelCount"
                          prepend-icon="drag_indicator"
                          required
                          mask="###"
                        ></v-text-field>
                      </v-flex>

                      <v-flex xs6>
                        <v-text-field
                          label="Iuran"
                          v-model="cost"
                          prepend-icon="money"
                          required
                          mask="#####"
                        ></v-text-field>
                      </v-flex>
                    </v-layout>

                    <v-layout row wrap>
                      <v-flex xs6>
                        <v-text-field
                          label="Start"
                          v-model="paymentStart"
                          prepend-icon="date_range"
                          required
                          mask="##"
                        ></v-text-field>
                      </v-flex>

                      <v-flex xs6>
                        <v-text-field
                          label="End"
                          v-model="paymentEnd"
                          prepend-icon="date_range"
                          required
                          mask="##"
                        ></v-text-field>
                      </v-flex>
                    </v-layout>

                    <v-layout row wrap>
                      <v-flex xs6>
                        <v-text-field
                          name="fee"
                          label="Fee Petugas"
                          hint="*Fee petugas dihitung dari % hasil yang ia dapatkan"
                          persistent-hint
                          mask="######"
                          prepend-icon="money"
                          v-model="workerFee"
                        ></v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex xs4>
                        <v-checkbox label="Denda" v-model="isFined" color="primary"/>
                      </v-flex>
                      <v-flex xs8>
                        <v-text-field
                          :disabled="!isFined"
                          name="denda"
                          label="Denda Per-bulan"
                          hint="*berlaku setiap bulan"
                          mask="######"
                          prepend-icon="money"
                          v-model="fineCharge"
                        ></v-text-field>
                      </v-flex>
                    </v-layout>
                  </v-form>
                </v-flex>
              </v-layout>
            </v-window-item>
            <v-window-item :value="3">
              <v-layout column align-center justify-cente fill-height>
                <input
                  type="file"
                  accept=".xlsx"
                  class="my-5"
                  @change="handleFile($event)"
                  clearable
                >
              </v-layout>
            </v-window-item>
          </v-window>
        </v-card-text>

        <v-card-actions>
          <v-btn
            color="blue-grey darken-2"
            class="white--text"
            @click="step--"
            :disabled="step === 1"
          >Previous</v-btn>
          <v-btn
            color="light-blue darken-1"
            class="white--text"
            @click="step++"
            :disabled="step === 3"
          >Next</v-btn>
          <v-spacer/>
          <v-btn
            color="light-blue darken-1"
            class="white--text"
            @click="submitInstance"
            :disabled="cacheProgress < 30"
          >Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Progress dialog -->
    <v-dialog
      v-model="progressDialog"
      scrollable
      max-width="400px"
      transition="dialog-transition"
      persistent
    >
      <v-card color="blue darken-3" dark class="px-3">
        <v-card-title primary-title>
          <strong>Submitting {{progressMsg}}...</strong>
        </v-card-title>
        <v-progress-linear :indeterminate="true" color="white"></v-progress-linear>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { email, required } from "vuelidate/lib/validators";
import excelReader from "read-excel-file";

export default {
  mixins: [validationMixin],
  validations: {
    email: { required, email }
  },
  data: () => ({
    valid: true,
    showDialog: false,
    progressDialog: false,
    progressMsg: "",
    step: 1,
    isFined: false,
    email: "",
    cacheProgress: 0,
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
    window.getApp.$on("EVENT_CACHE_SUCCESS", () => {
      this.cacheProgress += 10;
    });

    window.getApp.$on("EVENT_FIREBASE_ADD_DOCUMENT", msg => {
      this.progressMsg = msg;
    });

    window.getApp.$on("EVENT_TOGGLE_PROGGRESS_DIALOG", () => {
      this.progressDialog = this.showDialog = false;
    });
  },
  methods: {
    handleFile(event) {
      const file = event.target.files[0];

      excelReader(file, { sheet: "dusun" }).then(dusuns => {
        this.$store.commit("cacheDusun", dusuns);
      });

      excelReader(file, { sheet: "worker" }).then(workers => {
        this.$store.commit("cacheWorker", workers);
      });

      excelReader(file, { sheet: "customer" }).then(customers => {
        this.$store.commit("cacheCustomer", customers);
      });
    },

    submitInstance() {
      this.progressDialog = true;

      const instance = {
        owner: this.owner,
        phone: this.phone,
        email: this.email,
        name: this.name,
        address: this.address,
        channelCount: parseInt(this.channelCount),
        cost: parseInt(this.cost),
        paymentRange: [parseInt(this.paymentStart), parseInt(this.paymentEnd)],
        workerFee: parseInt(this.workerFee),
        isFined: this.isFined,
        fineCharge: parseInt(this.fineCharge),
        dusunCount: this.$store.state.tempDusun.length,
        workerCount: this.$store.state.tempWorker.length,
        customerCount: this.$store.state.tempCustomer.length,
        timestamp: new Date()
      };

      this.$store.dispatch("createNewInstance", instance);
    }
  }
};
</script>

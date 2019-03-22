<template>
  <div>
    <v-dialog v-model="formDialog" max-width="800px" transition="dialog-transition" persistent>
      <v-card>
        <v-toolbar color="primary" dark>
          <v-btn flat icon @click="closeDialog">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Add TV Kabel</v-toolbar-title>
        </v-toolbar>

        <v-window v-model="step">
          <v-window-item :value="1">
            <v-layout column align-center justify-center fill-height>
              <v-flex xs4>
                <v-autocomplete
                  class="my-5"
                  :items="generatedOwnerName"
                  label="Owner"
                  hint="*Silahkan pilih owner instance yang akan input"
                  persistent-hint
                  prepend-icon="face"
                  v-model="selectedName"
                ></v-autocomplete>
              </v-flex>
            </v-layout>
          </v-window-item>
          <v-window-item :value="2">
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs6>
                  <v-text-field
                    name="instance_name"
                    label="Nama"
                    type="text"
                    prepend-icon="domain"
                    clearable
                    v-model="instance.name"
                  />
                </v-flex>
                <v-flex xs6>
                  <v-text-field
                    name="instance_address"
                    label="Alamat"
                    type="text"
                    prepend-icon="location_on"
                    clearable
                    v-model="instance.address"
                  />
                </v-flex>
                <v-flex xs3>
                  <v-text-field
                    name="channel_count"
                    label="Jumlah Channel"
                    mask="###"
                    hint="maks 3 digit angka"
                    prepend-icon="drag_indicator"
                    v-model="instance.channelCount"
                  />
                </v-flex>
                <v-flex xs3>
                  <v-text-field
                    name="iuran"
                    label="Iuran Per-bulan"
                    mask="######"
                    hint="maks 6 digit angka"
                    prepend-icon="money"
                    v-model="instance.cost"
                  />
                </v-flex>
                <v-flex xs3>
                  <v-text-field
                    name="iuran_range_start"
                    label="Mulai Iuran"
                    hint="*berlaku setiap bulan"
                    persistent-hint
                    mask="##"
                    prepend-icon="date_range"
                    v-model="instance.paymentStart"
                  />
                </v-flex>
                <v-flex xs3>
                  <v-text-field
                    hint="*berlaku setiap bulan"
                    persistent-hint
                    name="iuran_range_end"
                    mask="##"
                    label="Selesai Iuran"
                    prepend-icon="date_range"
                    v-model="instance.paymentEnd"
                  />
                </v-flex>
                <v-flex xs6>
                  <v-text-field
                    name="fee"
                    label="Fee Petugas"
                    hint="*Fee petugas dihitung dari % hasil yang ia dapatkan"
                    persistent-hint
                    mask="######"
                    prepend-icon="money"
                    v-model="instance.workerFee"
                  />
                </v-flex>
                <v-flex xs6/>
                <v-flex xs4>
                  <v-checkbox label="Mengenakan Denda" v-model="isDenda" color="primary"/>
                </v-flex>
                <v-flex xs8>
                  <v-text-field
                    :disabled="!isDenda"
                    name="denda"
                    label="Denda Per-bulan"
                    hint="*berlaku setiap bulan"
                    mask="######"
                    prepend-icon="money"
                    v-model="instance.fineCharge"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-window-item>
          <v-window-item :value="3">
            <v-layout column align-center justify-center fill-height>
              <v-flex xs4>
                <input
                  type="file"
                  accept=".xlsx"
                  class="my-5"
                  @change="processExcelFile($event)"
                  clearable
                >
              </v-flex>
            </v-layout>
          </v-window-item>
        </v-window>
        <v-card-actions>
          <v-btn color="error" @click="step--" :disabled="step === 1">Back</v-btn>
          <v-btn color="info" @click="step++" :disabled="(step === 3) || (selectedName === '')">Next</v-btn>
          <!-- <v-btn color="info" @click="step++" :disabled="(step === 3) ">Next</v-btn> -->
          <v-spacer/>
          <v-btn color="primary" @click="debugSubmit" :disabled="cacheProgress < 30">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="progressDialog"
      scrollable
      max-width="400px"
      transition="dialog-transition"
      persistent
    >
      <v-card color="blue darken-3" dark class="px-3">
        <v-card-title primary-title>
          <strong>Submitting {{progressMessage}}...</strong>
        </v-card-title>
        <v-progress-linear :indeterminate="true" color="white"></v-progress-linear>
      </v-card>
    </v-dialog>
  </div>
</template>


<script>
import excelReader from "read-excel-file";

export default {
  data: () => ({
    step: 1, // for debugging
    formDialog: false,
    progressDialog: false,
    progressMessage: "",
    isDenda: false,
    selectedName: "",
    ownerNames: [],
    ownerIds: [],
    dusun: [],
    customer: [],
    cacheProgress: 0,
    instance: {
      name: "",
      address: "",
      cost: 0,
      workerFee: 0,
      channelCount: 0,
      fineCharge: 0,
      paymentStart: 0,
      paymentEnd: 0
    }
  }),

  methods: {
    showProgressDummy() {
      this.progressDialog = true;
    },

    closeDialog() {
      this.step = 1;
      this.formDialog = false;
      this.selectedName = "";
      this.isDenda = false;
      this.selectedName = "";
      this.ownerNames = [];
      this.ownerIds = [];
      this.dusun = [];
      this.customer = [];
      this.cacheProgress = 0;
      this.instance.name = "";
      this.instance.address = "";
      this.instance.cost = 0;
      this.instance.paymentStart = 0;
      this.instance.paymentEnd = 0;
      this.instance.fineCharge = 0;
    },

    debugSubmit() {
      this.progressDialog = true;
      const index = this.ownerNames.indexOf(this.selectedName);
      const ownerId = this.ownerIds[index];

      const newInstance = {
        ownerId: ownerId,
        name: this.instance.name,
        address: this.instance.address,
        channelCount: parseInt(this.instance.channelCount),
        cost: parseInt(this.instance.cost),
        paymentRange: [instance.paymentStart, instance.paymentEnd],
        workerFee: parseInt(this.instance.workerFee),
        isFined: this.isDenda,
        fineCharge: parseInt(this.instance.fineCharge)
      };


      this.$store.dispatch("addNewInstance", newInstance);
    },

    processExcelFile(event) {
      const file = event.target.files[0];

      excelReader(file, { sheet: "dusun" }).then(dusun => {
        this.$store.commit("cacheDusun", dusun);
      });

      excelReader(file, { sheet: "worker" }).then(worker => {
        this.$store.commit("cacheWorker", worker);
      });

      excelReader(file, { sheet: "customer" }).then(customer => {
        this.$store.commit("cacheCustomer", customer);
      });
    }
  },

  computed: {
    generatedOwnerName() {
      const owners = this.$store.state.owner;
      const names = [];
      const ids = [];

      owners.forEach(function(element) {
        names.push(element.name);
        ids.push(element.id);
      });
      this.ownerNames = names;
      this.ownerIds = ids;
      return names;
    }
  },

  created() {
    window.getApp.$on("TV Kabel", () => {
      this.formDialog = true;
    });

    window.getApp.$on("TOGGLE_PROGRESS_DIALOG", () => {
      this.progressDialog = false;
      this.closeDialog();
    });

    window.getApp.$on("CACHE_SUCCESS", () => {
      this.cacheProgress += 10;
    });

    window.getApp.$on("FIREBASE_ADD_ONE_DOCUMENT", progressMessage => {
      this.progressMessage = progressMessage;
    });
  }
};
</script>

<template>
  <v-dialog v-model="formDialog" max-width="800px" transition="dialog-transition">
    <v-card>
      <v-toolbar color="primary" dark>
        <v-btn flat icon @click="closeDialog">
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>Add Instance - {{currentTitle}}</v-toolbar-title>
      </v-toolbar>

      <v-window v-model="step">
        <v-window-item :value="1">
          <v-layout row align-center>
            <v-flex xs6>
              <v-select :items="owner" v-model="selectedOwner" label="Owner"></v-select>
            </v-flex>
          </v-layout>
        </v-window-item>
        <v-window-item :value="2">
          <v-card height="400px" color="primary darken-1"/>
        </v-window-item>
        <v-window-item :value="3">
          <v-card height="300px" color="primary darken-2"/>
        </v-window-item>
      </v-window>
      <v-card-actions>
        <v-btn color="pink" @click="step--" :disabled="step === 1" dark>Back</v-btn>
        <v-btn color="primary" @click="step++" :disabled="step === 3">Next</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script>
export default {
  data: () => ({
    step: 1,
    formDialog: false,
    owner: ['Zulfakar', 'Ariya', 'Niyaz']
  }),

  computed: {
    currentTitle() {
      switch (this.step) {
        case 1:
          return "Choose Owner";
        case 2:
          return "Upload File";
        case 3:
          return "Finish";
      }
    }
  },

  methods: {
    closeDialog() {
      this.step = 1;
      this.formDialog = false;
    }
  },

  created() {
    window.getApp.$on("Instance", () => {
      this.stepper = 0;
      this.formDialog = true;
    });

    window.getApp.$on("TOGGLE_PROGRESS_DIALOG", () => {
      this.progressDialog = false;
      this.formDialog = false;
    });
  }
};
</script>

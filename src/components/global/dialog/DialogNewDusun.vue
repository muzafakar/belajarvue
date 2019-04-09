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
        <h2 class="light-blue--text">Add New Dusun</h2>
      </v-card-title>
      <v-text-field
        label="Dusun Name"
        v-model="dusunName"
        prepend-icon="location_city"
        class="px-5"
        :loading="loading"
      ></v-text-field>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer/>
        <v-btn color="light-blue darken-1" dark :loading="loading" @click="submitDusun">add</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    loading: false,
    showDialog: false,
    dusunName: ""
  }),

  mounted() {
    window.getApp.$on("EVENT_NEW_DUSUN_DIALOG", () => {
      this.showDialog = true;
    });

    window.getApp.$on("EVENT_ADD_DUSUN_PROCESS", () => {
      this.loading = this.showDialog = false;
    });
  },

  methods: {
    submitDusun() {
      this.loading = true;
      const newDusun = {
        name: this.dusunName,
        timestamp: new Date()
      };

      this.$store.dispatch("addNewDusun", newDusun);
    }
  }
};
</script>

<template>
  <v-card class="elevation-3">
    <v-toolbar flat color="cyan" dark>
      <v-btn icon @click="fetchRemoteData">
        <v-icon>refresh</v-icon>
      </v-btn>
      <v-toolbar-title>Owner</v-toolbar-title>
      <v-spacer/>
      <v-flex xs4>
        <v-text-field
          width="60%"
          v-model="search"
          prepend-icon="search"
          clearable
          label="Search"
          color="white"
          single-line
          hide-details
        />
      </v-flex>
    </v-toolbar>

    <v-data-table
      :headers="headers"
      :items="$store.state.owner"
      :search="search"
      :loading="loading"
    >
      <template v-slot:items="props">
        <td>{{props.item.name}}</td>
        <td>{{props.item.email}}</td>
        <td>{{props.item.phone}}</td>
        <td>{{props.item.address}}</td>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    search: "",
    loading: false,
    headers: [
      { text: "Name", align: "left", value: "name" },
      { text: "Email", align: "left", value: "email" },
      { text: "Phone", align: "left", value: "phone" },
      { text: "Address", align: "left", value: "address" }
    ]
  }),

  methods: {
    fetchRemoteData() {
      this.loading = true;
      this.$store.dispatch("fetchOwner");
    }
  },

  created() {
    window.getApp.$on("TOGGLE_TABLE_LOADING", () => {
      this.loading = false;
    });
  }
};
</script>
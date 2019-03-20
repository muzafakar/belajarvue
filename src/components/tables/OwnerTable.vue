<template>
  <v-card class="elevation-3">
    <v-toolbar flat color="primary" dark>
      <v-btn icon @click="fetchRemoteOwnerData">
        <v-icon>refresh</v-icon>
      </v-btn>
      <v-toolbar-title>Owner List</v-toolbar-title>
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

    <v-data-table :headers="headers" :items="items" :search="search">
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
    headers: [
      {
        text: "Name",
        align: "left",
        value: "name"
      },
      {
        text: "Phone",
        value: "phone"
      },
      {
        text: "Email",
        value: "email"
      },
      {
        text: "Address",
        value: "address"
      }
    ],
    items: []
  }),
  methods: {
    showOwnerDetail(name) {
      console.log("ownerDetail: " + JSON.stringify(name));
    },
    fetchRemoteOwnerData() {
      this.$store.dispatch("fetchOwner");
    }
  },

  watch: {
    ownerData() {}
  },

  created() {
    // TODO buat jadi observer
    const owners = this.$store.state.owner;
    this.items = owners;
    console.log(owners);
  }
};
</script>
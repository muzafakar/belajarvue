<template>
  <v-card class="elevation-3">
    <v-toolbar flat :color="obj.color" dark>
      <v-btn icon @click="fetchRemoteData">
        <v-icon>refresh</v-icon>
      </v-btn>
      <v-toolbar-title>{{obj.title}}</v-toolbar-title>
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

    <v-data-table :headers="obj.headers" :items="data" :search="search">
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
  name: "Table",
  props: {
    obj: Object,
    data: Array
  },
  data: () => ({
    search: ""
  }),

  methods: {
    fetchRemoteData() {
      console.log("table title: " + this.obj.title);
      if (this.obj.title === "Owner") {
        this.$store.dispatch("fetchOwner");
      } else if (this.title === "Customer") {
        // this.$store.dispatch("fetchCustomer");
      } else if (this.title === "TV Kabel") {
        // this.$store.dispatch("fetchTvKabel");
      }
    }
  }
};
</script>
<template>
  <v-container fluid grid-list-md>
    <v-data-iterator
      :items="items"
      :rows-per-page-items="rowsPerPageItems"
      :pagination.sync="pagination"
      :search="search"
      content-tag="v-layout"
      row
      wrap
    >
      <template v-slot:header>
        <v-toolbar>
          <v-toolbar-title>Owner List</v-toolbar-title>
          <v-spacer/>
          <v-text-field
            width="100"
            v-model="search"
            prepend-icon="search"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-toolbar>
      </template>

      <template v-slot:item="props">
        <v-flex xs12 sm6 md8 lg3 @click="showOwnerDetail(props.item)">
          <v-card>
            <v-card-title>
              <h4>{{ props.item.name }}</h4>
            </v-card-title>
            <v-divider></v-divider>
            <v-list dense>
              <v-list-tile>
                <v-list-tile-content>Email:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.email }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Phone:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.phone }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Address:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.address }}</v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card>
        </v-flex>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    search: "",
    rowsPerPageItems: [4, 8, 12],
    pagination: {
      rowsPerPage: 4
    },
    items: []
  }),
  methods: {
    showOwnerDetail(name) {
      console.log("ownerDetail: " + JSON.stringify(name));
    }
  },
  created() {
    const owners = JSON.parse(localStorage.getItem("owner"));
    this.items = owners;
    console.log(owners);
  }
};
</script>
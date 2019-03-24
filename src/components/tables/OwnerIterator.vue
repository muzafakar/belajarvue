<template>
  <v-card>
    <v-toolbar flat color="cyan" dark class="mb-4">
      <v-btn icon @click="fetchRemoteOwnerData">
        <v-icon>refresh</v-icon>
      </v-btn>
      <v-toolbar-title>Owner Data</v-toolbar-title>
      <v-spacer/>
      <v-text-field
        width="100"
        v-model="search"
        prepend-icon="search"
        clearable
        label="Search"
        color="white"
        single-line
        hide-details
      />
    </v-toolbar>

    <v-data-iterator
      :items="$store.state.owner"
      :rows-per-page-items="rowsPerPageItems"
      :pagination.sync="pagination"
      :search="search"
      content-tag="v-layout"
      row
      wrap
      class="mr-3 ml-3"
    >
      <template v-slot:no-results>
        <h4 pa-5>Sorry, the data you're looking foor is not exist here :')</h4>
      </template>

      <template v-slot:item="props">
        <v-flex xs12 sm6 md4 lg6>
          <v-card>
            <v-card-title>
              <h4>{{ props.item.name }}</h4>
              <v-spacer/>
              <v-btn icon @click="showOwnerDetail(props.item)">
                <v-icon>open_in_new</v-icon>
              </v-btn>
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
  </v-card>
</template>

<script>
export default {
  data: () => ({
    search: "",
    rowsPerPageItems: [4, 8, 12],
    pagination: {
      rowsPerPage: 4
    }
  }),
  methods: {
    showOwnerDetail(name) {
      console.log("ownerDetail: " + JSON.stringify(name));
    },
    fetchRemoteOwnerData() {
      this.$store.dispatch("fetchOwner");
    }
  }
};
</script>
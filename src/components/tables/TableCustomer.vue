<template>
  <v-card>
    <v-toolbar flat color="green darken-3" dark class="mb-4">
      <v-toolbar-title>All Customer</v-toolbar-title>
      <v-spacer/>
      <v-toolbar-items>
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
      </v-toolbar-items>
    </v-toolbar>

    <v-data-table
      :headers="headers"
      :items="$store.state.viewedTvKabel.customer"
      :loading="loading"
      :search="search"
    >
      <template v-slot:items="props">
        <td>{{props.item.name}}</td>
        <td>{{props.item.phone}}</td>
        <td>{{props.item.dusun.name}}</td>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    search: "",
    loading: false,
    items: [],
    headers: [
      { text: "Name", align: "left", value: "name" },
      { text: "Phone", align: "left", value: "phone", sortable: false },
      { text: "Dusun", align: "left", value: "dusun" }
    ]
  })
};
</script>
<template>
  <v-card>
    <v-toolbar flat color="cyan darken-3" dark class="mb-4">
      <v-toolbar-title>All Worker</v-toolbar-title>
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
      :items="$store.state.viewedTvKabel.worker"
      :loading="loading"
      :search="search"
    >
      <template v-slot:items="props">
        <td>{{props.item.name}}</td>
        <td>{{props.item.id}}</td>
        <td>{{props.item.phone}}</td>
        <td>
          <span v-for="dusun in props.item.area" :key="dusun.name"> +{{dusun.name}}</span>
        </td>
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
      { text: "Id", align: "left", value: "id" },
      { text: "Phone", align: "left", value: "phone", sortable: false },
      { text: "Area", align: "left", value: "area"}
    ]
  })
};
</script>
<template>
  <v-card>
    <v-toolbar flat color="yellow darken-3" dark class="mb-4">
      <v-toolbar-title>All Dusun</v-toolbar-title>
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
      :items="$store.state.viewedTvKabel.dusun"
      :loading="loading"
      :search="search"
    >
      <template v-slot:items="props">
        <td>{{props.item.name}}</td>
        <td>{{props.item.id}}</td>
        <td>{{props.item.timestamp}}</td>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    search: "",
    headers: [
      { text: "Name", align: "left", value: "name" },
      { text: "Id", align: "left", value: "id" },
      { text: "Timestamp", align: "left", value: "timestamp" }
    ]
  })
};
</script>
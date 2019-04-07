<template>
  <v-container grid-list-xs>
    <v-card class="elevation-3">
      <v-data-table
        :headers="headers"
        :items="items"
        :loading="loading"
        :search="search"
        :expand="expand"
      >
        <template v-slot:items="props">
          <tr @click="props.expand = !props.expand">
            <td>col 1</td>
            <td>col 2</td>
            <td>col 3</td>
          </tr>
        </template>

        <template v-slot:expand="props">
          <v-card flat class="mx-5 my-2">
            <h4>item</h4>
            <h4>item</h4>
            <h4>item</h4>
            <h4>item</h4>
            <h4>item</h4>
            <h4>item</h4>
          </v-card>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    search: "",
    loading: false,
    expand: true,
    headers: [
      { text: "Name", align: "left", value: "name" },
      { text: "Owner", align: "left", value: "owner" },
      { text: "Address", align: "left", value: "address" }
    ],
    items: [{}, {}, {}, {}, {}, {}, {}, {}, {}]
  })
};
</script>

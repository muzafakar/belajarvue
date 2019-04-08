<template>
  <div>
    <v-layout align-center justify-start row fill-height class="ps-2 light-blue darken-1">
      <v-btn flat icon color="white" @click="addInstance">
        <v-icon>add</v-icon>
      </v-btn>
      <v-flex xs4>
        <v-text-field label="Search" v-model="search" dark color="white" clearable></v-text-field>
      </v-flex>
      <v-spacer/>
    </v-layout>

    <v-container grid-list-xs>
      <v-card class="elevation-3">
        <v-data-table
          :headers="headers"
          :items="items"
          :loading="loading"
          :search="search"
          :expand="expand"
          item-key="name"
        >
          <template v-slot:items="props">
            <tr @click="props.expanded = !props.expanded">
              <td>{{props.item.name}}</td>
              <td>{{props.item.owner}}</td>
              <td>{{props.item.address}}</td>
            </tr>
          </template>

          <template v-slot:expand="props">
            <v-card flat class="mx-5 my-2">
              <p>item</p>
              <p>item</p>
              <p>item</p>
              <p>item</p>
              <p>item</p>
              <p>item</p>
              <!-- <router-link to="/instance/detail/KJuda98sanxaKJAdun"> -->
              <v-btn
                color="blue-grey darken-3"
                dark
                @click="navigateToDetail(props.item.name)"
              >detail</v-btn>
              <!-- </router-link> -->
            </v-card>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
  </div>
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
    items: [
      {
        name: "Muzafakar Instance",
        owner: "Zulfakar",
        address: "Firebase"
      },
      {
        name: "Toshiba",
        owner: "Zulfakar",
        address: "Firebase"
      },
      {
        name: "Ubuntu",
        owner: "Zulfakar",
        address: "Firebase"
      },
      {
        name: "Kde Plasma",
        owner: "Zulfakar",
        address: "Firebase"
      },
      {
        name: "Linux",
        owner: "Zulfakar",
        address: "Firebase"
      }
    ]
  }),
  methods: {
    navigateToDetail(id) {
      this.$router.push({
        path: `/instance/${id}/detail`,
        params: { id: id, name: 'iak' }
      });
    },

    addInstance() {
      console.log("add instance");
    }
  }
};
</script>

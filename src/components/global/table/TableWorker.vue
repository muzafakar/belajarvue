<template>
  <div>
    <v-container grid-list-xs>
      <v-card class="elevation-3">
        <v-toolbar dense flat color="blue-grey darken-3">
          <v-flex xs4>
            <v-text-field
              placeholder="Search"
              v-model="search"
              dark
              color="white"
              clearable
              class="pb-0"
            ></v-text-field>
          </v-flex>
          <v-spacer></v-spacer>
          <v-btn flat icon color="white" @click="fetchData('default')">
            <v-icon>refresh</v-icon>
          </v-btn>
        </v-toolbar>

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
              <td>{{props.item.phone}}</td>
              <td>{{props.item.area}}</td>
            </tr>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
  </div>
</template>

<script>
const firebase = require("../../../plugins/firebase");
export default {
  data: () => ({
    loading: false,
    search: "",
    expand: false,
    instanceId: "",
    headers: [
      { text: "Name", align: "left", value: "name" },
      { text: "Phone", align: "left", value: "owner" },
      { text: "Area", align: "left", value: "area" }
    ],
    items: []
  }),

  mounted() {
    this.instanceId = this.$store.state.viewInstance.id;
    console.log(this.instanceId);
    this.fetchData("cache");
  },

  methods: {
    fetchData(source) {
      this.loading = true;
      this.items = [];
      firebase.instance
        .doc(this.instanceId)
        .collection("worker")
        .get({ source: source })
        .then(docs => {
          docs.forEach(doc => {
            let w = doc.data();
            w["id"] = doc.id;
            this.items.push(w);
          });
          this.loading = false;
        });
    }
  }
};
</script>


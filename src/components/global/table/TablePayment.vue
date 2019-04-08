<template>
  <div>
    <v-container grid-list-xs>
      <v-card class="elevation-3">
        <v-data-table
          :headers="headers"
          :items="items"
          :loading="loading"
          :search="search"
          :expand="expand"
          item-key="name"
        ></v-data-table>
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
      { text: "Address", align: "left", value: "address" }
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
      this.items = [];
      firebase.instance
        .doc(this.instanceId)
        .collection("payment")
        .get({ source: source })
        .then(docs => {
          docs.forEach(doc => {
            let p = doc.data();
            p["id"] = doc.id;
            this.items.push(p);
          });
        });
    }
  }
};
</script>


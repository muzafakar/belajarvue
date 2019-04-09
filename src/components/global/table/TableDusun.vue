<template>
  <div>
    <v-container grid-list-xs>
      <v-card class="elevation-3">
        <v-toolbar dense flat color="blue-grey darken-3">
          <v-flex xs3>
            <v-text-field
              placeholder="Search"
              v-model="search"
              dark
              color="white"
              prepend-icon="search"
              clearable
              class="pb-0"
            ></v-text-field>
          </v-flex>
          <v-spacer></v-spacer>
          <v-btn color="white" flat @click="toggleNewDusunDialog">
            <v-icon>add</v-icon>Add New Dusun
          </v-btn>
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
              <td>{{props.item.timestamp.toDate()}}</td>
            </tr>
          </template>
        </v-data-table>
      </v-card>
    </v-container>

    <DialogNewDusun/>
  </div>
</template>

<script>
import DialogNewDusun from "@/components/global/dialog/DialogNewDusun";
const firebase = require("../../../plugins/firebase");
export default {
  components: {
    DialogNewDusun
  },
  data: () => ({
    loading: false,
    search: "",
    expand: false,
    instanceId: "",
    headers: [
      { text: "Name", align: "left", value: "name" },
      { text: "Timestamp", align: "left", value: "Timestamp" }
    ],
    items: []
  }),

  mounted() {
    this.instanceId = this.$store.state.viewInstance.id;
    console.log(this.instanceId);
    this.fetchData("cache");

    window.getApp.$on("EVENT_ADD_DUSUN_PROCESS", () => {
      this.fetchData("cache");
    });
  },

  methods: {
    fetchData(source) {
      this.loading = true;
      const itemArr = [];
      firebase.instance
        .doc(this.instanceId)
        .collection("dusun")
        .get({ source: source })
        .then(docs => {
          docs.forEach(doc => {
            let d = doc.data();
            d["id"] = doc.id;
            itemArr.push(d);
          });
          this.items = itemArr;
          this.loading = false;
        });
    },

    toggleNewDusunDialog() {
      window.getApp.$emit("EVENT_NEW_DUSUN_DIALOG");
    }

    /* parseTimestamp(timestamp) {
      var monthNames = new Array(
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      );

      const d = timestamp.toDate();
      const year = d.getFullYear();
      const month = d.getMonth();
      const day = d.getDate();
      const hour = d.getHours();
      const min = d.getMinutes();
      const sec = d.getSeconds();

      return `${day}/${monthNames[month]}/${year} | ${hour}:${min}:${sec}`;
    }*/
  }
};
</script>


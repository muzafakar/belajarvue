<template>
  <div>
    <v-container grid-list-xs>
      <v-card class="elevation-3">
        <v-toolbar dense flat color="blue-grey darken-3">
          <v-flex xs3>
            <v-text-field
              placeholder="Filter by name"
              v-model="nameSearch"
              dark
              color="white"
              clearable
              class="pb-0"
            ></v-text-field>
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex xs3>
            <v-autocomplete
              color="white"
              clearable
              dark
              :items="dusunMapToArray"
              placeholder="Filter by dusun"
              v-model="dusunSearch"
            ></v-autocomplete>
          </v-flex>
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
          disable-initial-sort
        >
          <template v-slot:items="props">
            <tr @click="props.expanded = !props.expanded">
              <td>{{props.item.name}}</td>
              <td>{{props.item.phone}}</td>
              <td>{{$store.state.dusunMap[props.item.dusun]}}</td>
              <td>{{props.item.timestamp.toDate()}}</td>
            </tr>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { getHashes } from "crypto";
const firebase = require("../../../plugins/firebase");

export default {
  data: () => ({
    loading: false,
    search: "",
    dusunSearch: "",
    nameSearch: "",
    expand: false,
    instanceId: "",
    headers: [
      { text: "Name", align: "left", value: "name" },
      { text: "Phone", align: "left", value: "owner", sortable: false },
      { text: "Dusun", align: "left", value: "dusun" },
      { text: "Created", align: "left", value: "created" }
    ],
    items: []
  }),

  computed: {
    dusunMapToArray() {
      return Object.values(this.$store.state.dusunMap);
    }
  },

  watch: {
    dusunSearch: function() {
      this.search = this.searchByDusunName(this.dusunSearch);
    },

    nameSearch: function() {
      this.search = this.nameSearch;
    }
  },

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
        .collection("customer")
        .get({ source: source })
        .then(docs => {
          docs.forEach(doc => {
            let c = doc.data();
            c["id"] = doc.id;
            this.items.push(c);
          });
          this.loading = false;
        });
    },

    searchByDusunName(dusunName) {
      const object = this.$store.state.dusunMap;
      return Object.keys(object).find(key => object[key] === dusunName);
    }

    /*  parseTimestamp(timestamp) {
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


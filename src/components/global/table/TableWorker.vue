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
          <v-btn color="white" flat @click="toggleNewWorkerDialog">
            <v-icon>add</v-icon>Add New Worker
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
              <td>{{props.item.email}}</td>
              <td>{{props.item.phone}}</td>
              <td>{{parseAreaArray(props.item.area)}}</td>
            </tr>
          </template>
        </v-data-table>
      </v-card>
    </v-container>

    <DialogNewWorker/>
  </div>
</template>

<script>
import DialogNewWorker from "@/components/global/dialog/DialogNewWorker";
const firebase = require("../../../plugins/firebase");
export default {
  components: {
    DialogNewWorker
  },
  data: () => ({
    loading: false,
    search: "",
    dusunSearch: "",
    nameSearch: "",
    expand: false,
    instanceId: "",
    headers: [
      { text: "Name", align: "left", value: "name" },
      { text: "Email", align: "left", value: "email", sortable: false },
      { text: "Phone", align: "left", value: "owner", sortable: false },
      { text: "Area", align: "left", value: "area" }
    ],
    items: []
  }),

  mounted() {
    this.instanceId = this.$store.state.viewInstance.id;
    console.log(this.instanceId);
    this.fetchData("cache");

    window.getApp.$on("EVENT_ADD_WORKER_PROCESS", () => {
      this.fetchData("cache");
    });
  },

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

  methods: {
    fetchData(source) {
      this.loading = true;
      const itemsArr = [];
      firebase.instance
        .doc(this.instanceId)
        .collection("worker")
        .get({ source: source })
        .then(docs => {
          docs.forEach(doc => {
            let w = doc.data();
            w["id"] = doc.id;
            itemsArr.push(w);
          });

          this.items = itemsArr;
          this.loading = false;
        });
    },

    parseAreaArray(areas) {
      let area = "";
      areas.forEach(a => {
        area += this.$store.state.dusunMap[a];
        area += ", ";
      });
      return area;
    },

    searchByDusunName(dusunName) {
      const object = this.$store.state.dusunMap;
      return Object.keys(object).find(key => object[key] === dusunName);
    },

    toggleNewWorkerDialog() {
      window.getApp.$emit("EVENT_NEW_WORKER_DIALOG");
    }
  }
};
</script>


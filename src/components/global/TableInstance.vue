<template>
  <div>
    <DialogNewInstance/>

    <v-layout align-center justify-start row fill-height class="ps-2 light-blue darken-1">
      <v-btn flat icon color="white" @click="refreshData">
        <v-icon>refresh</v-icon>
      </v-btn>
      <v-flex xs4>
        <v-text-field label="Search" v-model="search" dark color="white" clearable></v-text-field>
      </v-flex>
      <v-spacer/>
      <v-btn flat color="white" dark @click="expand = !expand">{{expand ? 'MX' : 'SX'}}</v-btn>
      <v-btn flat color="white" @click="showDialog">
        <v-icon>add</v-icon>Create New Instance
      </v-btn>
    </v-layout>

    <v-container grid-list-xs>
      <v-card class="elevation-3">
        <v-data-table
          :headers="headers"
          :items="instance"
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
              <v-layout row wrap>
                <v-divider vertical/>
                <v-flex xs1>
                  <v-layout column align-center>
                    <v-icon color="light-blue darken-1">drag_indicator</v-icon>
                    <h3>{{props.item.channelCount}}</h3>
                    <h4>Channel</h4>
                  </v-layout>
                </v-flex>
                <v-divider vertical/>

                <v-flex xs1>
                  <v-layout column align-center>
                    <v-icon color="light-blue darken-1">location_city</v-icon>
                    <h3>{{props.item.dusunCount}}</h3>
                    <h4>Dusun</h4>
                  </v-layout>
                </v-flex>
                <v-divider vertical/>

                <v-flex xs1>
                  <v-layout column align-center>
                    <v-icon color="light-blue darken-1">account_circle</v-icon>
                    <h3>{{props.item.customerCount}}</h3>
                    <h4>Customer</h4>
                  </v-layout>
                </v-flex>
                <v-divider vertical/>

                <v-flex xs1>
                  <v-layout column align-center>
                    <v-icon color="light-blue darken-1">supervised_user_circle</v-icon>
                    <h3>{{props.item.workerCount}}</h3>
                    <h4>Worker</h4>
                  </v-layout>
                </v-flex>
                <v-divider vertical/>

                <v-flex xs1>
                  <v-layout column align-center>
                    <v-icon color="light-blue darken-1">money</v-icon>
                    <h3>Rp. {{props.item.cost}}</h3>
                    <h4>Iuran</h4>
                  </v-layout>
                </v-flex>
                <v-divider vertical/>

                <v-flex xs1>
                  <v-layout column align-center>
                    <v-icon color="light-blue darken-1">money</v-icon>
                    <h3>Rp. {{props.item.workerFee}}</h3>
                    <h4>Worker Fee</h4>
                  </v-layout>
                </v-flex>
                <v-divider vertical/>

                <v-flex xs1>
                  <v-layout column align-center>
                    <v-icon color="light-blue darken-1">money</v-icon>
                    <h3>{{props.item.isFined ? `Rp. ${props.item.fineCharge}` : '---'}}</h3>
                    <h4>Fine</h4>
                  </v-layout>
                </v-flex>
                <v-divider vertical/>
                <v-spacer/>
                <v-flex xs1>
                  <v-btn
                    color="blue-grey darken-3"
                    dark
                    @click="navigateToDetail(props.item)"
                  >detail</v-btn>
                </v-flex>
              </v-layout>
              <v-divider class="mt-3"/>
            </v-card>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import DialogNewInstance from "@/components/global/DialogNewInstance";
import { firestore } from "firebase";
const firebase = require("../../plugins/firebase");
export default {
  components: {
    DialogNewInstance
  },
  data: () => ({
    search: "",
    loading: false,
    expand: true,
    headers: [
      { text: "Name", align: "left", value: "name" },
      { text: "Owner", align: "left", value: "owner" },
      { text: "Address", align: "left", value: "address" }
    ],
    instance: []
  }),
  methods: {
    navigateToDetail(instance) {
      this.$store.commit("cacheInstance", instance);

      this.$router.push({
        path: `/instance/${instance.id}/detail`,
        params: { id: instance.id }
      });
    },

    showDialog() {
      window.getApp.$emit("EVENT_NEW_INSTANCE_DIALOG");
    },

    refreshData() {
      this.loading = true;
      this.instance = [];
      firebase.instance.get({ source: "default" }).then(instances => {
        instances.forEach(doc => {
          let i = doc.data();
          i["id"] = doc.id;
          this.instance.push(i);
        });
        this.loading = false;
      });
    }
  },

  mounted() {
    this.loading = true;
    this.instance = [];
    firebase.instance.get({ source: "cache" }).then(instances => {
      instances.forEach(doc => {
        let i = doc.data();
        i["id"] = doc.id;
        this.instance.push(i);
      });
      this.loading = false;
    });
  }
};
</script>

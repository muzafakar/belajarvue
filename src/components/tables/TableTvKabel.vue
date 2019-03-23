<template>
  <v-card class="elevation-3">
    <v-toolbar flat color="amber darken-3" dark>
      <v-btn icon @click="fetchRemoteData">
        <v-icon>refresh</v-icon>
      </v-btn>
      <v-toolbar-title>TV Kabel</v-toolbar-title>
      <v-spacer/>
      <v-toolbar-items>
        <v-text-field
          v-model="search"
          prepend-icon="search"
          clearable
          label="Search"
          color="white"
          single-line
          hide-details
        />
        <v-btn flat small @click="expand = !expand">{{expand ? 'MX' : 'SX'}}</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-data-table
      :headers="headers"
      :items="$store.state.tvkabel"
      :search="search"
      :expand="expand"
    >
      <template v-slot:items="props">
        <tr @click="props.expanded = !props.expanded">
          <td>{{props.item.name}}</td>
          <td>{{generateOwnerName(props.item.ownerId)}}</td>
          <td>{{props.item.address}}</td>
          <!-- <td>{{props.item.channelCount}}</td>
          <td>{{props.item.cost}}</td>
          <td>{{props.item.isFined ? props.item.fineCharge : '-'}}</td>
          <td>{{props.item.workerFee}} %</td>
          <td>{{props.item.paymentRange[0] +' - '+ props.item.paymentRange[1]}}</td> -->
        </tr>
      </template>

      <template v-slot:expand="props">
        <v-card flat class="mx-5 my-2">
          <h4>Jumlah channel: {{props.item.channelCount}}</h4>
          <h4>Iuran Perbulan: Rp. {{props.item.cost}}</h4>
          <h4>Denda: {{props.item.isFined ? 'Rp.' + props.item.fineCharge : '-'}}</h4>
          <h4>Fee Petugas: {{props.item.workerFee}}%</h4>
          <h4>Tanggal Iuran: {{props.item.paymentRange[0] +' - '+ props.item.paymentRange[1]}} (setiap bulannya)</h4>
        </v-card>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    search: "",
    loading: false,
    expand: false,
    headers: [
      { text: "Name", align: "left", value: "name" },
      { text: "Owner", align: "left", value: "owner" },
      { text: "Address", align: "left", value: "address" },
      // { text: "Channel", align: "left", value: "channel" },
      // { text: "Iuran", align: "left", value: "iuran" },
      // { text: "Denda", align: "left", value: "denda" },
      // { text: "Fee", align: "left", value: "fee" },
      // { text: "Iuran Range", align: "left", value: "range" }
    ]
  }),

  methods: {
    fetchRemoteData() {
      // this.loading = true;
      // this.$store.dispatch("fetchTvKabel");
    },

    generateOwnerName(ownerId) {
      var ownerName = "";
      this.$store.state.owner.forEach(owner => {
        if (ownerId === owner.id) {
          ownerName = owner.name;
        }
      });

      return ownerName;
    }
  },

  created() {
    window.getApp.$on("TOGGLE_TABLE_LOADING", () => {
      this.loading = false;
    });
  }
};
</script>
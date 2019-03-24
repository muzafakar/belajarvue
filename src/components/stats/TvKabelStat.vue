<template>
  <v-card>
    <v-card-title>
      <h3>Informasi Tv Kabel</h3>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>edit</v-icon>
      </v-btn>
    </v-card-title>

    <v-list two-line>
      <v-list-tile v-for="item in items" :key="item.key">
        <v-list-tile-content>
          <v-list-tile-sub-title>{{item.text}}</v-list-tile-sub-title>
          <v-list-tile-title>{{item.value}}</v-list-tile-title>

          <v-divider></v-divider>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    name: "",
    items: []
  }),
  mounted() {
    const obj = this.$store.state.viewedTvKabel;
    this.items.push({ text: "Nama Tv Kabel", value: obj.name });
    this.items.push({ text: "Owner", value: obj.ownerId });
    this.items.push({ text: "Alamat", value: obj.address });
    this.items.push({ text: "Iuran", value: "Rp. " + obj.cost });
    this.items.push({
      text: "Denda",
      value: obj.isFined ? "Rp. " + obj.fineCharge : "-"
    });
    this.items.push({ text: "Fee Worker", value: obj.workerFee + "%" });
    this.items.push({
      text: "Periode Pembayaran Iuran",
      value: "Tanggal " + obj.paymentRange[0] + "-" + obj.paymentRange[1]
    });
    this.items.push({ text: "Bergabung", value: obj.timestamp });
  }
};
</script>

<template>
  <v-container fluid grid-list-lg>
    <v-layout row wrap class="mb-4">
      <v-flex xs3>
        <OwnerStat/>
      </v-flex>
      <v-flex xs3>
        <InstanceStat/>
      </v-flex>
      <v-flex xs3>
        <CustomerStat/>
      </v-flex>
      <v-flex xs3>
        <AppUserStat/>
      </v-flex>
    </v-layout>

    <OwnerTable/>
  </v-container>
</template>

<script>
import OwnerTable from "../tables/OwnerTable";
import OwnerStat from "../stats/OwnerStat";
import InstanceStat from "../stats/InstanceStat";
import CustomerStat from "../stats/CustomerStat";
import AppUserStat from "../stats/AppUserStat";
export default {
  components: {
    OwnerTable,
    OwnerStat,
    CustomerStat,
    AppUserStat,
    InstanceStat
  }
};
</script>

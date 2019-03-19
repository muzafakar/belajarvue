<template>
  <v-container fluid grid-list-lg>
    <OwnerTable/>
    <NewOwner/>
  </v-container>
</template>

<script>
import OwnerTable from "../tables/OwnerTable";
import NewOwner from "../modal/NewOwner";
export default {
  components: {
    OwnerTable,
    NewOwner
  }
};
</script>


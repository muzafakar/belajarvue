<template>
  <v-container fluid grid-list-lg>
    <OwnerIterator/>
    <NewOwner/>
  </v-container>
</template>

<script>
import OwnerIterator from "../tables/OwnerIterator";
import NewOwner from "../modal/NewOwner";
export default {
  components: {
    OwnerIterator,
    NewOwner
  }
};
</script>


<template>
  <v-container fluid grid-list-lg>
    <OwnerIterator/>
    <NewOwner/>
  </v-container>
</template>

<script>
import OwnerIterator from "@/components/tables/OwnerIterator";
import NewOwner from "@/components/modal/NewOwner";
export default {
  components: {
    OwnerIterator,
    NewOwner
  }
};
</script>


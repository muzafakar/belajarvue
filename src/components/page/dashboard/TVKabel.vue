<template>
  <v-container fluid grid-list-lg>
    <TVKabelIterator/>
    <NewTVKabel/>
  </v-container>
</template>

<script>
import TVKabelIterator from "@/components/tables/TVKabelIterator";
import NewTVKabel from "@/components/modal/NewTVKabel";
export default {
  components: {
    TVKabelIterator,
    NewTVKabel
  }
};
</script>


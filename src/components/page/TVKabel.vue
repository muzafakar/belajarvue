<template>
  <v-container fluid grid-list-lg>
    <TVKabelIterator/>
    <NewTVKabel/>
  </v-container>
</template>

<script>
import TVKabelIterator from "../tables/TVKabelIterator";
import NewTVKabel from "../modal/NewTVKabel";
export default {
  components: {
    TVKabelIterator,
    NewTVKabel
  }
};
</script>


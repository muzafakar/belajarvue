<template>
  <v-container grid-list-xs>
    <h1>this is detail</h1>
    <v-img :src="src"/>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    src: "https://cdn-images-1.medium.com/max/1600/1*ACR0gj0wbx91V_xgURifWg.png"
  })
};
</script>

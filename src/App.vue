<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>
export default {
  created(){
    window.getApp = this;
  }
}
</script>

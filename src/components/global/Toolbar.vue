<template>
  <v-toolbar color="light-blue darken-1" app dark flat dense>
    <v-toolbar-title>{{title}}</v-toolbar-title>
    <v-spacer/>
    <v-btn flat icon color="white">
        <v-icon>receipt</v-icon>
    </v-btn>
    <v-btn flat icon color="primary">
      <v-avatar size="30px" color="primary">
        <img src="../../assets/muza.png" alt="alt">
      </v-avatar>
    </v-btn>
  </v-toolbar>
</template>

<script>
export default {
  props: {
    title: String
  }
};
</script>


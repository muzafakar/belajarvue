<template>
  <v-layout row wrap>
    <v-flex xs1>
      <v-divider vertical dark/>
    </v-flex>
    <v-flex xs5>
      <v-layout column align-center justify-center>
        <v-icon size="72" color="white">{{obj.icon}}</v-icon>
      </v-layout>
    </v-flex>
    <v-flex xs6>
      <v-layout column align-center justify-center fill-height>
        <h1 class="white--text">{{obj.count}}</h1>
        <h3 class="white--text">{{obj.title}}</h3>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "StatCard",
  props: {
    obj: Object
  }
};
</script>
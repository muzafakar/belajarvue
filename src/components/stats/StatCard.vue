<template>
  <v-card :color="obj.color" class="white--text">
    <v-layout row wrap>
      <v-flex xs6>
        <v-layout column align-center justify-center>
          <v-icon size="100" color="white">{{obj.icon}}</v-icon>
        </v-layout>
      </v-flex>
      <v-flex xs6>
        <v-layout column align-center justify-center fill-height>
          <h1>{{count}}</h1>
          <h3>{{obj.title}}</h3>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  name: "StatCard",
  props: {
    obj: Object,
    count: Number
  }
};
</script>


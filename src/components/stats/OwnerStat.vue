<template>
  <v-card color="light-blue" class="white--text">
    <v-layout row wrap>
      <v-flex xs6>
        <v-layout column align-center justify-center>
          <v-icon size="100" color="white">face</v-icon>
        </v-layout>
      </v-flex>
      <v-flex xs6>
        <v-layout column align-center justify-center fill-height>
          <h1>{{$store.state.owner.length}}</h1>
          <h3>Owner</h3>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-card>
</template>

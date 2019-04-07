<template>
  <div id="login" class="light-blue darken-1">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <v-card class="elevation-5 pa-3">
              <v-card-text>
                <div class="layout column align-center">
                  <v-avatar size="150" color="red">
                    <img src="../../assets/muza.png" alt="admin">
                  </v-avatar>
                  <h1 class="flex my-4 primary--text">Admin Login</h1>
                </div>
              </v-card-text>
              <v-form @keyup.enter="login()" @submit="login()">
                <v-text-field
                  name="email"
                  label="Email"
                  prepend-icon="email"
                  type="email"
                  v-model="auth.email"
                />
                <v-text-field
                  name="password"
                  label="Password"
                  prepend-icon="lock"
                  type="password"
                  v-model="auth.password"
                />
              </v-form>

              <v-card-actions>
                <v-btn
                  block
                  :loading="loading"
                  color="light-blue darken-1"
                  dark
                  @click="login()"
                >Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </div>
</template>

<script>
import { setTimeout } from "timers";
export default {
  data: () => ({
    loading: false,
    auth: {
      email: "",
      password: ""
    }
  }),
  methods: {
    login() {
      this.loading = true;
      this.$store.dispatch("login", this.auth);
    }
  },
  created() {
    window.getApp.$on("EVENT_SNACKBAR", snackbarData => {
      this.loading = false;
    });
  }
};
</script>


<style scoped>
#login {
  height: 50%;
  widows: 100%;
}
</style>


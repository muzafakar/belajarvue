<template>
  <v-app id="login" class="primary">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <v-card class="elevation-1 pa-3">
              <v-card-text>
                <div class="layout column align-center">
                  <v-avatar size="150" color="red">
                    <img src="../assets/muza.png" alt="admin">
                  </v-avatar>
                  <h1 class="flex my-4 primary--text">Admin Login</h1>
                </div>
              </v-card-text>
              <v-form>
                <v-text-field
                  name="username"
                  label="Username"
                  prepend-icon="person"
                  type="text"
                  v-model="login.username"
                />
                <v-text-field
                  name="password"
                  label="Password"
                  prepend-icon="lock"
                  type="password"
                  v-model="login.password"
                />
              </v-form>

              <v-card-actions>
                <v-btn block :loading="loading" color="primary" @click="loading = true">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { setTimeout } from "timers";
export default {
  data: () => ({
    loading: false,
    login: {
      username: "",
      password: ""
    }
  }),
  watch: {
    loading() {
      setTimeout(() => {
        this.loading = false;
        this.$router.push("/dashboard");
      }, 3000);
    }
  }
};
</script>


<style scoped>
#login {
  height: 50%;
  widows: 100%;
}
</style>


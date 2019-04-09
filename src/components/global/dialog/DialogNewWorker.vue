<template>
  <v-dialog
    v-model="showDialog"
    scrollable
    persistent
    max-width="600px"
    transition="dialog-transition"
  >
    <v-card>
      <v-card-title primary-title>
        <v-btn flat icon color="light-blue darken-1" @click="showDialog = false">
          <v-icon>close</v-icon>
        </v-btn>
        <h2 class="light-blue--text">Add New Dusun</h2>
      </v-card-title>
      <v-divider/>

      <v-text-field
        label="Name"
        v-model="name"
        class="px-5"
        prepend-icon="supervised_user_circle"
        :loading="loading"
      />
      <v-text-field
        label="Phone"
        v-model="phone"
        mask="####-####-####"
        class="px-5"
        prepend-icon="phone_android"
        :loading="loading"
      />
      <v-text-field
        label="Email"
        v-model="email"
        class="px-5"
        prepend-icon="email"
        :loading="loading"
      />

      <v-autocomplete
        color="primary"
        :items="dusunMapToArrayOfObject"
        item-text="name"
        item-value="id"
        placeholder="Dusun"
        chips
        deletable-chips
        hide-selected
        multiple
        v-model="area"
        :loading="loading"
        clearable
        class="px-5"
        prepend-icon="location_city"
      ></v-autocomplete>

      <v-divider/>
      <v-card-actions>
        <v-spacer/>
        <v-btn color="light-blue darken-1" dark :loading="loading" @click="submitWorker">add</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    showDialog: false,
    loading: false,
    name: "",
    phone: "",
    email: "",
    area: []
  }),

  watch: {
    dusun: function() {
      this.dusunId = this.setDusunId(this.dusun);
    }
  },

  computed: {
    dusunMapToArrayOfObject() {
      const keys = Object.keys(this.$store.state.dusunMap);
      const values = Object.values(this.$store.state.dusunMap);
      let arr = [];
      for (let i = 0; i < keys.length; i++) {
        const element = { id: keys[i], name: values[i] };
        arr.push(element);
      }

      return arr;
    }
  },

  mounted() {
    window.getApp.$on("EVENT_NEW_WORKER_DIALOG", () => {
      this.showDialog = true;
    });

    window.getApp.$on("EVENT_ADD_WORKER_PROCESS", () => {
      this.showDialog = this.loading = false;
    });
  },

  methods: {
    submitWorker() {
      this.loading = true;
      const worker = {
        name: this.name,
        phone: this.phone,
        email: this.email,
        area: this.area,
        timestamp: new Date()
      };

      this.$store.dispatch("addWorker", worker);
    },

    setDusunId(dusunName) {
      const object = this.$store.state.dusunMap;
      return Object.keys(object).find(key => object[key] === dusunName);
    }
  }
};
</script>
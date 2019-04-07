<template>
  <div>
  <h1>this is detail</h1>
  </div>
</template>

<script>
export default {
  data: () => ({
    active: null,
    text: "aasdkjasdkhaksdhakshdkj",
    
  }),
  methods: {
    navigateTo(destination) {
      this.$router.push(destination);
    }
  }
};
</script>

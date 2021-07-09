<template><div></div></template>

<script>
export default {
  mounted() {
    if (this.$auth?.user?.email) {
      this.$router.push('/dashboard')
      return
    }
    this.$router.push('/login')
  },
}
</script>

<style scoped></style>

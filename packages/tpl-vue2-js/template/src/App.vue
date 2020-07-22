<!-- @format -->

<template>
  <router-view id="app" class="app" />
</template>

<script>
/** @format */

export default {
  created() {
    const { meta } = this.$route;
    if (meta) {
      const { title } = meta;
      this.setTitle(title || 'loading');
    } else {
      this.setTitle('loading');
    }
  },
  methods: {
    setTitle(title) {
      this.$store.dispatch('setTitle', title);
      document.title = title;
    },
  },
  watch: {
    $route(val) {
      const { meta } = val;
      if (meta) {
        const { title } = meta;
        this.setTitle(title);
      } else {
        this.setTitle('loading');
      }
    },
  },
};
</script>

<style lang="scss">
/** @format */

@import '~assets/styles/base.scss';
</style>

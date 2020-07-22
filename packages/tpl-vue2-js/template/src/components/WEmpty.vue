<!-- @format -->

<template>
  <div class="empty">
    <div class="empty-content">
      <img class="empty-icon" src="~assets/images/welcome.svg" alt="空状态" />
      <p class="empty-text">{{ text }}</p>
      <el-button
        class="empty-button"
        type="primary"
        size="mini"
        v-if="buttonText"
        @click="btnClick"
      >{{ buttonText }}</el-button>
    </div>
  </div>
</template>

<script>
/** @format */

export default {
  props: {
    text: {
      type: String,
      default: '暂无数据',
    },
    buttonText: String,
  },
  methods: {
    btnClick() {
      this.$emit('click');
    },
  },
};
</script>

<style lang="scss">
/** @format */

@import '~assets/styles/components/empty.scss';
</style>

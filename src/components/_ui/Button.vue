<script setup>
  defineProps({
    icon: String,
    title: String
  })
</script>

<template lang="pug">
  button.ui-button
    img(:src='icon')
    span {{ title }}
</template>

<style lang="scss" scoped>
  .ui-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 10px 30px;
    text-align: center;
    background: #fff;
    border: 1px solid #eaeaea;
    border-radius: 12px;
    transition: 0.3s;
    cursor: pointer;
    &--bg-green {
      color: #00bb6d;
      background-color: #e6f9f1;
      border-color: #e6f9f1;
    }
    &--bg-light-purple {
      color: #6a53f5;
      background-color: #f1eefe;
      border-color: #f1eefe;
    }
    &--bg-purple {
      color: #fff;
      background-color: #6a53f5;
      border-color: #6a53f5;
    }
  }
</style>

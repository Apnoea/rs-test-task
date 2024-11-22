<script setup>
  import Button from './_ui/Button.vue'
  defineProps({
    clearFilter: Function
  })
</script>

<template lang="pug">
  .not-found
    .not-found__image
      img(src='@/assets/images/not-found_img.png')
    .not-found__title По данным параметрам ничего не найдено
    .not-found__descr Попробуйте изменить параметры фильтрации или вернуться в общий каталог
    Button(@click='clearFilter' class='not-found__ui-button ui-button--bg-light-purple' title='Очистить фильтр')
</template>

<style lang="scss" scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 55px;
  text-align: center;
  border: 1px solid #eaeaea;
  border-radius: 15px;
  &__image {
    max-width: 240px;
    margin-bottom: 35px;
  }
  &__title {
    font: 700 18px/1.5 var(--font);
  }
  &__descr {
    margin-top: 8px;
    max-width: 330px;
    color: #969696;
  }
  &__ui-button {
    margin-top: 25px;
  }
}
</style>

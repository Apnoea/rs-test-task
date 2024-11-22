<script setup>
  import { ref } from 'vue'
  import Button from './_ui/Button.vue'

  const props = defineProps({
    title: String,
    rating: String,
    type: String,
    reviews: String,
    country: String,
    descr: String,
    isBooked: Boolean,
    price: Number
  })

  const updateIsBooked = ref(props.isBooked)
  function toggleBooking() {
    updateIsBooked.value = !updateIsBooked.value
  }
</script>

<template lang="pug">
  .card
    .card__row
      div
        .card__title {{ title }}
        .card__info
          .card__rating
            img(:src="'/src/assets/images/rating' + rating + '.png'")
          .card__type {{ type }}
          .card__reviews(v-if='reviews % 10 === 1 && reviews % 100 !== 11') {{ reviews }} отзыв
          .card__reviews(v-else-if='(reviews % 10 >= 2 && reviews % 10 <= 4) && (reviews % 100 < 12 || reviews % 100 > 14)') {{ reviews }} отзыва
          .card__reviews(v-else) {{ reviews }} отзывов
          .card__geo {{ country }}
      div
      .card__price {{ Math.round(price).toLocaleString('ru-RU') }} ₽
        span Цена за 1 ночь
    .card__row
      .card__descr {{ descr }}
      Button(@click='toggleBooking' :class="updateIsBooked ? 'ui-button--bg-green' : 'ui-button--bg-light-purple'" :icon="updateIsBooked ? '/src/assets/icon_tick.svg' : '/src/assets/icon_booking.svg'" :title="updateIsBooked ? 'Забронировано' : 'Забронировать'")
</template>

<style lang="scss" scoped>
  .card {
    padding: 25px;
    border: 1px solid #eaeaea;
    border-radius: 15px;
    &__row {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    &__title {
      font: 700 20px/26px var(--font);
    }
    &__info {
      display: flex;
      align-items: center;
      gap: 15px;
      margin-top: 6px;
    }
    &__rating {
      max-width: 94px;
    }
    &__type {
      color: #868686;
    }
    &__reviews {
      position: relative;
      color: #868686;
      &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: -8px;
        transform: translateY(-50%);
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background-color: #868686;
      }
    }
    &__geo {
      display: flex;
      align-items: center;
      gap: 8px;
      &::before {
        content: '';
        display: block;
        width: 10px;
        height: 15px;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='15' fill='none'%3E%3Cpath fill='%233A3A3A' fill-rule='evenodd' d='M5.25 1.545c-2.058 0-3.719 1.703-3.719 3.814 0 1.812.96 3.867 1.952 5.499a24.655 24.655 0 0 0 1.765 2.522 25.716 25.716 0 0 0 1.768-2.552C8.01 9.185 8.97 7.13 8.97 5.359c0-2.11-1.661-3.814-3.719-3.814Zm0 12.26-.2.179v-.001l-.003-.003-.01-.01a21.874 21.874 0 0 1-.62-.785c-.377-.502-.88-1.21-1.385-2.039C2.032 9.501 1 7.334 1 5.359 1 2.947 2.899 1 5.25 1S9.5 2.947 9.5 5.359c0 1.934-1.033 4.102-2.032 5.756a26.252 26.252 0 0 1-1.97 2.81 6.925 6.925 0 0 1-.034.042l-.01.011-.002.003v.001l-.202-.177Zm0 0 .201.177a.263.263 0 0 1-.4.002l.199-.18Z' clip-rule='evenodd'/%3E%3Cpath stroke='%233A3A3A' stroke-linejoin='round' stroke-miterlimit='10' stroke-width='.4' d='m5.25 13.805-.2.179v-.001l-.003-.003-.01-.01a21.874 21.874 0 0 1-.62-.785c-.377-.502-.88-1.21-1.385-2.039C2.032 9.501 1 7.334 1 5.359 1 2.947 2.899 1 5.25 1S9.5 2.947 9.5 5.359c0 1.934-1.033 4.102-2.032 5.756a26.252 26.252 0 0 1-1.97 2.81 6.925 6.925 0 0 1-.034.042l-.01.011-.002.003v.001l-.202-.177Zm0 0 .201.177a.263.263 0 0 1-.4.002l.199-.18ZM1.531 5.359c0-2.11 1.661-3.814 3.719-3.814s3.719 1.703 3.719 3.814c0 1.77-.96 3.826-1.953 5.469a25.718 25.718 0 0 1-1.768 2.552 24.655 24.655 0 0 1-1.765-2.522C2.491 9.226 1.531 7.17 1.531 5.359Z'/%3E%3Cpath fill='%233A3A3A' fill-rule='evenodd' stroke='%233A3A3A' stroke-linejoin='round' stroke-miterlimit='10' stroke-width='.4' d='M4.094 4.748A1.635 1.635 0 1 1 6.406 7.06a1.635 1.635 0 0 1-2.312-2.312Zm1.156-.012a1.168 1.168 0 1 0 0 2.335 1.168 1.168 0 0 0 0-2.335Z' clip-rule='evenodd'/%3E%3C/svg%3E");
      }
    }
    &__price {
      font: 700 25px/32px var(--font);
      span {
        display: block;
        font-size: 12px;
        color: #868686;
      }
    }
    &__descr {
      max-width: 560px;
    }
  }
</style>

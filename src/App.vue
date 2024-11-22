<script setup>
  import { ref, computed } from 'vue'
  import Button from './components/_ui/Button.vue'
  import Input from './components/_ui/Input.vue'
  import Card from './components/Card.vue'
  import NotFound from './components/NotFound.vue'
  import Pagination from './components/Pagination.vue'
  import Slider from '@vueform/slider'

  import hotelsData from '../hotels.json'

  const countries = ['Австрия', 'Азербайджан', 'Албания', 'Алжир', 'Ангола', 'Андорра']
  const selectedCountry = ref([])
  const selectedTypes = ref([])
  const selectedRating = ref([])
  const selectedReviews = ref('')
  const selectedPrice = ref([1000, 3000])
  const activeCountry = ref([])
  const activeTypes = ref([])
  const activeRating = ref([])
  const activeReviews = ref(0)
  const activePrice = ref([])
  const currentPage = ref(1)

  const filteredItems = computed(() => {
    return hotelsData.hotels.filter(item => {
      return (
        (activeCountry.value.length === 0 || activeCountry.value.includes(item.country)) &&
        (activeTypes.value.length === 0 || activeTypes.value.includes(item.type)) &&
        (activeRating.value.length === 0 || activeRating.value.includes(item.stars)) &&
        (activeReviews.value <= item.reviews_amount) &&
        (activePrice.value.length === 0 || item.min_price >= activePrice.value[0] && item.min_price <= activePrice.value[1])
      )
    })
  })

  const applyFilter = () => {
    activeCountry.value = selectedCountry.value
    activeTypes.value = selectedTypes.value
    activeRating.value = selectedRating.value
    activeReviews.value = selectedReviews.value
    activePrice.value = selectedPrice.value
  }

  const clearFilter = () => {
    selectedCountry.value = []
    selectedTypes.value = []
    selectedRating.value = []
    selectedReviews.value = ''
    selectedPrice.value = ['', Infinity]
    applyFilter()
  }

  const paginatedItems = computed(() => {
    const startIndex = (currentPage.value - 1) * 3
    return filteredItems.value.slice(startIndex, startIndex + 3)
  })
  function onClickHandler(page) { currentPage.value = page }
</script>

<template lang="pug">
  main.main
    .inner
      section.section
        .aside
          .filter
            .filter__body
              .filter__item
                .filter__title Страна
                Multiselect(v-model='selectedCountry' :options='countries' :multiple='true' placeholder='Поиск стран')
              .filter__item
                .filter__title Тип
                .filter__content.filter__content--bg
                  .ui-checkbox
                    input(id='checkbox1' type='checkbox' value='Апартаменты' v-model='selectedTypes')
                    label(for='checkbox1') Апартаменты
                  .ui-checkbox
                    input(id='checkbox2' type='checkbox' value='Отель' v-model='selectedTypes')
                    label(for='checkbox2') Отель
              .filter__item
                .filter__title Количество звезд
                .filter__content
                  .ui-checkbox(v-for='(star, index) in [1, 2, 3, 4, 5]' :key='star')
                    input(:id="'rating' + index" type='checkbox' :value='star' v-model='selectedRating')
                    label(v-if='star === 1' :for="'rating' + index") {{ star }} звезда
                    label(v-else-if='star === 5' :for="'rating' + index") {{ star }} звезд
                    label(v-else='' :for="'rating' + index") {{ star }} здезды
              .filter__item
                .filter__title Количество отзывов (от)
                Input(v-model='selectedReviews' id='reviewsInput' placeholder='Например, от 10' type='number' step='1')
              .filter__item
                .filter__title Цена
                .filter__row
                  Input(v-model='selectedPrice[0]' id='minPriceInput' placeholder='от 0 ₽' type='number' step='1')
                  span
                  Input(v-model='selectedPrice[1]' id='maxPriceInput' placeholder='до 5 000 ₽' type='number' step='1')
                br
                Slider(v-model='selectedPrice' :min='0', :max='5000' :tooltips='false')
            .filter__foot
              Button(@click='applyFilter' class='ui-button--bg-purple' title='Применить фильтр')
              Button(@click='clearFilter' title='Очистить фильтр')
        .container
          .container__body(v-for='index in 1')
            Card(v-for='card in filteredItems' :title='card.name' :rating='card.stars' :type='card.type' :reviews='card.reviews_amount' :country='card.country' :price='card.min_price' :descr='card.description' :isBooked='card.isBooked')
            NotFound(v-if='filteredItems.length === 0' :clear-filter='clearFilter')
          .container__foot
            vue-awesome-paginate(v-if='filteredItems.length > 0' :total-items='filteredItems.length' :items-per-page='3' prev-button-content='< Назад' next-button-content='Следующая >' v-model='currentPage' @click='onClickHandler')
</template>

<style lang="scss" scoped>
  .inner {
    width: 100%;
    max-width: 1250px;
    margin: 0 auto;
    padding: 0 25px;
  }
  .section {
    display: flex;
    gap: 40px;
  }
  .filter {
    flex-shrink: 0;
    width: 325px;
    &__body {
      display: grid;
      gap: 25px;
    }
    &__title {
      margin-bottom: 14px;
      font-weight: 700;
    }
    &__content {
      display: grid;
      gap: 15px;
      padding: 25px 20px;
      border: 1px solid #eaeaea;
      border-radius: 10px;
      &--bg {
        background-color: #fafafa;
        .ui-checkbox {
          &:first-child {
            padding-bottom: 15px;
            border-bottom: 1px solid #eaeaea;
          }
        }
      }
    }
    &__row {
      display: flex;
      align-items: center;
      gap: 10px;
      span {
        display: block;
        width: 10px;
        height: 1px;
        background-color: #c4c4c4;
      }
    }
    &__foot {
      display: grid;
      gap: 15px;
      margin-top: 40px;
    }
  }
  .ui-checkbox {
    position: relative;
    input {
      display: none;
      &:checked + label {
        &::before {
          background-color: #00bb6d;
          border-color: #00bb6d;
        }
        &::after {
          opacity: 1;
        }
      }
    }
    label {
      position: relative;
      padding-left: 30px;
      cursor: pointer;
      user-select: none;
      &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        width: 20px;
        height: 20px;
        border: 1px solid #ccc;
        border-radius: 3px;
        transition: 0.3s;
      }
      &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 5px;
        transform: translateY(-50%);
        width: 10px;
        height: 10px;
        background-image: url("data:image/svg+xml,%3Csvg width='10' height='8' viewBox='0 0 10 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.5 3.5L4.5 7L9 1' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
        opacity: 0;
        transition: 0.3s;
      }
    }
  }
  .container {
    width: 100%;
    &__body {
      display: grid;
      gap: 15px;
    }
    &__foot {
      display: flex;
      justify-content: center;
      margin-top: 40px;
    }
  }
</style>

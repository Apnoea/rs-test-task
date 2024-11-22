<script setup>
</script>

<template lang="pug">
  .pagination
    a.pagination__link.pagination__link--prev.pagination__link--disabled(href='#')
      svg(xmlns='http://www.w3.org/2000/svg' width='8' height='12' viewbox='0 0 8 12')
        path(fill='currentColor' d='M7.41 1.41L6 0 0 6l6 6 1.41-1.41L2.83 6z')
    ul.pagination__list
      each item, index in [1, 2, 3]
          li.pagination__item(class=(index === 0 ? 'pagination__item--active' : ''))
            a.pagination__link(href='#')=item
    a.pagination__link.pagination__link--next(href='#')
      svg(xmlns='http://www.w3.org/2000/svg' width='8' height='12' viewbox='0 0 8 12')
        path(fill='currentColor' d='M7.41 1.41L6 0 0 6l6 6 1.41-1.41L2.83 6z')
</template>

<style lang="scss" scoped>
  .pagination {
    display: flex;
    justify-content: center;
    &__link {
      position: relative;
      text-align: center;
      width: 34px;
      height: 34px;
      font: 14px/34px 'Arial';
      // color: $black;
      background: #fff;
      border-radius: 4px;
      transition: 0.3s;
      // @include media-hover {
      //   color: $primary1;
      // }
      &--prev,
      &--next {
        // background: $primary1;
        svg {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 10px;
          height: 14px;
          color: #fff;
        }
      }
      &--next {
        svg {
          transform: rotate(180deg) translate(50%, 50%);
        }
      }
      &--disabled {
        background: 0;
        border: 1px solid #d6d6d6;
        box-shadow: -6px -6px 12px rgba(255 255 255 / 0.1);
        cursor: default;
        svg {
          color: #d6d6d6;
        }
        // @include media-hover {
        //   background: inherit;
        //   svg {
        //     color: #d6d6d6;
        //   }
        // }
      }
    }
    &__list {
      display: flex;
      margin: 0 20px;
    }
    &__item {
      margin-right: 10px;
      &:last-child {
        margin-right: 0;
      }
      &--active {
        .pagination__link {
          // color: $primary1;
          cursor: default;
        }
      }
    }
  }
</style>

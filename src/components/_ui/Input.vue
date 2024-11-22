<script setup>
  defineProps({
    id: String,
    placeholder: String,
    label: String,
    type: String,
    modelValue: String
  })

  const emit = defineEmits(['update:modelValue'])

  const updateValue = (event) => {
    emit('update:modelValue', event.target.value)
  }
</script>

<template lang="pug">
  .ui-input
    input(:type='type' :value='modelValue' @input='updateValue' :placeholder='placeholder')
    if label
      label(:for='id') {{ label }}
</template>

<style lang="scss" scoped>
  .ui-input {
    position: relative;
    input {
      width: 100%;
      padding: 15px 20px;
      background: #fff;
      border: 1px solid #eaeaea;
      border-radius: 10px;
      outline: none;
      &.filled ~ label,
      &:focus ~ label {
        bottom: 100%;
        > div {
          font-size: 10px;
        }
      }
      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        display: none
      }
    }
    label {
      position: absolute;
      display: block;
      bottom: 50%;
      left: 15px;
      transform: translateY(50%);
      padding: 3px 5px;
      color: #b2b2b2;
      background-color: #fff;
      border-radius: 5px;
      transition: 0.3s;
      pointer-events: none;
      > div {
        transition: inherit;
      }
    }
  }
</style>

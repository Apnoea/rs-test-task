<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: Array,
  id: String,
  value: String
});

const emit = defineEmits(['update:modelValue'])

const isChecked = computed(() => {
  return props.modelValue.includes(props.value)
})

const updateValue = (event) => {
  const selectedValue = event.target.checked
  const updatedModelValue = selectedValue
    ? [...props.modelValue, props.value]
    : props.modelValue.filter(val => val !== props.value)

  emit('update:modelValue', updatedModelValue)
}
</script>

<template lang="pug">
  .ui-checkbox
    input(:id='id' type='checkbox' :checked='isChecked' @change='updateValue')
    label(:for='id') {{ value }}
      slot
</template>

<style lang="scss" scoped>
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
</style>

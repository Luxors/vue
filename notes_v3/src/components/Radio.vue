<script setup lang="ts">
export interface Props {
  modelValue: string;
  val: string;
  caption: string;
}

defineProps<Props>();
defineEmits(['update:modelValue']);
</script>

<template>
  <div class="radio">
    <input
      class="radio__input"
      type="radio"
      :id="caption"
      name="priority"
      :value="val"
      :checked="modelValue === val"
      @change="$emit('update:modelValue', val)"
    />
    <label class="radio__label" :for="caption">{{ caption }}</label>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/radio.scss';
</style>

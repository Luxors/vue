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
  <span>
    <input
      type="radio"
      :id="caption"
      name="priority"
      :value="val"
      @change="$emit('update:modelValue', val)"
    />
    <label :for="caption">{{ caption }}</label>
  </span>
</template>

<style lang="scss" scoped>
span:not(:last-child) {
  margin-right: 15px;
}
input {
  display: inline-block;
  vertical-align: middle;
  width: auto;
  margin-right: 5px;
  margin-bottom: 0;
  cursor: pointer;
}
label {
  display: inline-block;
  vertical-align: middle;
  margin-bottom: 0;
  line-height: 1;
  cursor: pointer;
}
</style>

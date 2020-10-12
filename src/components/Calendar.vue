<template>
   <div class="field">
      <label :for="id" class="label">{{ label }}</label>
      <div class="control">
         <PrimeCalendar :id="id" v-model="value" v-bind="$attrs" v-mask="'##/##/####'" dateFormat="dd/mm/yy" 
            :yearNavigator="true" yearRange="1900:2100" :monthNavigator="true" :manualInput="true" showIcon="true"/>
      </div>
   </div>
</template>

<script>
import {mask} from 'vue-the-mask';

export default {
   name: 'Calendar',
   inheritAttrs: false,
   directives: {mask},
   props: {
      id: {
         type: String 
      },
      modelValue: {
         type: Object,
      },
      label: {
         type: String
      }
   },
   computed: {
      value: {
         get() {
            return this.modelValue
         },
         set(value) {
            this.$emit('update:modelValue', value)
         }
      }
   }
}
</script>
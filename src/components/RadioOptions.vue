<template>
   <div class="field is-narrow">
      <label class="label">{{ label }}</label>
      <div class="control">
         <label :for="id + item[itemKey]" class="radio" v-for="item in items" :key="item[itemKey]">
            <PrimeRadioButton :id="id + item[itemKey]" :name="label" :value="item[itemKey]" v-model="value"
               @change="$emit('change', item[itemKey])" /> {{ item[itemValue] }}
         </label>
      </div>
   </div>
</template>

<script>
export default {
   name: 'RadioOptions',
   inheritAttrs: false,
   props: {
      id: {
         type: String 
      },
      modelValue: {
         type: Object,
      },
      label: {
         type: String
      },
      items: {
         type: Array
      },
      itemKey: {
         type: Object
      },
      itemValue: {
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
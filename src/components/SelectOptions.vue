<template>
   <div class="field">
      <label :for="id" class="label">{{ label }}</label>
      <div class="control">
         <Field :name="id" v-slot="{ field }">
            <PrimeDropdown :id="id" v-model="value" :options="items" :optionLabel="itemValue" v-bind="field" placeholder="Choose a blood group"
               @change="this.$emit('change', $event)">
               <!-- <option value="0" :selected="true">Choose Province</option>
               <option v-for="item in items" :key="item[itemKey]" :value="item[itemKey]">{{ item[itemValue] }}</option> -->
            </PrimeDropdown>
            <ErrorMessage :name="id" v-slot="{ message }" as="div">
               <InlineMessage v-show="message">{{ message }}</InlineMessage>
            </ErrorMessage>
         </Field>
      </div>
   </div>
</template>

<script>
import { Field, ErrorMessage } from 'vee-validate';
import InlineMessage from 'primevue/inlinemessage';

export default {
   name: 'SelectOptions',
   inheritAttrs: false,
   components: {
      Field,
      ErrorMessage,
      InlineMessage
   },
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
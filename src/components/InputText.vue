<template>
   <div class="field">
      <label :for="id" class="label">{{ label }}</label>
      <div class="control">
         <Field :name="id" v-slot="{ field }">
            <PrimeInputText :id="id" :name="id" :label="label" class="input" :type="type" v-model="value" v-bind="field" :placeHolder="placeHolder" />
            <ErrorMessage :name="id" v-slot="{ message }">
               <InlineMessage v-if="message">{{ $t(message) }}</InlineMessage>
            </ErrorMessage>
         </Field>
      </div>
   </div>
</template>

<script>
import { Field, ErrorMessage } from 'vee-validate';
import InlineMessage from 'primevue/inlinemessage';
import { useI18n } from "vue-i18n";

export default {
   name: 'InputText',
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
      type: {
         type: String,
         default: 'text'
      },
      placeHolder: {
         type: String
      },
      trim: {
         type: Boolean,
         default: true
      }
   },
   setup() {
      const {t} = useI18n();

      return {t};
   },
   computed: {
      value: {
         get() {
            return this.modelValue
         },
         set(value) {
            this.$emit('update:modelValue', this.trim ? value.trim() : value)
         }
      }
   }
}
</script>
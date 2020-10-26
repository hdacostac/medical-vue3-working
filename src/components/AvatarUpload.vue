<template>
   <div class="card">
      <header class="card-header">
         <p class="card-header-title">{{ $t('avatar.patient.title') }}</p>
      </header>
      <div class="card-content">
         <figure class="image is-256x256" style="margin: 0 auto">
            <img :src="avatar.src">
         </figure>
         <div class="file">
            <FileUpload mode="basic" :customUpload="true" @uploader="avatarUploader" accept="image/*" 
               :maxFileSize="avatarImageMaxSizeValue" auto="true" 
               :chooseLabel="chooseLabel"
               :disabled="uploadDisabled"
               :invalidFileSizeMessage="$t('avatar.patient.invalid.file.size.message', [calculateMB])">
            </FileUpload>
         </div>
      </div>
   </div>
</template>

<script>
import FileUpload from 'primevue/fileupload';
import { useI18n } from "vue-i18n";

import showMessage from '@/controllers/MessagesController';
import { restApi } from '@/configuration/rest.config';
import { avatarImageMaxSize } from "../../application-properties.json";

export default {
   name: 'AvatarUpload',
   data() {
      return {
         uploadDisabled: false,
         avatarImageMaxSizeValue: avatarImageMaxSize
      }
   },
   emits: ['on-success'],
   props: {
      avatar: {
         type: Object,
      }
   },
   setup() {
      const {t, locale} = useI18n();

      return {t, locale};
   },
   components: {
      FileUpload
   },
   computed: {
      calculateMB: function() {
         return (this.avatarImageMaxSizeValue / 1000000).toFixed(2);
      },
      chooseLabel: function() {
         return this.uploadDisabled ? this.t('avatar.patient.uploading') : this.t('avatar.patient.choose.image');
      }
   },
   methods: {
      avatarUploader(event) {
         this.uploadDisabled = true;
         showMessage(this, {severity: 'info', summary: this.t('global.in.process'), detail: this.t('avatar.patient.uploading.detail.message'), life: 3000});

         let formData = new FormData();
         formData.append("image", event.files[0]);

         let self = this;
         restApi.post('/v1/resources/image', formData, {
            headers: {
               'Content-Type': 'multipart/form-data'
            }
         // eslint-disable-next-line no-unused-vars
         }).then(function(res) {
            console.log("Response:" + res.data['messageKey']);

            showMessage(self, {severity: 'success', summary: self.t('global.done'), detail: self.t('avatar.patient.upload.done'), life: 6000});

            self.uploadDisabled = false;

            self.$emit('on-success', res.data);
         }).catch(e => {
            console.log(e);

            showMessage(self, {severity: 'error', summary: self.t('global.problem'), detail: self.t('avatar.patient.upload.problem'), life: 3000});

            self.uploadDisabled = false;
         });
      }
	}
}
</script>
<template>
   <div class="card">
      <header class="card-header">
         <p class="card-header-title">Foto del paciente</p>
      </header>
      <div class="card-content">
         <figure class="image is-256x256" style="margin: 0 auto">
            <img :src="avatar.src">
         </figure>
         <div class="file">
            <label class="file-label" style="margin: 0 auto">
               <input class="file-input" type="file" name="resume">
               <span class="file-cta">
                  <span class="file-icon">
                     <i class="fas fa-upload"></i>
                  </span>
                  <span class="file-label">Choose a file…</span>
               </span>
            </label>
         </div>
      </div>
   </div>
</template>

<script>
export default {
   name: 'AvatarUpload',
   props: {
      avatar: {
         type: Object,
      }
   }
}
</script>
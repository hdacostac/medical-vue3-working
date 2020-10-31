<template>
   <div class="layout-wrapper layout-static" :class="{ 'layout-static-inactive': sideMenuOn }">
      
      <Toast />
      <div class="topbar clearfix">
         <button class="p-link menu-button" @click="toggleSideMenu">
            <i class="pi pi-bars"></i>
         </button>
         <a href="#/" class="logo-link" aria-current="page">
            <img alt="apollo-layout" src="@/assets/images/apollo_logo.png" class="logo">
         </a>
         <button class="p-link profile" @click="toggleProfileMenu" aria-haspopup="true" aria-controls="overlay_menu">
            <span class="username">Sarah Miller</span>
            <img src="@/assets/images/avatar.png" alt="apollo-layout">
            <i class="pi pi-angle-down"></i>
         </button>
         <span class="topbar-search">
            <InputText type="text" placeholder="Search" />
            <span class="pi pi-search"></span>
         </span>
         <span class="topbar-search">
            <Locale />
         </span>
      </div>
      <div class="layout-menu-container" :style="{ display: sideMenuOn ? 'none' : 'block' }">
         <div class="layout-menu-title">MENU</div>
         <PanelMenu :model="items" />
      </div>
      <div class="layout-content">
         <div class="layout-content-container">
            <Menu id="overlay_menu" ref="menu" :model="items" :popup="true" />
            <slot />
         </div>
      </div>
   </div>
</template>

<style scoped>
   .layout-wrapper .topbar .topbar-search {
      top: 0;
   }

   .layout-wrapper .topbar .topbar-search .pi {
      top: 6px;
   }
</style>

<script>
import 'bulma/css/bulma.min.css';
// import 'bulma-extensions/bulma-pageloader/dist/css/bulma-pageloader.min.css';
// import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

// import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Menu from 'primevue/menu';
import PanelMenu from 'primevue/panelmenu';
import Toast from 'primevue/toast';
import Locale from '@/components/Locale.vue'

// import '@/assets/styles/theme-blue-light.css';
// import '@/assets/styles/layout-blue-light.css';

export default {
   name: "MainLayoutApollo",
   components: {
      InputText,
      Menu,
      PanelMenu,
      Toast,
      Locale
  },
  data() {
      return {
         sideMenuOn: true,
         items: [
            {
               label: 'Options',
               items: [{
                  label: 'Update',
                  icon: 'pi pi-refresh',
                  command: () => {
                        this.$toast.add({severity:'success', summary:'Updated', detail:'Data Updated', life: 3000});
                  }
               },
               {
                  label: 'Delete',
                  icon: 'pi pi-times',
                  command: () => {
                        this.$toast.add({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted', life: 3000});
                  }
               }
            ]},
            {
               label: 'Navigate',
               items: [{
                  label: 'Vue Website',
                  icon: 'pi pi-external-link',
                  url: 'https://vuejs.org/'
               },
               {
                  label: 'Router',
                  icon: 'pi pi-upload',
                  to: '/fileupload'
               }
            ]}
         ]
   }},
   methods: {
      toggleSideMenu() {
         this.sideMenuOn = !this.sideMenuOn;
      },
      toggleProfileMenu(event) {
         this.$refs.menu.toggle(event);
      }
   },
   mounted() {
      this.toggleSideMenu();
   }
};
</script>


<template>
   <div>
      <Toast />
      <!-- START NAV -->
      <nav class="navbar is-white">
         <div class="container">
            <div class="navbar-brand">
               <a class="navbar-item brand-text" href="../index.html">Bulma Admin</a>
               <div class="navbar-burger burger" data-target="navMenu">
                  <span></span>
                  <span></span>
                  <span></span>
               </div>
            </div>
            <div id="navMenu" class="navbar-menu">
               <div class="navbar-start">
                  <a class="navbar-item" href="admin.html">Home</a>
                  <a class="navbar-item" href="admin.html">Orders</a>
                  <a class="navbar-item" href="admin.html">Payments</a>
                  <a class="navbar-item" href="admin.html">Exceptions</a>
                  <a class="navbar-item" href="admin.html">Reports</a>
               </div>
               <div class="navbar-end">
                  <div class="navbar-item">
                     <div class="field is-grouped">
                        <p class="control">
                           <Locale />
                        </p>
                        <p class="control">
                           <a class="button is-small">
                             <span class="icon"><i class="fa fa-user-plus"></i></span>
                             <span>Register</span>
                           </a>
                        </p>
                        <p class="control">
                          <a class="button is-small is-info is-outlined">
                            <span class="icon"><i class="fa fa-user"></i></span>
                            <span>Login</span>
                          </a>
                        </p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </nav>
      <!-- END NAV -->
      <div class="container">
         <div class="columns">
            <div class="column is-2">
               <aside class="menu is-hidden-mobile">
                  <p class="menu-label">
                     General
                  </p>
                  <ul class="menu-list">
                     <li><a class="is-active">Dashboard</a></li>
                     <li><a>Customers</a></li>
                     <li><a>Other</a></li>
                  </ul>
                  <p class="menu-label">
                     Administration
                  </p>
                  <ul class="menu-list">
                     <li><a>Team Settings</a></li>
                     <li>
                        <a>Manage Your Team</a>
                        <ul>
                           <li><a>Members</a></li>
                           <li><a>Plugins</a></li>
                           <li><a>Add a member</a></li>
                           <li><a>Remove a member</a></li>
                        </ul>
                     </li>
                     <li><a>Invitations</a></li>
                     <li><a>Cloud Storage Environment Settings</a></li>
                     <li><a>Authentication</a></li>
                     <li><a>Payments</a></li>
                  </ul>
                  <p class="menu-label">
                     Transactions
                  </p>
                  <ul class="menu-list">
                     <li><a>Payments</a></li>
                     <li><a>Transfers</a></li>
                     <li><a>Balance</a></li>
                     <li><a>Reports</a></li>
                  </ul>
               </aside>
            </div>
            <div class="column is-10">
               <nav class="breadcrumb" aria-label="breadcrumbs" style="display: none">
                  <ul>
                     <li><a href="../">Bulma</a></li>
                     <li><a href="../">Templates</a></li>
                     <li><a href="../">Examples</a></li>
                     <li class="is-active"><a href="#" aria-current="page">Admin</a></li>
                  </ul>
               </nav>
               <slot/>
            </div>
         </div>
      </div>
   </div>
</template>
<script>
import 'bulma/css/bulma.min.css';
import '@/assets/styles/admin.css';

import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

import Locale from '@/components/Locale.vue'
import Toast from 'primevue/toast';

export default {
  name: "MainLayout",
  components: {
      Locale,
      Toast
  },
};
</script>


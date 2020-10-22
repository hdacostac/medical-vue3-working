<template>
   <div class="tabs">
      <ul>
         <li v-for='tab in model' :key='tab.tabId' :class="{'is-active': tab.isActive}">
            <a @click.prevent="selectTab(tab.tabId)">{{ tab.title }}</a>
         </li>
      </ul>
   </div>
</template>

<script>
export default {
   name: 'Tabs',
   props: {
      model: Array
   },
   mounted() {
      this.model.forEach(tab => {
         let tabElement = document.querySelector("#" + tab.tabId);

         tab.isActive ? tabElement.style.display = "block" : tabElement.style.display = "none";
      });
   },
   methods: {
      selectTab: function(tabSelectedId) {
         this.model.forEach(tab => {
            let tabElement = document.querySelector("#" + tab.tabId);

            if(tab.tabId === tabSelectedId){
               tabElement.style.display = "block";
               tab.isActive = true;
            } else {
               tabElement.style.display = "none";
               tab.isActive = false;
            }
         });
      }
   }
}
</script>
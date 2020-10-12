<template>
   <div class="tabs">
      <ul>
         <li v-for='tab in model' :key='tab.tab_id' :class="{'is-active': tab.is_active}">
            <a @click.prevent="selectTab(tab.tab_id)">{{ tab.title }}</a>
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
         let tabElement = document.querySelector("#" + tab.tab_id);

         tab.is_active ? tabElement.style.display = "block" : tabElement.style.display = "none";
      });
   },
   methods: {
      selectTab: function(tabSelectedId) {
         this.model.forEach(tab => {
            let tabElement = document.querySelector("#" + tab.tab_id);

            if(tab.tab_id === tabSelectedId){
               tabElement.style.display = "block";
               tab.is_active = true;
            } else {
               tabElement.style.display = "none";
               tab.is_active = false;
            }
         });
      }
   }
}
</script>
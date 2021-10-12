<template>

<li :class="{ done: done }" @click="$emit('done')">  <!--
    v-for - řetězec pro vypsání obashu (item - prvek ve zdroji, items - zdroj dat) /* OPRAVENO */
    :key - každý výpis by měl mít unikátní "klíč", aby se nastalo že budou dva stejné výpisy - nastane error /* OPRAVENO */
    (používá se pro string a čísla, nepoužívat pro malé hodnoty jako obejkty a pole)
  -->
      <span>{{ content }}</span>
      <!--
        :class - pokud "todo.done" je aktivní, objeví se třída "done" /* NEOPRAVENO */
        @click - po kliknutí se ???
      -->
      <button @click="$emit('remove')">Remove</button>
      <!--
        p
o kliknutí se odstraní todo ze seznamu listů
      -->
</li>
</template>

<script>
import { defineComponent } from '@vue/runtime-core';

export default defineComponent({
  name: 'ToDoItem',
  props: {
    content: String,
    done: Boolean,
  },
  emits: ['remove', 'done'],

})

</script>

<style scoped lang="scss">
$quaternalyCol: #01c400;
$quinaryCol: #d50204;
li{
  background: $quinaryCol;
  cursor: pointer;
}
.done{
  background: $quaternalyCol;
}
</style>

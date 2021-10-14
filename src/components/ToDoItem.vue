<template>
  <li :class="[$style.item_li, { [$style.done]: done }]" @click="$emit('done')">
    <!--
    === 14. října ===
    - více class se definují do pole
    - classa se definuje jako $style.název-třídy
    - { až je podmínka done splněna - přidá se třída done}
    - nepoužívát globalní znaky ul li, ale třídy - globální znanky by se aplikovali i v osatních stránkách
    -->

    <!--
    - v-for - řetězec pro vypsání obashu (item - prvek ve zdroji, items - zdroj dat) /* OPRAVENO */
    - :key - každý výpis by měl mít unikátní "klíč", aby se nastalo že budou dva stejné výpisy - nastane error /* OPRAVENO */
        - (používá se pro string a čísla, nepoužívat pro malé hodnoty jako obejkty a pole)
    -->
    <span :class="$style.item_span">{{ content }}</span>

    <!--
        :class - pokud "todo.done" je aktivní, objeví se třída "done" /* NEOPRAVENO */
        @click - po kliknutí se ???
      -->
    <button :class="$style.item_button" @click="$emit('remove')">Remove</button>
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
});
</script>

<style module lang="scss">
$primaryCol: white;
$secondaryCol: darkorchid;
$tercialyCol: purple;

$quaternalyCol: #01c400;
$quinaryCol: #d50204;

.item_li {
  width: 100%;
  background: $quinaryCol;
  cursor: pointer;
  width: 92%;
  border: 1px solid $primaryCol;
  border-radius: 5px;
  padding: 10px 10px 10px 10px;
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  margin: 10px 0;
}
.item_span {
  padding: 0;
  margin: 5px 0 0 0;
}
.item_button {
  background: purple;
  color: $primaryCol;
  border-radius: 3px;
  border: none;
  font-size: 13px;
  padding: 5px 4px;
  cursor: pointer;
  &:hover {
    background: $secondaryCol;
  }
}
.done {
  background: $quaternalyCol;
}
</style>

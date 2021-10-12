<template>

  <h1>ToDo App</h1>
  <!-- vytvoření form + přidání funkce -->
  <!-- submit prevent - po zadání do inputu + enter, se nerefreshne stránka) -->
  <form @submit.prevent="addTodo()">
    <label>New ToDo</label>
    <input v-model="newTodo" name="newTodo" autocomplete="off" />
    <!--
        v-model - syntax pro aktualizaci dat na inputu (zaznamená co do něj píšu)
        name - nese hodnotu, která je v ní vložena /* OPRAVENO */
        autocomplete - pamatování si zapsaných údajů (prohlížečem)
      -->
    <button>Add ToDo</button>
  </form>

  <h2>ToDo List</h2>
  <ul>

    <ToDoItem @remove="removeTodo(index)" @done="doneTodo(todo)" v-for="(todo, index) in todos" :key="index" :content="todo.content" :done="todo.done"/>

  </ul>
    <h4 v-if="todos.length === 0">Empty list.</h4>
    <!--
        pokud má todos pole (počet listů v seznamu) délku 0 =  napíše "prázdný list" /* OPRAVENO */
        todos.lenght = 0 (nastavilo by počet počet indexů v poli na 0);
    -->

</template>

<script lang="ts">
import { ref } from 'vue';

import ToDoItem from './ToDoItem.vue';
import { defineComponent } from '@vue/runtime-core';

export default defineComponent({
  components: {
      ToDoItem,
    },
    name: 'ToDo',
    setup () {
        const newTodo = ref(''); // obsahuje co je v závorce - vypsání newTodo.value
        const defaultData = [{
            done: false,
            content: 'Write a blog post'
        }]
        // proměnná obsahující seznam
        const todosData = JSON.parse(localStorage.getItem('todos') as any) || defaultData; // || = nebo
        // JSON.parse - vezme string a vrátí objekt
        // localStorage.getItem('') - vezme '' z lokální paměti
        const todos = ref(todosData);
        // přiřadím data z lokální paměti proměné
        function addTodo () {
            if (newTodo.value) {
                todos.value.push({
                    done: false,
                    content: newTodo.value
                });
                newTodo.value = '';
                // hodnota newTodo se nastaví na '' - prázdný pole
            }
            saveData();
        }
        function doneTodo (todo: { done: boolean; }) {
            todo.done = !todo.done
            // ! - označuje negaci (false) = todo.done (true) = !todo.done(false) - převede
            saveData();
        }
        function removeTodo (index: any) {
            todos.value.splice(index, 1);
            // splice - zamění 1. pozici (indexování) ve todos za index
            saveData();
        }
        function saveData () {
            const storageData = JSON.stringify(todos.value);
            // JSON.stringify - vezme objekt a vrátí string
            localStorage.setItem('todos', storageData);
            // přidání hodnoty do lokální paměěti
        }
        return {
            todos,
            newTodo,
            addTodo,
            doneTodo,
            removeTodo,
            saveData
        }
        // vracení hodnot
    }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

$primaryCol: white;
$secondaryCol: darkorchid;
$tercialyCol: purple;

ul{
  list-style: none;
  padding: 0;
}
ul button{
  background: purple;
  color: $primaryCol;
  border-radius: 3px;
  border: none;
  font-size: 13px;
  padding: 5px 4px;
  cursor: pointer;
}
ul button:hover{
  background: $secondaryCol;
}
li{
  width: 92%;
  border: 1px solid $primaryCol;
  border-radius: 5px;
  padding: 10px 10px 10px 10px;
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  margin-bottom: 20px;
}
span{
  padding: 0;
  margin: 5px 0 0 0;
}
#app{
  margin: 15vh 0 0 0;
}
h1{
  text-align: center;
  font-size: 30px;
}
h1, h2, h4{
  font-weight: normal;
}
h2{
  border-bottom: 1px solid $primaryCol;
  font-size: 20px;
  padding-bottom: 10px;
}
label{
  font-size: 15px;
}
form{
  width: 100%;
}
form button{
  width: 100%;
  height: 30px;
  margin-top: 10px;
  color: $primaryCol;
  background: $tercialyCol;
  border-radius: 5px;
  border: none;
  cursor: pointer;
}
form button:hover{
  background: $secondaryCol;
}
input{
  width: 93%;
  height: 30px;
  border: 1px solid $primaryCol;
  background: none;
  border-radius: 5px;
  color: $primaryCol;
  padding: 0 10px;
}
</style>

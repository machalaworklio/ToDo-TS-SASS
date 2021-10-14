<template>
  <h1 :class="$style.todo_h1">ToDo App</h1>
  <!-- vytvoření form + přidání funkce -->
  <!-- submit prevent - po zadání do inputu + enter, se nerefreshne stránka) -->
  <form @submit.prevent="addTodo()" :class="$style.todo_form">
    <label :class="$style.todo_label">New ToDo</label>
    <input
      v-model="newTodo"
      name="newTodo"
      autocomplete="off"
      :class="$style.todo_input" />
    <!--
        v-model - syntax pro aktualizaci dat na inputu (zaznamená co do něj píšu)
        name - nese hodnotu, která je v ní vložena /* OPRAVENO */
        autocomplete - pamatování si zapsaných údajů (prohlížečem)
      -->
    <button :class="$style.add_item_button">Add ToDo</button>
  </form>

  <h2 :class="$style.todo_h2">ToDo List</h2>
  <ul :class="$style.todo_ul">
    <ToDoItem
      @remove="removeTodo(index)"
      @done="doneTodo(todo)"
      v-for="(todo, index) in todos"
      :key="index"
      :content="todo.content"
      :done="todo.done" />
  </ul>
  <h4 :class="$style.todo_h4" v-if="todos.length === 0">Empty list.</h4>
  <!--
        pokud má todos pole (počet listů v seznamu) délku 0 =  napíše "prázdný list" /* OPRAVENO */
        todos.lenght = 0 (nastavilo by počet počet indexů v poli na 0);
    -->
</template>

<script lang="ts">
import { ref } from 'vue';

import ToDoItem from './ToDoItem.vue';
import { defineComponent } from '@vue/runtime-core';
import { todoItemScript } from '../scripts/ToDoScript.js';
// o úroveň zpět = ../

export default defineComponent({
  components: {
    ToDoItem,
  },
  name: 'ToDo',
  setup() {
    const newTodo = ref(''); // obsahuje co je v závorce - vypsání newTodo.value
    const defaultData: todoItemScript[] = [
      // chci to použít jako pole (obashuje více proměných)
      {
        done: false,
        content: 'asdsad',
      },
    ];
    // proměnná obsahující seznam
    const todosData =
      JSON.parse(localStorage.getItem('todos') as any) || defaultData; // || = nebo
    // JSON.parse - vezme string a vrátí objekt
    // localStorage.getItem('') - vezme '' z lokální paměti
    const todos = ref<todoItemScript[]>(todosData);
    // přiřadím data z lokální paměti proměné
    /* 14. října
      - todosData obsahují více proměných (potřebuji zase použít pole)
      - ref se udává parametr do <>
    */
    function addTodo() {
      if (newTodo.value) {
        todos.value.push({
          done: false,
          content: newTodo.value,
        });
        newTodo.value = '';
        // hodnota newTodo se nastaví na '' - prázdný pole
      }
      saveData();
    }
    function doneTodo(todo: todoItemScript) {
      /* 14. října
       - todo je jen jeden údaj (nepotřebuji používat pole)
       - fuknci se definuje parametr do ( : )
      */
      todo.done = !todo.done;
      // ! - označuje negaci (false) = todo.done (true) = !todo.done(false) - převede
      saveData();
    }
    function removeTodo(index: number) {
      // number základní datový typ.. níž už se nedostanu, není potřeba používat externě - používat interně
      todos.value.splice(index, 1);
      // splice - zamění 1. pozici (indexování) ve todos za index
      saveData();
    }
    function saveData() {
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
      saveData,
    };
    // vracení hodnot
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style module lang="scss">
$primaryCol: white;
$secondaryCol: darkorchid;
$tercialyCol: purple;

.todo_ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.add_item_button {
  width: 100%;
  margin-top: 10px;
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
.todo_h1 {
  text-align: center;
  font-size: 30px;
  font-weight: normal;
}
.todo_h2 {
  border-bottom: 1px solid $primaryCol;
  margin: 50px 0 0 0;
  font-size: 20px;
  padding-bottom: 10px;
  font-weight: normal;
}
.todo_h4 {
  font-weight: normal;
}
.todo_label {
  font-size: 15px;
}
.todo_form {
  width: 100%;
  height: 50px;
  margin-top: 10px;
  color: $primaryCol;
  background: transparent;
  border-radius: 5px;
  border: none;
  cursor: pointer;
}
.todo_input {
  width: 93%;
  height: 30px;
  border: 1px solid $primaryCol;
  background: none;
  border-radius: 5px;
  color: $primaryCol;
  padding: 0 10px;
}
</style>

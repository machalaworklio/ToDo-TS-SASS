<template>
    <ToDo/>
</template>

<script>

import ToDo from "./components/ToDo.vue";

import { defineComponent } from '@vue/runtime-core';

export default defineComponent({
  name: "Home",
  components: {
    ToDo,
  },
});
</script>

<style>

body{
  margin:0;
  padding:0;
	font-family: Avenir, Helvetica, Arial, sans-serif;
	background-color: black;
	color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>

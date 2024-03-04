<script setup lang="ts">
const store = useTodoStore();

const todoTitle = ref("");

const handleSubmit = () => {
  store.add({ title: todoTitle.value });
};
</script>

<template>
  <div class="w-full min-h-screen bg-gray-100">
    <section class="text-center pt-7">
      <h1 class="text-4xl text-gray-800">What are we doing today?</h1>
    </section>

    <form
      @submit.prevent="handleSubmit()"
      class="flex items-center justify-center w-9/12 max-w-lg p-5 mx-auto bg-white shadow mt-7"
    >
      <input
        type="text"
        class="px-4 py-2 border border-blue-200 rounded focus:outline-blue-300"
        placeholder="Add a todo"
        v-model="todoTitle"
      />

      <button
        type="submit"
        class="px-4 py-2 ml-3 transition-all duration-200 border border-blue-200 rounded hover:bg-blue-200"
      >
        Add Todo
      </button>
    </form>

    <ul class="flex flex-col items-center justify-center w-9/12 max-w-lg p-4 mx-auto bg-white rounded shadow mt-7">
      <li class="flex w-full" v-for="item in store.items" :key="item.id">{{ item.title }}</li>
    </ul>
  </div>
</template>

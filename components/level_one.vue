<!-- level_one.vue -->
<template>
  <div>
    <h2>Level One Component</h2>
    <p>This is a nested component inside Base.</p>
    <level-two></level-two> <!-- Nested Level Two component -->
  </div>
</template>

<script>
import LevelTwo from './level_two.js';  // Import the Level Two component

export default {
  name: 'LevelOne',
  components: {
    LevelTwo  // Register the Level Two component
  }
};
</script>

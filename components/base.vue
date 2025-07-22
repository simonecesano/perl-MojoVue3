<meta route="/nested" description="this is a nested component" order="1" />
<template>
  <div>
    <h1>Base Component</h1>
    <level-one></level-one>  <!-- Nested Component -->
  </div>
</template>

<script>
import LevelOne from './level_one.js';

export default {
  components: {
    LevelOne
  }
};
</script>

<template>
  <div>
    <chart />
    <woscript />
    <wotemplate />
  </div>
</template>

<script>
import ChartComponent from './chart.js';
import WoScript from './no_script.js';
import WoTemplate from './no_template.js';

export default {
  template: template,       
  components: {
     chart: ChartComponent,
     woscript: WoScript,
     wotemplate: WoTemplate,
  }
};
</script>

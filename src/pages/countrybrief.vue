<template>
  <q-page>
    <div class="col q-py-lg">
      <div>
        <q-select
          outlined
          v-model="dataInput.year"
          :options="year"
          label="Year"
          style="width: 300px;"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      year: [2007, 2011],
      dataInput: {
        year: 2007,
      },
    };
  },
};
</script>

<style scoped>
</style>
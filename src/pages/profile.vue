<template>
  <q-page class="flex flex-center q-pa-xl">
    <div class="box-profile q-pa-lg row">
      <div class="col-12" align="center">
        <div align="left">
          <span>Username</span>
        </div>
        <q-input outlined readonly></q-input>
      </div>

      <div class="col-12 q-mt-md" align="center">
        <div align="left">
          <span>Email</span>
        </div>
        <q-input outlined readonly></q-input>
      </div>

      <div class="col-12 q-mt-md" align="center">
        <div align="left">
          <span>Password</span>
        </div>
        <q-input outlined readonly></q-input>
        <div align="left" class="text-grey-6">
          <span>At least 6 characters</span>
        </div>
      </div>

      <div class="col-12 q-mt-lg" align="center">
        <q-btn
          label="Edit"
          class="bg4 q-py-xs"
          no-caps
          style="width:150px;border-radius:10px;"
          to="/profile/edit"
        ></q-btn>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.box-profile {
  width: 400px;
  border-radius: 10px;
  border: 1px solid#000;
}
</style>

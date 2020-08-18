<template>
  <q-page class="flex flex-center q-pa-xl">
    <div class="box-profile q-pa-lg row">
      <div class="col-12" align="center">
        <div align="left">
          <span>Username</span>
        </div>
        <q-input outlined v-model="userDetails.username"></q-input>
      </div>

      <div class="col-12 q-mt-md" align="center">
        <div align="left">
          <span>Email</span>
        </div>
        <q-input outlined v-model="userDetails.email"></q-input>
      </div>

      <div class="col-12 q-mt-md" align="center">
        <div align="left">
          <span>Old Password</span>
        </div>
        <q-input outlined v-model="userDetails.password"></q-input>
        <div align="left" class="text-grey-6"></div>
      </div>

      <div class="col-12 q-mt-md" align="center">
        <div align="left">
          <span>New Password</span>
        </div>
        <q-input outlined v-model="newPassword"></q-input>
        <div align="left" class="text-grey-6">
          <span>At least 6 characters</span>
        </div>
      </div>

      <div class="col-12 row justify-between q-mt-lg" align="center">
        <q-btn
          label="Cancel"
          outline
          class="q-py-xs"
          no-caps
          style="width:150px;border-radius:10px;"
          to="/profile"
        ></q-btn>
        <q-btn
          label="Save"
          class="bg4 q-py-xs"
          no-caps
          style="width:150px;border-radius:10px;"
          @click="updateProfile()"
        ></q-btn>
      </div>
    </div>

    <!-- Dialog Update Completely -->
    <q-dialog v-model="isDialogUpdateCompletely" persistent>
      <q-card style="width:400px;border-radius:10px;">
        <q-card-section class="bg4 q-py-sm" align="center">
          <span style="font-size:20px;">Edit Profile Completely</span>
        </q-card-section>

        <q-card-section class="q-pt-lg" align="center">
          <div class="q-pt-md q-pb-sm">
            <span style="font-size:16px;">Update profile completely</span>
          </div>
        </q-card-section>

        <q-card-actions class="q-py-lg" align="center">
          <div>
            <q-btn
              class="font-content q-mx-md bg4"
              style="width:150px;border-radius:10px;"
              label="OK"
              to="/profile"
              v-close-popup
            />
          </div>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      userDetails: {
        username: "",
        password: "",
        email: "",
      },
      newPassword: "",

      isDialogUpdateCompletely: false,
    };
  },
  methods: {
    updateProfile() {
      this.isDialogUpdateCompletely = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.box-profile {
  width: 400px;
  border-radius: 10px;
  border: 1px solid#000;
}
</style>

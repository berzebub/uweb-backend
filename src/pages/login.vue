<template>
  <div class="row justify-center" style="height:100vh">
    <div class="col-12">
      <!-- NOTE : Menu bar Header -->
      <q-toolbar class="text-primary bg-white q-pa-sm shadow-4">
        <div class="col-3 q-px-md" style="width:350px;">
          <q-img :src="require('../../public/images/header-logo.png')" style></q-img>
        </div>
        <q-space />
        <div class="col" align="center">
          <span class="font-header text-black">Data Entry</span>
        </div>
      </q-toolbar>
    </div>

    <div class="col-6 q-pa-md q-pb-xl q-mt-md" align="center" style="width:500px;">
      <div class="text-left" style="width:250px;">
        <span>Username</span>
        <div align="center">
          <q-input style="width:250px;" v-model="username" outlined></q-input>
        </div>
      </div>

      <div align="left" class="q-mt-lg" style="width:250px;">
        <span>Password</span>
        <q-input
          v-model="password"
          outlined
          :type="isShowPassword ? 'password' : 'text'"
          style="width:250px;"
        >
          <template v-slot:append>
            <q-icon
              :name="isShowPassword ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isShowPassword = !isShowPassword"
            />
          </template>
        </q-input>
      </div>

      <div align="center" class="q-mt-lg q-py-sm q-px-lg" style="width:250px;">
        <q-btn
          class="bg4 font-content full-width"
          style="border-radius:10px;"
          label="Login"
          no-caps
          to="/year"
        ></q-btn>
      </div>

      <div align="center" class="q-mt-sm">
        <span
          class="cursor-pointer font-content"
          style="text-decoration:underline;white-space: nowrap;"
        >Forgot my username / password?</span>
      </div>
    </div>

    <div class="col-12 self-end">
      <div style="background-color:#020B3B;" class="q-py-md">
        <q-toolbar class="q-px-sm items-center">
          <div class="q-mx-lg" style="max-width:180px">
            <q-img style="width:162px" src="../../public/footer-logo.png"></q-img>
          </div>
          <div class="q-mx-lg" style="max-width:180px">
            <q-img style="width:162px" src="../../public/fealac.png"></q-img>
          </div>
          <q-space />
          <div class="row full-width" align="right">
            <div class="col-12 q-col-gutter-md text-white" align="right">
              <q-icon class="cursor-pointer" size="30px" name="fab fa-twitter"></q-icon>
              <q-icon class="cursor-pointer" size="30px" name="fab fa-facebook-f"></q-icon>
              <q-icon class="cursor-pointer" size="30px" name="fab fa-youtube"></q-icon>
              <q-icon class="cursor-pointer" size="30px" name="fab fa-instagram"></q-icon>
              <q-icon class="cursor-pointer" size="30px" name="fab fa-flickr"></q-icon>
              <q-icon class="cursor-pointer" size="30px" name="fab fa-invision"></q-icon>
            </div>
            <div class="col-12 q-py-sm q-px-md">
              <q-separator color="white"></q-separator>
            </div>
            <div class="col-12 q-px-md">
              <div class="row justify-between">
                <router-link to="/about" class="text-white" style="text-decoration:none;">
                  <span>About</span>
                </router-link>
                <div to="/" class="text-white cursor-pointer" style="text-decoration:none;">
                  <span>Trade-etools</span>
                </div>
                <div class="text-white cursor-pointer" style="text-decoration:none;">
                  <span>ESCAP Trade</span>
                </div>
                <div class="text-white cursor-pointer" style="text-decoration:none;">
                  <span>ESCAP Trade Policy</span>
                </div>
                <router-link to="/termOfUse" class="text-white" style="text-decoration:none;">
                  <span>Terms of use</span>
                </router-link>
              </div>
            </div>
          </div>
        </q-toolbar>
      </div>
    </div>
  </div>
</template>

<script>
import unFooter from "../components/footer.vue";
export default {
  data() {
    return {
      username: "",
      password: "",
      isShowPassword: true,
    };
  },
  components: {
    unFooter,
  },
};
</script>

<style lang="scss" scoped>
</style>
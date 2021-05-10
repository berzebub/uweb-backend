import Vue from "vue";
import VueRouter from "vue-router";
import axios from "axios";
import VueAxios from "vue-axios";
import routes from "./routes";

Vue.use(VueRouter);

Vue.use(VueAxios, axios);

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  });

  return Router;
}

import json from "../../public/json/country_list.json";

Vue.mixin({
  data() {
    return {
      serverPath: "https://riva.negotiatetrade.org/u_api/"
    }
  },
  methods: {
    getCountryList() {
      let tempOptions = [];
      json.forEach(element => {
        let data = {
          label: element.name,
          value: element.id
        };
        tempOptions.push(data);
      });
      this.countryOptions = tempOptions;
      this.countrySelected = tempOptions[0].value;
    },
    notifyGreen(message) {
      this.$q.notify({
        message: message,
        color: "green",
        position: "top",
        timeout: "800"
      });
    },
    notifyRed(message) {
      this.$q.notify({
        message: message,
        color: "negative",
        position: "top",
        timeout: "800"
      });
    },
    loadingShow() {
      this.$q.loading.show({
        delay: 400
      });
    },
    loadingHide() {
      this.$q.loading.hide();
    }
  }
});

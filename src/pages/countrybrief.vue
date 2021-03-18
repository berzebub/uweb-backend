<template>
  <q-page>
    <div class="col q-py-lg" align="center">
      <q-card class="my-card q-mx-lg" style="width: 500px;">
        <div class="q-pa-md">
          <q-select
            outlined
            v-model="dataInput.year"
            :options="year"
            label="Year"
            style="width: 300px;"
          />
        </div>

        <div class="q-pa-md">
          <q-select
            outlined
            v-model="dataInput.country"
            :options="countryList"
            emit-value
            map-options
            label="Economy"
            style="width: 300px;"
          />
        </div>

        <div class="q-pa-md">
          <q-select
            outlined
            v-model="dataInput.dataSet"
            :options="dataSet"
            label="Data set"
            style="width: 300px;"
          />
        </div>
        <div class="q-pb-md">
          <u>Explaination of Data set</u>
        </div>
        <div class="q-pb-md">
          <q-btn no-caps class="bg4 font-content" label="Genereate Data" @click="genData()" />
        </div>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import json from "../../public/json/country_list.json";
export default {
  data() {
    return {
      year: [2007, 2011],
      dataSet: ["set#1", "set#2"],
      dataInput: {
        year: 2007,
        dataSet: "set#1",
        country: "ARG",
      },
      countryList: [
        {
          label: "art",
          value: "ARG",
        },
        {
          label: "art2",
          value: "2",
        },
      ],
    };
  },
  methods: {
    loadData() {
      this.loadingShow();

      let url = this.serverPath + "u_api/get_year.php";

      axios
        .get(url)
        .then((res) => {
          this.setDataTemp(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
      this.countryList = [];
      json.sort((a, b) => (a.iso > b.iso ? 1 : 0));
      json.forEach((x) => {
        let temp = {
          label: x.name,
          value: x.iso,
        };
        this.countryList.push(temp);
      });
    },
    genData() {
      console.log(this.dataInput);
    },
    setDataTemp(data) {
      this.year = [];
      let temp = data;
      temp.sort((a, b) => {
        return Number(a.year) - Number(b.year);
      });
      temp.forEach((x) => {
        this.year.push(x.year);
      });
      // console.log(temp);

      // this.setYearOptions();

      this.loadingHide();
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>

<style scoped>
</style>
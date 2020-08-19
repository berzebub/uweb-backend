<template>
  <q-page class>
    <!-- Header Button -->
    <div class="q-pa-md q-py-lg">
      <div align="right">
        <q-btn
          label="Update Data"
          no-caps
          class="bg4 font-content"
          style="width:200px;border-radius:10px"
          @click="isDialogUpload = true"
        ></q-btn>
      </div>
    </div>

    <!-- Body Content -->
    <div class="q-px-md">
      <div>
        <q-tabs
          active-bg-color="bg4"
          class="bg12 text-white shadow-2"
          style="border-radius:5px 5px 0px 0px;"
          align="left"
          no-caps
          outside-arrows
        >
          <div style="height:52px;" v-if="!yearList.length"></div>
          <q-btn
            v-if="item.status == 1 && yearList.length"
            v-for="(item, index) in yearList"
            :key="index"
            class="q-pa-sm border-right q-px-md"
            :class="selectYear == item.year ? 'bg4' : ''"
            @click="(selectYear = item.year), filter(item.year)"
            :label="item.year"
          />
        </q-tabs>
      </div>
      <div class="q-mt-md">
        <q-scroll-area
          visible
          :thumb-style="thumbStyle"
          :bar-style="barStyle"
          style="height: calc(100vh - 225px);font-size:16px;overflow:hidden;"
          class="shadow-1 rounded-borders"
        >
          <div
            v-for="(item, index) in countryList"
            :key="index"
            :class="index % 2 == 0 ? 'bg-odd' : 'bg-white'"
            class="row"
            style="height:50px;"
          >
            <div class="col-5 self-center q-px-md">
              <span class="font-content">{{ item.name }}</span>
            </div>
            <div class="col self-center">
              <span>{{showLastUpdate(item.name)}}</span>
            </div>
            <div class="col-1 self-center" align="center" style="width:130px;">
              <q-btn
                class="no-margin"
                round
                dense
                flat
                @click="
                  (isDeleteData = true),
                    (selectDeleteYear = item.name + '-' + selectYear)
                "
                v-if="dataShow.filter(x => x.data_year == selectYear && x.country == item.name).length"
              >
                <q-icon size="xs" name="fas fa-trash-alt"></q-icon>
              </q-btn>
            </div>
          </div>
        </q-scroll-area>
      </div>
    </div>

    <!-- Dialog Popup -->
    <q-dialog v-model="isDeleteData">
      <q-card style="width:400px;border-radius:10px;">
        <q-card-section class="bg4 q-py-sm" align="center">
          <span style="font-size:20px;">Are you sure?</span>
        </q-card-section>

        <q-card-section class="q-pt-lg" align="center">
          <div class="q-pt-md q-pb-sm">
            <span style="font-size:16px;">Do you really want to delete “{{ selectDeleteYear }}”?</span>
          </div>
        </q-card-section>

        <q-card-actions class="q-py-lg" align="center">
          <div>
            <q-btn
              class="font-content q-mx-md"
              style="width:150px;border-radius:10px;"
              outline
              label="Cancel"
              color="black"
              v-close-popup
              no-caps
            />
            <q-btn
              class="font-content q-mx-md bg4"
              style="width:150px;border-radius:10px;"
              label="Delete"
              no-caps
            />
          </div>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="isDialogUpload" persistent>
      <q-card style="width:400px;">
        <q-card-section class="bg4 q-py-sm" align="center">
          <span style="font-size:20px;">Upload Data</span>
        </q-card-section>

        <q-card-section class="q-pt-lg" align="center">
          <div class="q-pt-md q-pb-sm" style="width:250px;">
            <div align="left">
              <span>
                Data File
                <span class="text-grey-5 q-px-sm">CSV only</span>
              </span>
            </div>
            <div class="q-mt-sm">
              <q-file
                v-model="files"
                outlined
                class="cursor-pointer"
                accept=".csv"
                style="overflow:hidden;"
              >
                <div class="absolute-center full-width" align="center" v-if="!files">
                  <span
                    class="font-hint text-black"
                    style="text-decoration:underline;"
                  >Choose data file</span>
                </div>
                <template v-slot:file="{ index, file }">
                  <span
                    style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;"
                  >{{ file.name }}</span>
                </template>
              </q-file>
            </div>
          </div>
        </q-card-section>

        <q-card-actions class="q-pb-lg" align="center">
          <q-btn
            class="font-content q-mx-md"
            style="width:150px;border-radius:10px;"
            outline
            label="Cancel"
            color="black"
            v-close-popup
            no-caps
          />
          <q-btn
            class="font-content q-mx-md bg4"
            style="width:150px;border-radius:10px;"
            label="Upload"
            no-caps
            @click="uploadData()"
            :disable="isUploadData"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import json from "../../public/json/country_list.json";
export default {
  data() {
    return {
      files: null,
      selectYear: "",
      selectDeleteYear: "",
      thumbStyle: {
        right: "0px",
        backgroundColor: "#757575",
        width: "13px",
        opacity: 1,
      },
      barStyle: {
        right: "0px",
        backgroundColor: "#C4C4C4",
        width: "13px",
        opacity: 1,
      },
      yearList: [],
      dataList: [],
      dataShow: [],
      countryList: [],

      isUpdateData: false,

      isDeleteData: false,

      isDialogUpload: false,
      isUploadData: false,

      fileinput: "",
    };
  },
  methods: {
    filter(val) {
      this.dataShow = this.dataList.filter((x) => x.data_year == val);

      // this.dataList.sort((a, b) => {
      //   return a.name > b.name ? 1 : -1;
      // });
    },
    showLastUpdate(country) {
      let hasLastUpdate = this.dataShow.filter((x) => {
        return x.data_year == this.selectYear && x.country == country;
      });

      if (hasLastUpdate.length) {
        return "Last updated on " + hasLastUpdate[0].lastUpdate;
      } else {
        return "Not Updated";
      }
    },
    uploadData() {
      console.clear();

      if (this.files == null) {
        this.notifyRed("กรุณาใส่ไพล์");
        return;
      }

      this.loadingShow();
      this.isDialogUpload = false;
      this.isUploadData = true;

      let promise = new Promise((resolve) => {
        var reader = new FileReader();
        var vm = this;
        reader.onload = (e) => {
          resolve((vm.fileinput = reader.result));
        };
        reader.readAsText(this.files);
      });

      promise.then(
        async (result) => {
          let allTextLines = result.split(/\r\n|\n/);
          let temp = [];
          let data;
          let limit = 100000;

          if (allTextLines[0].includes("source_country")) {
            allTextLines.splice(0, 1);
          }

          let count = Math.ceil(allTextLines.length / limit);
          let startCount = 0;
          let endCount = limit;

          for (let i = 1; i <= count; i++) {
            let setNewArray = allTextLines.slice(startCount, endCount);

            for (let x = 0; x < setNewArray.length; x++) {
              let data = setNewArray[x].split(",");

              if (data[0] != "") {
                let newContent = {
                  source_country: data[0].replace(/[\"]/g, ""),
                  exp_country: data[1].replace(/[\"]/g, ""),
                  exp_sector: data[2].replace(/[\"]/g, ""),
                  imp_country: data[3].replace(/[\"]/g, ""),
                  variable: data[4].replace(/[\"]/g, ""),
                  value: Number(data[5]),
                  year: Number(data[6]),
                };

                setNewArray[x] = newContent;
              }
            }

            temp.push(setNewArray);

            startCount += limit;
            endCount += limit;
          }

          let url = "http://localhost/u_api/add_upload_log.php";

          let getCountry = this.countryList.filter((x) => {
            return x.code == temp[0][0].exp_country;
          })[0].name;

          let setNewData = {
            year: temp[0][0].year,
            country: getCountry,
          };

          let setLog = await axios.post(
            url,
            (data = JSON.stringify(setNewData))
          );

          if (setLog.data == "Success") {
            url = "http://localhost/u_api/get_upload_log.php";

            let res = await axios.get(url);

            this.setDataUpdateLog(res.data);
          }

          url = "http://localhost/u_api/upload_data.php";
          let countRecords = 0;

          this.loadingShow();

          for (const item of temp) {
            let res = await axios
              .post(url, (data = JSON.stringify(item)))
              .catch((err) => {
                console.log(err);
              });

            if (res.data == "Success") {
              console.log((countRecords += item.length));
              console.log(res.data);
            }
          }

          this.isUploadData = false;
          this.loadingHide();
        },
        (err) => {
          console.log(err);
        }
      );
    },
    setDataUpdateLog(data) {
      let temp = [];

      temp = data;

      console.log(data);

      temp.sort((a, b) => {
        return a.country > b.country ? 1 : -1;
      });

      this.dataList = temp;

      if (temp.length) {
        this.dataShow = this.dataList.filter((x) => {
          return x.data_year == this.selectYear;
        });
      }
    },
    setDataTemp(data) {
      let temp = [];

      temp = data;

      temp.sort((a, b) => {
        return Number(a.year) - Number(b.year);
      });

      this.yearList = temp;

      if (temp.length) {
        let firstActive = this.yearList.filter((x) => {
          return x.status == 1;
        });

        this.selectYear = firstActive[0].year;

        this.filter(this.selectYear);
      }

      this.loadingHide();
    },
    loadCountry() {
      let tempOptions = [];
      json.forEach((element) => {
        let newData = {
          name: element.name,
          code: element.iso,
        };
        tempOptions.push(newData);
      });

      this.countryList = tempOptions;
    },
    async loadData() {
      this.loadingShow();

      let url = "http://localhost/u_api/get_year.php";

      let res = await axios.get(url).catch((err) => {
        console.log(err);
      });

      if (res.data) {
        this.setDataTemp(res.data);
      }

      url = "http://localhost/u_api/get_upload_log.php";

      res = await axios.get(url).catch((err) => {
        console.log(err);
      });

      if (res.data) {
        this.setDataUpdateLog(res.data);
      }

      this.loadCountry();
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>

<style lang="scss" scoped>
.bg-odd {
  background-color: #eeeeee;
}

.border-right {
  border-right: 1px solid #eeeeee;
}

.table {
  width: 100%;
  border-collapse: collapse;
}
</style>

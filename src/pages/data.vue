<template>
  <q-page class>
    <!-- Header Button -->
    <div class="q-pa-md q-py-lg">
      <div align="right">
        <q-btn
          label="Upload Data"
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
            v-if="yearList.length"
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
                    selectDelete.year = selectYear,selectDelete.code = item.code,selectDelete.country = item.name
                "
                v-if="dataShow.filter(x => x.year == selectYear && x.country == item.name).length"
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
            <span
              style="font-size:16px;"
            >Do you really want to delete “{{ selectDelete.country + "-" + selectDelete.year }}”?</span>
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
              @click="deleteData()"
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
                  >Choose a data file</span>
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

    <!-- Dialog Upload Completely -->
    <q-dialog v-model="isDialogUploadCompletely">
      <q-card style="width:400px;border-radius:10px;">
        <q-card-section class="bg4 q-py-sm" align="center">
          <span style="font-size:20px;">Upload completely</span>
        </q-card-section>

        <q-card-section class="q-pt-lg" align="center">
          <div class="q-pt-md q-pb-sm">
            <span
              style="font-size:16px;"
            >Upload “{{uploadDetails.country}} - {{uploadDetails.year}}” complete</span>
          </div>
        </q-card-section>

        <q-card-actions class="q-py-lg" align="center">
          <div>
            <q-btn
              class="font-content q-mx-md bg4"
              style="width:150px;border-radius:10px;"
              label="OK"
              v-close-popup
            />
          </div>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Dialog Delete Completely -->
    <q-dialog v-model="isDialogDeleteCompletely">
      <q-card style="width:400px;border-radius:10px;">
        <q-card-section class="bg4 q-py-sm" align="center">
          <span style="font-size:20px;">Delete completely</span>
        </q-card-section>

        <q-card-section class="q-pt-lg" align="center">
          <div class="q-pt-md q-pb-sm">
            <span
              style="font-size:16px;"
            >Delete “{{selectDelete.country}} - {{selectDelete.year}}” complete</span>
          </div>
        </q-card-section>

        <q-card-actions class="q-py-lg" align="center">
          <div>
            <q-btn
              class="font-content q-mx-md bg4"
              style="width:150px;border-radius:10px;"
              label="OK"
              v-close-popup
            />
          </div>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Dialog Same Upload Data -->
    <q-dialog v-model="isDialogSameUploadData">
      <q-card style="width:400px;border-radius:10px;">
        <q-card-section class="bg4 q-py-sm" align="center">
          <span style="font-size:20px;">Upload Data Incompletely</span>
        </q-card-section>

        <q-card-section class="q-pt-lg" align="center">
          <div class="q-pt-md q-pb-sm">
            <span
              style="font-size:16px;"
            >Please delete old data in “{{uploadDetails.country}} - {{uploadDetails.year}}” before uploading new one.</span>
          </div>
        </q-card-section>

        <q-card-actions class="q-py-lg" align="center">
          <div>
            <q-btn
              class="font-content q-mx-md bg4"
              style="width:150px;border-radius:10px;"
              label="OK"
              v-close-popup
            />
          </div>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Dialog Same Upload Data -->
    <q-dialog v-model="isDialogFormatIsWrong">
      <q-card style="width:450px;border-radius:10px;">
        <q-card-section class="bg4 q-py-sm" align="center">
          <span style="font-size:20px;">Upload Data incompletely</span>
        </q-card-section>

        <q-card-section class="q-pt-lg" align="center">
          <div class="q-pt-md q-pb-sm">
            <span style="font-size:16px;">File format is wrong.</span>
          </div>
        </q-card-section>

        <q-card-actions class="q-py-lg" align="center">
          <div>
            <q-btn
              class="font-content q-mx-md bg4"
              style="width:150px;border-radius:10px;"
              label="OK"
              v-close-popup
            />
          </div>
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
      selectDelete: {
        year: "",
        code: "",
        country: "",
      },
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

      uploadDetails: {
        country: "",
        year: "",
      },
      isDialogUpload: false,
      isUploadData: false,
      isDialogUploadCompletely: false,

      isDeleteData: false,
      isDialogDeleteCompletely: false,

      isDialogSameUploadData: false,

      isDialogFormatIsWrong: false,

      fileinput: "",
    };
  },
  methods: {
    deleteData() {
      this.loadingShow();

      this.isDeleteData = false;

      let data = "";
      let url = "https://api.winner-english.com/u_api/delete_country_data.php";

      let sendData = {
        year: this.selectDelete.year,
        code: this.selectDelete.code,
        country: this.selectDelete.country,
      };

      axios
        .post(url, (data = sendData))
        .then((res) => {
          this.isDialogDeleteCompletely = true;
          this.setDataUpdateLog(res.data);
          this.loadingHide();
        })
        .catch((err) => {
          console.log(err);
          this.loadingHide();
        });
    },
    filter(val) {
      this.dataShow = this.dataList.filter((x) => x.year == val);

      // this.dataList.sort((a, b) => {
      //   return a.name > b.name ? 1 : -1;
      // });
    },
    showLastUpdate(country) {
      let hasLastUpdate = this.dataShow.filter((x) => {
        return x.year == this.selectYear && x.country == country;
      });

      if (hasLastUpdate.length) {
        return "Last updated on " + hasLastUpdate[0].last_update;
      } else {
        return "Not Updated";
      }
    },
    uploadData() {
      console.clear();
      if (this.files == null) {
        this.notifyRed("Please choose a data file");
        return;
      }

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
          this.loadingShow();

          let data = "";
          let allTextLine = result.split(/\r\n|\n/);

          if (allTextLine[0].split(",").length == 7) {
            if (allTextLine[0].includes("source_country")) {
              allTextLine.splice(0, 1);
            } else {
              this.isDialogFormatIsWrong = true;
              this.files = null;
              this.isUploadData = false;
              this.loadingHide();
              return;
            }

            allTextLine = allTextLine[0].split(",");

            let getCountry = this.countryList.filter((x) => {
              return x.code == allTextLine[1].replace(/[\"]/g, "");
            });

            let checkDataLog = this.dataList.filter(
              (x) =>
                x.year == allTextLine[6].toString() &&
                x.country == getCountry[0].name
            );

            this.uploadDetails.country = getCountry[0].name;
            this.uploadDetails.year = allTextLine[6];

            if (checkDataLog.length) {
              this.isDialogSameUploadData = true;
              this.files = null;
              this.isUploadData = false;
              this.loadingHide();
              return;
            }

            if (getCountry.length) {
              let formData = new FormData();

              formData.append("file", this.files);
              formData.append("country_name", getCountry[0].code);
              formData.append("year", allTextLine[6]);

              let url = "https://api.winner-english.com/u_api/upload_data.php";

              let getFiles = await axios.post(url, formData, {
                header: {
                  "Content-Type": "multipart/form-data",
                },
              });

              console.log(getFiles);

              // url = "https://api.winner-english.com/u_api/add_upload_log.php";

              // let setNewData = {
              //   year: allTextLine[6],
              //   country: getCountry[0].name,
              // };

              // let setLog = await axios.post(
              //   url,
              //   (data = JSON.stringify(setNewData))
              // );

              // if (setLog.data == "Success") {
              //   url = "https://api.winner-english.com/u_api/get_upload_log.php";

              //   let res = await axios.get(url);

              //   this.setDataUpdateLog(res.data);
              // }

              this.isDialogUploadCompletely = true;
              this.files = null;
              this.isUploadData = false;
              this.loadingHide();
            }
          } else {
            this.isDialogFormatIsWrong = true;

            this.isUploadData = false;
            this.loadingHide();
            return;
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
    setDataUpdateLog(data) {
      let temp = [];

      temp = data;

      temp.sort((a, b) => {
        return a.country > b.country ? 1 : -1;
      });

      this.dataList = temp;

      if (temp.length) {
        this.dataShow = this.dataList.filter((x) => {
          return x.year == this.selectYear;
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

      this.selectYear = temp[0].year;

      this.filter(this.selectYear);

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

      let url = "https://api.winner-english.com/u_api/get_year.php";

      let res = await axios.get(url).catch((err) => {
        console.log(err);
      });

      if (res.data) {
        this.setDataTemp(res.data);
      }

      url = "https://api.winner-english.com/u_api/get_upload_log.php";

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

<template>
  <q-page class>
    <!-- Header Button -->
    <div class="q-pa-md">
      <div align="right">
        <q-btn
          label="Update Data"
          no-caps
          class="bg4 q-px-xl font-content"
          style="border-radius:10px"
          @click="isUpload = true"
        ></q-btn>
      </div>
    </div>

    <!-- Body Content -->
    <div class="q-px-md">
      <div>
        <q-tabs
          active-bg-color="bg4"
          class="bg12 text-white shadow-2"
          align="left"
          no-caps
          outside-arrows
        >
          <!-- <div style="padding:27px;"></div> -->
          <q-btn
            v-if="item.status == 1"
            v-for="(item, index) in yearList"
            :key="index"
            class="q-pa-sm border-right q-px-md"
            :class="selectYear == item.year ? 'bg4' : ''"
            @click="(selectYear = item.year), filter(item.year)"
            :label="item.year"
          />
        </q-tabs>
      </div>
      <div>
        <q-scroll-area
          visible
          :thumb-style="thumbStyle"
          :bar-style="barStyle"
          style="height: calc(100vh - 220px);font-size:16px;overflow:hidden;"
          class="shadow-1 rounded-borders"
        >
          <div
            v-for="(item, index) in dataShow"
            :key="index"
            :class="index % 2 == 0 ? 'bg-odd' : 'bg-white'"
            class="q-pa-xs row"
          >
            <div class="col self-center q-px-md">
              <span>{{ item.name }}</span>
            </div>
            <div class="col self-center">
              <span>Last updated on {{ item.lastUpdate }}</span>
            </div>
            <div class="col-1" align="center" style="width:130px;">
              <q-btn
                round
                flat
                @click="
                  (isDeleteData = true),
                    (selectDeleteYear = item.name + '-' + item.year)
                "
              >
                <q-icon name="fas fa-trash-alt"></q-icon>
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

    <q-dialog v-model="isUpload" persistent>
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
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
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
      yearList: ["2001", "2002", "2003", "2004", "2005", "2006"],
      dataShow: [],
      dataList: [
        //   {
        //     name: "Afghanistan",
        //     lastUpdate: "3/5/2020",
        //     year: "2002",
        //     status: true,
        //   },
        //   {
        //     name: "Bolivia",
        //     lastUpdate: "3/5/2020",
        //     year: "2002",
        //     status: true,
        //   },
        //   {
        //     name: "Nauru",
        //     lastUpdate: "3/5/2020",
        //     year: "2005",
        //     status: true,
        //   },
        //   {
        //     name: "Philippines",
        //     lastUpdate: "3/5/2020",
        //     year: "2001",
        //     status: true,
        //   },
        //   {
        //     name: "Peru",
        //     lastUpdate: "3/5/2020",
        //     year: "2006",
        //     status: true,
        //   },
        //   {
        //     name: "Saudi Arabia",
        //     lastUpdate: "3/5/2020",
        //     year: "2004",
        //     status: true,
        //   },
        //   {
        //     name: "Estonia",
        //     lastUpdate: "3/5/2020",
        //     year: "2004",
        //     status: true,
        //   },
        //   {
        //     name: "Hawaii",
        //     lastUpdate: "3/5/2020",
        //     year: "2003",
        //     status: true,
        //   },
        //   {
        //     name: "India",
        //     lastUpdate: "3/5/2020",
        //     year: "2002",
        //     status: true,
        //   },
        //   {
        //     name: "Japan",
        //     lastUpdate: "3/5/2020",
        //     year: "2005",
        //     status: true,
        //   },
        //   {
        //     name: "Croatia",
        //     lastUpdate: "3/5/2020",
        //     year: "2001",
        //     status: true,
        //   },
        //   {
        //     name: "Chile",
        //     lastUpdate: "3/5/2020",
        //     year: "2001",
        //     status: true,
        //   },
        //   {
        //     name: "Egypt",
        //     lastUpdate: "3/5/2020",
        //     year: "2001",
        //     status: true,
        //   },
        //   {
        //     name: "Brazil",
        //     lastUpdate: "3/5/2020",
        //     year: "2006",
        //     status: true,
        //   },
        //   {
        //     name: "Morocco",
        //     lastUpdate: "3/5/2020",
        //     year: "2005",
        //     status: true,
        //   },
        //   {
        //     name: "Malaysia",
        //     lastUpdate: "3/5/2020",
        //     year: "2002",
        //     status: true,
        //   },
        //   {
        //     name: "Argentina",
        //     lastUpdate: "3/5/2020",
        //     year: "2004",
        //     status: true,
        //   },
        //   {
        //     name: "Mauritius",
        //     lastUpdate: "3/5/2020",
        //     year: "2003",
        //     status: true,
        //   },
        //   {
        //     name: "Nepal",
        //     lastUpdate: "3/5/2020",
        //     year: "2003",
        //     status: true,
        //   },
        //   {
        //     name: "Norway",
        //     lastUpdate: "3/5/2020",
        //     year: "2003",
        //     status: true,
        //   },
        //   {
        //     name: "Poland",
        //     lastUpdate: "3/5/2020",
        //     year: "2005",
        //     status: true,
        //   },
        //
      ],
      isUpdateData: false,

      isDeleteData: false,

      isUpload: false,

      fileinput: "",
    };
  },
  methods: {
    filter(val) {
      this.dataShow = this.dataList.filter((x) => x.year == val);

      this.dataShow.sort((a, b) => {
        return a.name > b.name ? 1 : -1;
      });
    },
    uploadData() {
      console.clear();
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

            temp.push(setNewArray);

            startCount += limit;
            endCount += limit;
          }

          let url = "http://localhost/u_api/upload_data.php";

          for (const item of temp) {
            let res = await axios.post(url, (data = JSON.stringify(item)));

            if (res.data == "Success") {
              console.log(res.data);
            } else {
              console.log(res.data);
            }
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
    loadData() {
      let url = "http://localhost/u_api/get_year.php";

      axios
        .get(url)
        .then((res) => {
          this.yearList = res.data;

          this.selectYear = this.yearList[0].year;

          this.filter(this.selectYear);
        })
        .catch((err) => {
          console.log(err);
        });
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
</style>

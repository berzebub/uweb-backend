<template>
  <q-page>
    <!-- Header Button -->
    <div class="q-pa-md q-py-lg">
      <div align="right">
        <q-btn
          label="Add Year"
          no-caps
          class="bg4 font-content"
          style="width:200px;border-radius:10px"
          @click="isAddData = true"
        ></q-btn>
      </div>
    </div>

    <!-- Body Content -->
    <div class="q-px-md q-pb-md">
      <table class="table shadow-1">
        <tr style="font-size:16px;" class="bg12">
          <th style="padding:14px;border-top-left-radius:5px;">
            <div align="left" class="q-px-sm">
              <span>Year</span>
            </div>
          </th>
          <th style="padding:10px;">
            <div>
              <span>Status</span>
            </div>
          </th>
          <th style="border-top-right-radius:5px;">
            <div>
              <span>Delete</span>
            </div>
          </th>
        </tr>
        <tr v-if="!yearList.length">
          <td colspan="3">
            <div class="q-pa-md row items-center">
              <q-icon size="xs" name="fas fa-exclamation-triangle" class="q-mr-sm"></q-icon>
              <span style="font-size:12px;">No Data available</span>
            </div>
          </td>
        </tr>
        <tr
          v-if="yearList.length"
          style="font-size:16px;"
          v-for="(item,index) in yearList"
          :key="index"
          :class="index % 2 == 1 ? 'bg-grey-4' : ''"
        >
          <td>
            <div class="q-pa-sm q-px-md">
              <span>{{ item.year }}</span>
            </div>
          </td>
          <td style="width:70%;">
            <div class="q-pa-sm" align="center">
              <span
                class="cursor-pointer"
                style="text-decoration:underline;"
                @click="updateData(item.status,item.year)"
              >{{item.status == 1 ? 'Active' : 'Inactive'}}</span>
            </div>
          </td>
          <td style="width:150px;">
            <div class="q-pa-sm" align="center">
              <q-btn dense flat round @click="isDialogDelete = true,selectDeleteYear = item.year">
                <q-icon size="xs" name="fas fa-trash-alt"></q-icon>
              </q-btn>
            </div>
          </td>
        </tr>
      </table>
    </div>

    <!-- Dialog Popup -->
    <q-dialog v-model="isAddData" persistent>
      <q-card style="width:400px;border-radius:10px;">
        <q-card-section class="bg4 q-py-sm" align="center">
          <span style="font-size:20px;">Add Year</span>
        </q-card-section>

        <q-card-section class="q-py-lg" align="center">
          <div style="width:150px;">
            <div align="left">
              <span style="font-size:16px;">Year</span>
            </div>
            <q-select outlined :options="yearOptions" v-model="yearSelected"></q-select>
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
              label="Save"
              @click="saveData()"
              no-caps
            />
          </div>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="isDialogDelete">
      <q-card style="width:400px;border-radius:10px;">
        <q-card-section class="bg4 q-py-sm" align="center">
          <span style="font-size:20px;">Are you sure?</span>
        </q-card-section>

        <q-card-section class="q-pt-lg" align="center">
          <div class="q-pt-md q-pb-sm">
            <span style="font-size:16px;">Do you really want to delete “{{selectDeleteYear}}”?</span>
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
              @click="deleteData(selectDeleteYear)"
            />
          </div>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Dialog Save Completely -->
    <q-dialog v-model="isSaveCompletely">
      <q-card style="width:400px;border-radius:10px;">
        <q-card-section class="bg4 q-py-sm" align="center">
          <span style="font-size:20px;">Add year Completely</span>
        </q-card-section>

        <q-card-section class="q-pt-lg" align="center">
          <div class="q-pt-md q-pb-sm">
            <span style="font-size:16px;">Add “{{yearSelected}}” completely</span>
          </div>
        </q-card-section>

        <q-card-actions class="q-py-lg" align="center">
          <div>
            <q-btn
              class="font-content q-mx-md bg4"
              style="width:150px;border-radius:10px;"
              label="OK"
              @click="userDetails = {}"
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
      selectDeleteYear: "",
      yearSelected: 2001,
      yearOptions: [
        2001,
        2002,
        2003,
        2004,
        2005,
        2006,
        2007,
        2008,
        2009,
        2010,
        2011,
        2012,
        2013,
        2014,
        2015,
        2016,
        2017,
        2018,
        2019,
        2020,
      ],
      pagination: {
        page: 1,
        rowsPerPage: 0,
        // rowsNumber: xx if getting data from a server
      },
      columns: [
        {
          name: "name",
          align: "left",
          label: "Year",
          style: "font-size:16px;",
        },
        {
          name: "status",
          align: "center",
          label: "Status",
          style: "font-size:16px;text-decoration:underline",
        },
        {
          name: "delete",
          align: "center",
          label: "Delete",
          style: "width:150px;font-size:16px;",
        },
      ],
      yearList: [],
      isAddData: false,

      isDialogDelete: false,
      isSaveCompletely: false,
    };
  },
  methods: {
    deleteData(year) {
      let data;

      this.isDialogDelete = false;

      let sendData = {
        year: year,
      };

      let url = "http://localhost/u_api/delete_year.php";

      axios
        .post(url, (data = JSON.stringify(sendData)))
        .then((res) => {
          this.setDataTemp(res.data);
        })
        .catch((res) => {
          console.log("Delete Fail");
        });
    },
    updateData(status, year) {
      let data;

      if (status == 0) {
        status = 1;
      } else {
        status = 0;
      }

      let sendData = {
        year: year,
        status: status,
      };

      let url = "http://localhost/u_api/update_year.php";

      axios
        .post(url, (data = JSON.stringify(sendData)))
        .then((res) => {
          this.setDataTemp(res.data);
        })
        .catch((res) => {
          console.log("Update Fail");
        });
    },
    saveData() {
      this.isAddData = false;
      let data;
      let sendData = {
        year: this.yearSelected,
      };

      let url = "http://localhost/u_api/add_year.php";

      axios
        .post(url, (data = JSON.stringify(sendData)))
        .then((res) => {
          if (res.data == "Error Dulpicate Data") {
          } else {
            this.setDataTemp(res.data);
            this.isSaveCompletely = true;
          }
        })
        .catch((err) => {
          console.log(err + " : Save Fail");
        });
    },
    setDataTemp(data) {
      let temp = data;
      temp.sort((a, b) => {
        return Number(a.year) - Number(b.year);
      });
      this.yearList = temp;

      this.loadingHide();
    },
    loadData() {
      this.loadingShow();

      let url = "http://localhost/u_api/get_year.php";

      axios
        .get(url)
        .then((res) => {
          this.setDataTemp(res.data);
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
.table {
  width: 100%;
  border-collapse: collapse;
}
</style>
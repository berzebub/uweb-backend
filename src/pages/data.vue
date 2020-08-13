<template>
  <q-page>
    <!-- Header Button -->
    <div class="q-pa-md q-py-lg">
      <div align="right">
        <q-btn
          label="Update Data"
          no-caps
          class="bg4 q-px-xl font-content"
          style="border-radius:10px"
          @click="isUpdateData = true"
        ></q-btn>
      </div>
    </div>

    <!-- Body Content -->
    <div class="q-px-md q-pb-md">
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
            v-for="(item,index) in yearList"
            :key="index"
            class="q-pa-sm border-right q-px-md"
            :class="selectYear == item ? 'bg4' : ''"
            @click="selectYear = item,filter(item)"
            :label="item"
          />
        </q-tabs>
      </div>
      <div class="q-mt-md">
        <q-scroll-area
          visible
          :thumb-style="thumbStyle"
          :bar-style="barStyle"
          style="height: calc(100vh - 230px);font-size:16px;overflow:hidden;"
          class="shadow-1 rounded-borders"
        >
          <div
            v-for="(item,index) in dataShow"
            :key="index"
            :class="index % 2 == 0 ? 'bg-odd' : 'bg-white'"
            class="q-pa-xs row"
          >
            <div class="col self-center q-px-md">
              <span>{{item.name}}</span>
            </div>
            <div class="col self-center">
              <span>Last updated on {{item.lastUpdate}}</span>
            </div>
            <div class="col-1" align="center" style="width:130px;">
              <q-btn
                round
                flat
                @click="isDeleteData = true,selectDeleteYear = item.name + '-' + item.year"
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
      selectYear: "2001",
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
        {
          name: "Afghanistan",
          lastUpdate: "3/5/2020",
          year: "2002",
          status: true,
        },
        {
          name: "Bolivia",
          lastUpdate: "3/5/2020",
          year: "2002",
          status: true,
        },
        {
          name: "Nauru",
          lastUpdate: "3/5/2020",
          year: "2005",
          status: true,
        },
        {
          name: "Philippines",
          lastUpdate: "3/5/2020",
          year: "2001",
          status: true,
        },
        {
          name: "Peru",
          lastUpdate: "3/5/2020",
          year: "2006",
          status: true,
        },
        {
          name: "Saudi Arabia",
          lastUpdate: "3/5/2020",
          year: "2004",
          status: true,
        },
        {
          name: "Estonia",
          lastUpdate: "3/5/2020",
          year: "2004",
          status: true,
        },
        {
          name: "Hawaii",
          lastUpdate: "3/5/2020",
          year: "2003",
          status: true,
        },
        {
          name: "India",
          lastUpdate: "3/5/2020",
          year: "2002",
          status: true,
        },
        {
          name: "Japan",
          lastUpdate: "3/5/2020",
          year: "2005",
          status: true,
        },
        {
          name: "Croatia",
          lastUpdate: "3/5/2020",
          year: "2001",
          status: true,
        },
        {
          name: "Chile",
          lastUpdate: "3/5/2020",
          year: "2001",
          status: true,
        },
        {
          name: "Egypt",
          lastUpdate: "3/5/2020",
          year: "2001",
          status: true,
        },
        {
          name: "Brazil",
          lastUpdate: "3/5/2020",
          year: "2006",
          status: true,
        },
        {
          name: "Morocco",
          lastUpdate: "3/5/2020",
          year: "2005",
          status: true,
        },
        {
          name: "Malaysia",
          lastUpdate: "3/5/2020",
          year: "2002",
          status: true,
        },
        {
          name: "Argentina",
          lastUpdate: "3/5/2020",
          year: "2004",
          status: true,
        },
        {
          name: "Mauritius",
          lastUpdate: "3/5/2020",
          year: "2003",
          status: true,
        },
        {
          name: "Nepal",
          lastUpdate: "3/5/2020",
          year: "2003",
          status: true,
        },
        {
          name: "Norway",
          lastUpdate: "3/5/2020",
          year: "2003",
          status: true,
        },
        {
          name: "Poland",
          lastUpdate: "3/5/2020",
          year: "2005",
          status: true,
        },
      ],
      isUpdateData: false,

      isDeleteData: false,
    };
  },
  methods: {
    filter(val) {
      this.dataShow = this.dataList.filter((x) => x.year == val);

      this.dataShow.sort((a, b) => {
        return a.name > b.name ? 1 : -1;
      });
    },
  },
  mounted() {
    this.filter(this.selectYear);
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
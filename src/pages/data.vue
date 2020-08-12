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
            class="q-pa-sm border-right q-px-md"
            :class="selectYear == '2001' ? 'bg4' : ''"
            @click="selectYear = 2001"
            label="2001"
          />
          <q-btn
            class="q-pa-sm border-right q-px-md"
            :class="selectYear == '2002' ? 'bg4' : ''"
            @click="selectYear = 2002"
            label="2002"
          />
          <q-btn
            class="q-pa-sm border-right q-px-md"
            :class="selectYear == '2003' ? 'bg4' : ''"
            @click="selectYear = 2003"
            label="2003"
          />
          <q-btn
            class="q-pa-sm border-right q-px-md"
            :class="selectYear == '2004' ? 'bg4' : ''"
            @click="selectYear = 2004"
            label="2004"
          />
          <q-btn
            class="q-pa-sm border-right q-px-md"
            :class="selectYear == '2005' ? 'bg4' : ''"
            @click="selectYear = 2005"
            label="2005"
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
            v-for="n in 100"
            :key="n"
            :class="n % 2 == 0 ? 'bg-odd' : 'bg-white'"
            class="q-pa-xs row"
          >
            <div class="col self-center q-px-md">
              <span>Afghanistan</span>
            </div>
            <div class="col self-center">
              <span>Last updated on 1/7/2020</span>
            </div>
            <div class="col-1" align="center" style="width:130px;">
              <q-btn round flat>
                <q-icon name="fas fa-trash-alt"></q-icon>
              </q-btn>
            </div>
          </div>
        </q-scroll-area>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      selectYear: "",
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
      dataShow: [
        {
          name: "2011",
          status: true,
        },
      ],
      dataList: [
        {
          name: "2011",
          status: true,
        },
        {
          name: "2012",
          status: true,
        },
        {
          name: "2013",
          status: false,
        },
      ],
      isUpdateData: false,

      isDeleteYear: false,
    };
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
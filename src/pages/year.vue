<template>
  <q-page>
    <!-- Header Button -->
    <div class="q-pa-md q-py-lg">
      <div align="right">
        <q-btn
          label="Add Year"
          no-caps
          class="bg4 q-px-xl font-content"
          style="border-radius:10px"
          @click="isAddYear = true"
        ></q-btn>
      </div>
    </div>

    <!-- Body Content -->
    <div class="q-px-md q-pb-md">
      <q-table :data="data" :columns="columns" row-key="name">
        <template v-slot:header="props">
          <q-tr :props="props" class="bg12">
            <q-th
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
              style="font-size:16px;"
            >{{ col.label }}</q-th>
          </q-tr>
        </template>

        <template v-slot:body="props">
          <q-tr :props="props" :class="props.row.index % 2 == 0 ? 'bg-grey-3' : ''">
            <q-td key="name" :props="props">{{ props.row.name }}</q-td>
            <q-td key="status" :props="props">
              <span>{{props.row.status ? 'Active' : 'Inactive'}}</span>
            </q-td>
            <q-td key="delete" :props="props">
              <q-btn flat round @click="isDeleteYear = true,selectDeleteYear = props.row.name">
                <q-icon name="fas fa-trash-alt"></q-icon>
              </q-btn>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>

    <!-- Dialog Popup -->
    <q-dialog v-model="isAddYear" persistent>
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
              no-caps
            />
          </div>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="isDeleteYear">
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
      selectDeleteYear: "",
      yearSelected: "2001",
      yearOptions: [
        "2001",
        "2002",
        "2003",
        "2004",
        "2005",
        "2006",
        "2007",
        "2008",
        "2009",
        "2010",
        "2011",
        "2012",
        "2013",
      ],
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
      data: [
        {
          index: 1,
          name: "2011",
          status: true,
        },
        {
          index: 2,
          name: "2012",
          status: true,
        },
        {
          index: 3,
          name: "2013",
          status: false,
        },
      ],
      isAddYear: false,

      isDeleteYear: false,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
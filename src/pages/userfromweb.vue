<template>
  <q-page>
    <!-- Header Button -->
    <div class="q-pa-md q-py-lg">
      <div align="right">
        <q-btn
          label="Export Data"
          no-caps
          class="bg4 font-content"
          style="width:200px;border-radius:10px"
        ></q-btn>
      </div>

      <!-- Body Content -->
      <div class="q-pa-md">
        <q-table :data="userData" :pagination.sync="pagination" :columns="columns" row-key="name">
          <template v-slot:header="props">
            <q-tr :props="props">
              <q-th
                v-for="col in props.cols"
                :key="col.name"
                :props="props"
                class="text-white"
                style="background-color: #020B3B; font-size:14px"
              >{{ col.label }}</q-th>
            </q-tr>
          </template>
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="date" :props="props">{{ props.row.datetime | dateTimeShow}}</q-td>
              <q-td key="email" :props="props">{{ props.row.email}}</q-td>
              <q-td key="password" :props="props">{{ props.row.password}}</q-td>
              <q-td key="country" :props="props">{{ props.row.country}}</q-td>
              <q-td key="organization" :props="props">{{ props.row.organization}}</q-td>
              <q-td key="delete" :props="props">
                <q-icon
                  @click="deleteUser(props.row.id)"
                  class="cursor-pointer"
                  size="18px"
                  name="fas fa-trash-alt"
                />
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      pagination: { rowsPerPage: 50 },
      columns: [
        {
          name: "date",
          align: "left",
          label: "Date",
          field: "date",
          style: "width:150px",
        },
        {
          name: "email",
          align: "center",
          label: "Email",
          field: "email",
        },
        {
          name: "password",
          align: "center",
          label: "Password",
          field: "password",
          style: "width:100px",
        },
        {
          name: "country",
          align: "center",
          label: "Country",
          field: "country",
          style: "width:150px",
        },
        {
          name: "organization",
          align: "center",
          label: "Organization",
          field: "organization",
          style: "width:150px",
        },
        {
          name: "delete",
          align: "center",
          label: "Delete",
          field: "delete",
          style: "width:100px",
        },
      ],
      userData: [],
    };
  },
  methods: {
    loadUser() {
      this.loadingShow();
      let url = this.serverPath + "u_api/get_userweb.php";
      axios
        .get(url)
        .then((res) => {
          if (res.data) {
            let temp = res.data.sort(
              (a, b) => Number(a.datetime) - Number(b.datetime)
            );

            this.userData = temp;
          }

          this.loadingHide();
        })
        .catch((err) => {
          console.log(err);
          this.loadingHide();
        });
    },
    deleteUser(id) {
      let url = this.serverPath + "u_api/delete_userweb.php";

      axios
        .post(url, JSON.stringify(id))
        .then((res) => {
          if (res.data) {
            let temp = res.data.sort(
              (a, b) => Number(a.datetime) - Number(b.datetime)
            );

            this.userData = temp;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  filters: {
    dateTimeShow: function (value) {
      var a = new Date(value * 1000);
      var months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      var year = a.getFullYear();
      var month = months[a.getMonth()];
      var date = a.getDate();
      var hour = a.getHours();
      var min = a.getMinutes();
      var sec = a.getSeconds();
      var time =
        date + " " + month + " " + year + " | " + hour + ":" + min + ":" + sec;
      return time;
    },
  },
  mounted() {
    this.loadUser();
  },
};
</script>

<style scoped>
.table {
  width: 100%;
  border-collapse: collapse;
}
</style>
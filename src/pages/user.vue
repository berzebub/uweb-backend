<template>
  <q-page>
    <!-- Header Button -->
    <div class="q-pa-md q-py-lg">
      <div align="right">
        <q-btn
          label="Add user"
          no-caps
          class="bg4 q-px-xl font-content"
          style="border-radius:10px"
          @click="isAddData = true"
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
              <q-btn flat round @click="isDialogDelete = true,selectDeleteYear = props.row.name">
                <q-icon name="fas fa-trash-alt"></q-icon>
              </q-btn>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>

    <!-- Dialog Popup -->
    <q-dialog v-model="isAddData" persistent>
      <q-card style="width:400px;border-radius:10px;">
        <q-card-section class="bg4 q-py-sm" align="center">
          <span style="font-size:20px;">Add user</span>
        </q-card-section>

        <q-card-section class="q-py-md" align="center">
          <div style="width:320px;">
            <div align="left">
              <span style="font-size:16px;">Username</span>
            </div>
            <q-input outlined v-model="userDetails.username" :rules="[val => !!val]" ref="username"></q-input>
          </div>
          <div style="width:320px;">
            <div align="left">
              <span style="font-size:16px;">Email</span>
            </div>
            <q-input
              outlined
              v-model="userDetails.email"
              :rules="[val => !!val,validateEmail]"
              ref="email"
            ></q-input>
          </div>
          <div style="width:320px;">
            <div align="left">
              <span style="font-size:16px;">Password</span>
            </div>
            <q-input
              outlined
              v-model="userDetails.password"
              type="password"
              :rules="[val => val.length >= 6]"
              ref="password"
            ></q-input>
            <div align="left">
              <span class="text-grey-6">At least 6 characters</span>
            </div>
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
              @click="saveData()"
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
            <span style="font-size:16px;">Do you really want to delete “{{}}”?</span>
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

    <!-- Dialog Save Completely -->
    <q-dialog v-model="isSaveCompletely">
      <q-card style="width:400px;border-radius:10px;">
        <q-card-section class="bg4 q-py-sm" align="center">
          <span style="font-size:20px;">Add user Completely</span>
        </q-card-section>

        <q-card-section class="q-pt-lg" align="center">
          <div class="q-pt-md q-pb-sm">
            <span style="font-size:16px;">Add “{{userDetails.username}}” completely</span>
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

    <!-- Dialog Dulpicate Data -->
    <!-- <q-dialog v-model="isSaveCompletely">
      <q-card style="width:400px;border-radius:10px;">
        <q-card-section class="bg4 q-py-sm" align="center">
          <span style="font-size:20px;">Add user Completely</span>
        </q-card-section>

        <q-card-section class="q-pt-lg" align="center">
          <div class="q-pt-md q-pb-sm">
            <span style="font-size:16px;">Add “{{userDetails.username}}” completely</span>
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
    </q-dialog>-->
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      userDetails: {
        username: "",
        email: "",
        password: "",
      },

      columns: [
        {
          name: "username",
          align: "left",
          label: "Username",
          style: "width:100%;font-size:16px;",
        },
        {
          name: "email",
          align: "center",
          label: "Enail",
          style: "font-size:16px;text-decoration:underline",
        },
        {
          name: "delete",
          align: "center",
          label: "Delete",
          style: "width:50px;font-size:16px;",
        },

        {
          name: "edit",
          align: "center",
          label: "Edit",
          style: "width:50px;font-size:16px;",
        },
      ],
      data: [],
      isAddData: false,

      isDialogDelete: false,
      isSaveCompletely: false,
    };
  },
  methods: {
    validateEmail(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
    saveData() {
      this.$refs.username.validate();
      this.$refs.email.validate();
      this.$refs.password.validate();

      if (
        this.$refs.password.hasError ||
        this.$refs.email.hasError ||
        this.$refs.username.hasError
      ) {
        return;
      }

      this.isAddData = false;

      let sendData = {
        ...this.userDetails,
        type: "USER",
        status: "INSERT",
      };

      let data = JSON.stringify(this.data);
      let url = "http://localhost/unbackend/datastructure.php";

      axios
        .post(url, (data = sendData))
        .then((res) => {
          if (res.data == "Success") {
            this.isSaveCompletely = true;
          } else {
            this.isAddData = true;
            console.log(res.data);
          }
        })
        .catch((res) => {
          console.log(res);
          console.log("Save Fail");
        });
    },
  },
  mounted () {
    
  },
};
</script>

<style lang="scss" scoped>
</style>
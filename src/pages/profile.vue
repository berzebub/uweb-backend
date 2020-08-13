<template>
  <q-page>
    <q-btn label="Test API" no-caps @click="testapi()"></q-btn>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      data: {
        t1: "1",
        t2: "2",
        status: "INSERT"
      }
    };
  },
  methods: {
    testapi() {
      let test = JSON.stringify(this.data);
      console.log(test);

      const options = {
        method: "POST",
        headers: { "content-type": "application/form-data" },
        data: test,
        url: "localhost/testapi.php"
      };

      axios(options)
        .then(res => {
          console.log("บันทึกแล้ว");
        })
        .catch(err => {
          console.log("ยังไม่บันทึก");
        });

      // axios
      //   .post("testphp.php", {
      //     t1: "1",
      //     t2: "2",
      //     status: "INSERT"
      //   })
      //   .then(res => {
      //     console.log("ส่งข้อมูลไปแล้ว");
      //   });
      // .then(function (response) {
      //   //console.log(response);
      //   // app.newMember = { firstname: "", lastname: "" };
      //   // if (response.data.error) {
      //   //   app.errorMessage = response.data.message;
      //   // } else {
      //   //   app.successMessage = response.data.message;
      //   //   app.getAllMembers();
      //   // }
      // });
    }
  }
};
</script>

<style lang="scss" scoped></style>

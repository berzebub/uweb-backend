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
        id: "3",
        name: "MMasterZ",
        password: "123456",
        status: "INSERT",
      },
    };
  },
  methods: {
    testapi() {
      let data = JSON.stringify(this.data);
      let url = "http://localhost/unbackend/testapi.php";

      axios
        .post(url, (data = data))
        .then((res) => {
          if (res.data == "Error") {
            return;
          }

          console.log("บันทึกแล้ว");
        })
        .catch((err) => {
          console.log("ยังไม่บันทึก");
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>

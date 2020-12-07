<template>
  <div class="hello">
    <h2>Application List</h2>
    <div class="container">
      <div v-if="Loading">
        <a-skeleton active />
      </div>
      <div v-else>
        <table class="table table-bordered" style="line-height: 1">
          <thead style="background-color: #0089ff; color: white">
            <tr>
              <th>Sl No.</th>
              <th>Name</th>
              <th>Email ID</th>
              <th>Mobile No.</th>
              <th>Total Exp.</th>
              <th>Relevent Exp.</th>
              <th>Current CTC</th>
              <th>Expected CTC</th>
              <th>Notice Period</th>
              <!-- <td>Delete Application</td> -->
            </tr>
          </thead>
          <tbody v-for="(Application, index) in ApplicationList" :key="index">
            <tr>
              <td>{{ index + 1 }}</td>
              <td>{{ Application.id.Full_Name }}</td>
              <td>{{ Application.id.Email_ID }}</td>
              <td>{{ Application.id.Mobile_No }}</td>
              <td>{{ Application.id.Total_Experience }}</td>
              <td>{{ Application.id.Relevent_Experience }}</td>
              <td>{{ Application.id.Current_CTC }}</td>
              <td>{{ Application.id.Expected_CTC }}</td>
              <td>{{ Application.id.Notice_Period }}</td>
              <!-- <td>{{ Application.id.Full_Name}}</td> -->
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import BootstrapVue from "bootstrap-vue/dist/bootstrap-vue.esm";

// Import the styles directly. (Or you could add them via script tags.)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import firebase from "../firebaseConfig";
Vue.use(BootstrapVue);
const db = firebase.firestore();
export default {
  data() {
    return {
      name: "AppliedJobs",
      date: new Date().toISOString().slice(0, 10),
      ApplicationList: [],
      Loading: false,
    };
  },
  methods: {
    readApplications() {
      this.Loading = true;
      this.ApplicationList = [];
      db.collection("F_M_ApplicationList")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.ApplicationList.push({
              id: doc.data(),
            });
          });
          this.Loading = false;
        })
        .catch((error) => {
          this.Loading = false;
          console.log("Error getting ApplicationList: ", error);
        });
    },
  },
  mounted() {
    this.readApplications();
  },
};
</script>

<style scoped>
</style>

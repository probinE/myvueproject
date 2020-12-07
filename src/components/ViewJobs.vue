<template>
  <div>
    <h2>Job Details</h2>
    <div class="container">
      <!-- Delete alert start -->
      <div v-if="DeleteSuccess">
        <a-alert
          style="text-align: left"
          message="Success! Job was deleted successfully."
          type="success"
          show-icon
        />
      </div>
      <div v-else-if="DeleteError">
        <a-alert
          style="text-align: left"
          message="Error! Error ocured while deleting Job."
          type="warning"
          show-icon
        />
      </div>
      <!-- Delete alert end -->
      <!-- API loading button start -->
      <div v-if="Loading">
        <a-skeleton active />
      </div>
      <!--  API loading button end -->
      <div v-else>
        <!-- Job dashboard start -->
        <table class="table table-bordered">
          <thead style="background-color: #0089ff; color: white">
            <tr>
              <th>Sl No.</th>
              <th>Job Tittle</th>
              <th>Employer Name</th>
              <th>Company ID</th>
              <th>Job Description</th>
              <!-- <th>Created Date</th> -->
              <th>Action</th>
            </tr>
          </thead>
          <tbody v-for="(Emp, index) in employeesData" :key="Emp.JobID">
            <tr>
              <td>{{ index + 1 }}</td>
              <td>{{ Emp.data.Job_tittle }}</td>
              <td>{{ Emp.data.EmployerName }}</td>
              <td>{{ Emp.data.CompanyID }}</td>
              <td>{{ Emp.data.Job_Description }}</td>
              <!-- <td>{{ Emp.data.Created_Date }}</td> -->
              <td>
                <a-button type="primary" @click="ApplyJob(Emp.JobID)">
                  Apply Job
                </a-button>
                <a-popconfirm
                  title="Are you sure delete this Job?"
                  ok-text="Yes"
                  cancel-text="No"
                  @confirm="confirm(Emp.id)"
                  @cancel="cancel"
                >
                  <a-button type="primary">Delete Job</a-button>
                </a-popconfirm>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- Job dashboard end -->
      </div>
    </div>
    <div>
      <!-- application model start -->
      <a-modal
        v-model="visible"
        style="text-align: center"
        title="Application form"
        @ok="handleOk"
      >
        <template slot="footer">
          <a-button key="back" @click="handleCancel"> Cancel </a-button>
        </template>
        <!-- application submit alert start -->
        <div v-if="AlertSuccess">
          <a-alert
            style="text-align: left"
            message="Success! Application was submitted successfully."
            type="success"
            show-icon
          />
        </div>
        <div v-else-if="AlertError">
          <a-alert
            style="text-align: left"
            message="Error! Error ocured while submitting Application."
            type="warning"
            show-icon
          />
        </div>
        <!-- application submit alert end -->
        <!-- application form start -->
        <a-form
          @submit="SumbitApplication"
          :autoFormCreate="
            (form) => {
              this.form = form;
            }
          "
        >
          <a-form-item
            label="Full Name"
            :labelCol="{ span: 7 }"
            :wrapperCol="{ span: 10 }"
            fieldDecoratorId="Full_Name"
            :fieldDecoratorOptions="{
              rules: [
                { required: true, message: 'Full Name cannot be empty!' },
              ],
            }"
          >
            <a-input />
          </a-form-item>
          <a-form-item
            label="Email ID"
            :labelCol="{ span: 7 }"
            :wrapperCol="{ span: 10 }"
            fieldDecoratorId="Email_ID"
            :fieldDecoratorOptions="{
              rules: [{ required: true, message: 'Email ID cannot be empty!' }],
            }"
          >
            <a-input />
          </a-form-item>
          <a-form-item
            label="Mobile No."
            :labelCol="{ span: 7 }"
            :wrapperCol="{ span: 10 }"
            fieldDecoratorId="Mobile_No"
            :fieldDecoratorOptions="{
              rules: [
                { required: true, message: 'Mobile No. cannot be empty!' },
              ],
            }"
          >
            <a-input />
          </a-form-item>
          <a-form-item
            label="Total Experience"
            :labelCol="{ span: 7 }"
            :wrapperCol="{ span: 10 }"
            fieldDecoratorId="Total_Experience"
            :fieldDecoratorOptions="{
              rules: [
                {
                  required: true,
                  message: 'Total Experience cannot be empty!',
                },
              ],
            }"
          >
            <a-input />
          </a-form-item>
          <a-form-item
            label="Relevent Experience"
            :labelCol="{ span: 7 }"
            :wrapperCol="{ span: 10 }"
            fieldDecoratorId="Relevent_Experience"
            :fieldDecoratorOptions="{
              rules: [
                {
                  required: true,
                  message: 'Relevent Experience cannot be empty!',
                },
              ],
            }"
          >
            <a-input />
          </a-form-item>
          <a-form-item
            label="Current CTC"
            :labelCol="{ span: 7 }"
            :wrapperCol="{ span: 10 }"
            fieldDecoratorId="Current_CTC"
            :fieldDecoratorOptions="{
              rules: [
                {
                  required: true,
                  message: 'Current CTC cannot be empty!',
                },
              ],
            }"
          >
            <a-input />
          </a-form-item>
          <a-form-item
            label="Expected CTC"
            :labelCol="{ span: 7 }"
            :wrapperCol="{ span: 10 }"
            fieldDecoratorId="Expected_CTC"
            :fieldDecoratorOptions="{
              rules: [
                {
                  required: true,
                  message: 'Expected CTC cannot be empty!',
                },
              ],
            }"
          >
            <a-input />
          </a-form-item>
          <a-form-item
            label="Notice Period"
            :labelCol="{ span: 7 }"
            :wrapperCol="{ span: 10 }"
            fieldDecoratorId="Notice_Period"
            :fieldDecoratorOptions="{
              rules: [
                { required: true, message: 'Notice Period cannot be empty!' },
              ],
            }"
          >
            <a-input />
          </a-form-item>
          <a-form-item :wrapperCol="{ span: 12, offset: 5 }">
            <a-button type="primary" htmlType="submit" :loading="loading">
              Submit
            </a-button>
          </a-form-item>
        </a-form>
        <!-- application form end -->
      </a-modal>
      <!-- application model end -->
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
      name: "ViewJobs",
      employeesData: [],
      SingleJobData: [],
      JobTitle: "",
      Loading: false,
      visible: false,
      loading: false,
      AlertSuccess: "",
      AlertError: "",
      DeleteSuccess: "",
      DeleteError: "",
    };
  },
  methods: {
    confirm(id) {
      this.DeleteJob(id);
    },
    cancel(e) {},
    readAllJobs() {
      debugger;
      this.employeesData = [];
      this.Loading = true;
      db.collection("F_M_EmployerJob")
        .get()
        .then((querySnapshot) => {
          debugger;
          querySnapshot.forEach((doc) => {
            debugger;
            this.employeesData.push({
              data: doc.data(),
              id: doc.id,
            });
          });
          this.Loading = false;
        })
        .catch((error) => {
          this.Loading = false;
          console.log("Error getting documents: ", error);
        });
    },

    ApplyJob(arg) {
      debugger;
      this.SingleJobData = [];
      db.collection("F_M_EmployerJob")
        .get(arg)
        .then((querySnapshot) => {
          debugger;
          querySnapshot.forEach((doc) => {
            debugger;
            this.SingleJobData.push({
              JobDetails: doc.data(),
            });
            debugger;

            var dsasaas = this.SingleJobData;
            this.visible = true;
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    },
    handleOk(e) {
      console.log(e);
      this.visible = false;
    },
    handleCancel(e) {
      this.visible = false;
    },
    DeleteJob(id) {
      try {
        db.collection("F_M_EmployerJob")
          .doc(id)
          .delete()
          .then(() => {
            debugger;
            this.DeleteSuccess = true;
            this.DeleteError = false;
            this.readAllJobs();
          })
          .catch((error) => {
            this.DeleteSuccess = false;
            this.DeleteError = true;
          });
      } catch (error) {
        this.DeleteSuccess = false;
        this.DeleteError = true;
      }
    },
    SumbitApplication(e) {
      debugger;
      e.preventDefault();

      this.form.validateFields((err, values) => {
        if (!err) {
          debugger;
          this.loading = true;
          try {
            db.collection("/F_M_ApplicationList")
              .add(values)
              .then((res) => {
                debugger;
                this.AlertSuccess = true;
                this.AlertError = false;
                 this.loading = false;
                this.form.resetFields();
              })
              .catch((error) => {
                debugger;
                this.AlertSuccess = false;
                this.AlertError = true;
                this.loading = false;
              });
          } catch (error) {
            this.AlertSuccess = false;
            this.AlertError = true;
            this.loading = false;
          }
        }
      });
    },
  },
  mounted() {
    this.readAllJobs();
  },
};
</script>

<style scoped>
</style>

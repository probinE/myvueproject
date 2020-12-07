<template>
  <div class="container" style="padding-top: 15px">
    <div v-if="AlertSuccess">
      <a-alert
        style="text-align: left"
        message="Success! Job was posted successfully."
        type="success"
        show-icon
      />
    </div>
    <div v-else-if="AlertError">
      <a-alert
        style="text-align: left"
        message="Error! Error ocured while posting job."
        type="warning"
        show-icon
      />
    </div>

    <a-form
      @submit="handleSubmit"
      :autoFormCreate="
        (form) => {
          debugger;
          this.form = form;
        }
      "
    >
      <a-form-item
        label="Company Name"
        :labelCol="{ span: 7 }"
        :wrapperCol="{ span: 8 }"
        fieldDecoratorId="Company_Name"
        :fieldDecoratorOptions="{
          rules: [{ required: true, message: 'Company Name cannot be empty!' }],
        }"
      >
        <a-input />
      </a-form-item>
      <a-form-item
        label="Employer Name"
        :labelCol="{ span: 7 }"
        :wrapperCol="{ span: 8 }"
        fieldDecoratorId="EmployerName"
        :fieldDecoratorOptions="{
          rules: [
            { required: true, message: 'Employer Name cannot be empty!' },
          ],
        }"
      >
        <a-input />
      </a-form-item>
      <a-form-item
        label="Company ID"
        :labelCol="{ span: 7 }"
        :wrapperCol="{ span: 8 }"
        fieldDecoratorId="CompanyID"
        :fieldDecoratorOptions="{
          rules: [{ required: true, message: 'Company ID cannot be empty!' }],
        }"
      >
        <a-input />
      </a-form-item>
      <a-form-item
        label="Job Description"
        :labelCol="{ span: 7 }"
        :wrapperCol="{ span: 8 }"
        fieldDecoratorId="Job_Description"
        :fieldDecoratorOptions="{
          rules: [
            { required: true, message: 'Job Description cannot be empty!' },
          ],
        }"
      >
        <a-input />
      </a-form-item>
      <a-form-item
        label="Job Tittle"
        :labelCol="{ span: 7 }"
        :wrapperCol="{ span: 8 }"
        fieldDecoratorId="Job_tittle"
        :fieldDecoratorOptions="{
          rules: [{ required: true, message: 'Job Tittle cannot be empty!' }],
        }"
      >
        <a-input />
      </a-form-item>
      <!-- <a-select
        placeholder="Select a option and change input text above"
        @change="this.handleSelectChange"
      >
        <a-select-option value="male">male</a-select-option>
        <a-select-option value="female">female</a-select-option>
      </a-select> -->
      <a-form-item :wrapperCol="{ span: 12, offset: 5 }">
        <a-button type="primary" htmlType="submit" :loading="loading">
          Submit
        </a-button>
      </a-form-item>
    </a-form>
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
      formLayout: "horizontal",
      AlertSuccess: "",
      AlertError: "",
      loading: false,
    };
  },
  methods: {
    handleSubmit(e) {
      debugger;
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          try {
            this.loading = true;
            db.collection("/F_M_EmployerJob")
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
};
</script>
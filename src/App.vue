<template>
  <div id="app">
    <a-menu v-model="current" mode="horizontal">
      <a-menu-item key="mail"
        ><router-link to="/PostJob">Post a Job</router-link></a-menu-item
      >
      <a-menu-item key="View"
        ><router-link to="/ViewJobs">View Jobs</router-link></a-menu-item
      >
      <a-menu-item key="Applied"
        ><router-link to="/AppliedJobs"
          >Applied Candidate list</router-link
        ></a-menu-item
      >
    </a-menu>
    <!-- <a-menu mode="horizontal">
      <a-menu-item class="active ant-menu-item">
        <router-link to="/Employer">Employer</router-link>
      </a-menu-item>
      <a-menu-item>
        <router-link to="/HelloWorld">Empoyee</router-link>
      </a-menu-item>
    </a-menu> -->
    <router-view />
  </div>
</template>
<script>
export default {
  name: "App",
  data() {
    return {
      current: ["mail"],
    };
  },
};
</script>

<style>
#app .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 28px 16px 0;
  float: left;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

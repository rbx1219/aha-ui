<template>
  <div class="default-layout">
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <a class="navbar-brand" href="#">Aha</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
              <router-link class="btn ml-2  " to="/dashboard/me" active-class="btn-light">{{ this.user.name }}</router-link>
          </li>
          <li class="nav-item">
              <router-link class="btn ml-2" to="/dashboard/statistics" active-class="btn-light">Dashboard</router-link>
          </li>
          <li class="nav-item">
              <router-link class="btn ml-2" to="/logout">Logout</router-link>
          </li>
      </ul>
  </div>
    </nav>
    <div class="container-fluid">
      <div class="row justify-content-center">
        <div class="col-lg-6 main-content d-flex justify-content-center align-items-center">
          <keep-alive>
            <router-view />
          </keep-alive>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'DashboardLayout',
  computed: {
    ...mapState([
      'user'
    ])
  }
}
</script>

<style scoped>

.default-layout {
  min-height: 100vh;
}

.navbar {
  margin-bottom: 50px;
  --bs-navbar-padding-x: 6px;
}

.main-content {
  padding: 20px;
  margin: 20px;
  background-color: #fff; /* 添加背景色以確保陰影效果明顯 */
  border-radius: 8px; /* 圓角 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 陰影 */
}
</style>

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
              <router-link class="btn ml-2  " to="/login" active-class="btn-light">Sign in</router-link>
          </li>
          <li class="nav-item">
              <router-link class="btn ml-2" to="/signup" active-class="btn-light">Sign up</router-link>
          </li>
      </ul>
  </div>
    </nav>
    <!-- Main Content -->
    <div class="container-fluid">
      <div class="row justify-content-center">
        <div class="col-lg-4 main-content d-flex justify-content-center align-items-center">
          <keep-alive>
            <router-view />
          </keep-alive>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'DefaultLayout',
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

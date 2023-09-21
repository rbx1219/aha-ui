<template>
  <div class="profile-container">
    <h3 class="profile-title">Your Profile</h3>
    <div class="profile-item mb-3">
      <label class="profile-label">Name:</label>
      <span class="profile-detail">{{ user.name }}</span>
    </div>
    <div class="profile-item mb-3">
      <label class="profile-label">Email:</label>
      <span class="profile-detail">{{ user.email }}</span>
    </div>
    <div class="profile-item mb-3">
      <label class="profile-label">User ID:</label>
      <span class="profile-detail">{{ user.id }}</span>
    </div>
    <!-- Add other relevant user details here... -->
  </div>
</template>


  <script>
  import { mapState } from 'vuex';

  export default {
    computed: {
      ...mapState(['user'])
    }
  };
  </script>

<style scoped>
.profile-container {
  width: 55%;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.profile-title {
  text-align: center;
  margin-bottom: 20px;
  font-weight: 500;
  color: #333;
}

.profile-item {
  display: flex;
  justify-content: space-between;
  align-items: center; /* Vertically align center */
  padding: 8px 0; /* Add some padding for spacing */
}

.profile-label {
  font-weight: 500;
  color: #555;
}

.profile-detail {
  flex-grow: 1;
  margin-left: 20px;
  color: #333;
  font-weight: 400;
}
</style>



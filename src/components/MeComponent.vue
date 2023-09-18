<template>
    <div class="vue-template">
      <h3>Your Profile</h3>
      <div class="mb-3">
        <label>Name:</label>
        <p>{{ user.name }}</p>
      </div>
      <div class="mb-3">
        <label>Email:</label>
        <p>{{ user.email }}</p>
      </div>
      <div class="mb-3">
        <label>User ID:</label>
        <p>{{ user.id }}</p>
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
  
  <style>
  /* Add styling if necessary */
  </style>
  
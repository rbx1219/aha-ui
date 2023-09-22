<template>
    <div class="dashboard-container">
      <div class="tabs">
        <router-link to="/dashboard/me" class="tab" active-class="active">Me</router-link>
        <router-link to="/dashboard/statistics" class="tab" active-class="active">Statistics</router-link>
      </div>

      <div class="tab-content">
        <router-view></router-view>
      </div>
    </div>
  </template>

  <style scoped>

  .tabs {
    display: flex;
    gap: 10px;  /* adjust the gap between tabs */
  }

  .tab {
    padding: 10px;
    text-decoration: none;
    color: #333;
    border: 1px solid #ddd;
    border-radius: 4px;
    transition: background-color 0.3s;
  }

  .tab:hover {
    background-color: #f5f5f5;
  }

  .active {
    background-color: #007BFF;
    color: white;
  }
  </style>

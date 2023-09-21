<template>
  <div class="statistics">

    <!-- User Statistics -->
    <div class="user-statistics mb-5">
      <h2>User Statistics</h2>
      <ul>
        <li>Total users: <span class="highlighted-stat">{{ totalUsers }}</span></li>
        <li>Active sessions today: <span class="highlighted-stat">{{ activeSessionsToday }}</span></li>
        <li>Average active sessions in the last 7 days: <span class="highlighted-stat">{{ averageSessionsLast7Days }}</span></li>
      </ul>
    </div>

    <!-- User Database Dashboard -->
    <div class="user-dashboard">
      <h2>User Database Dashboard</h2>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Signup Timestamp</th>
            <th>Login Count</th>
            <th>Last Session Timestamp</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.name }}</td>
            <td>{{ formatTimestamp(user.createdAt) }}</td>
            <td class = "text-center">{{ user.loginCount }}</td>
            <td>{{ formatTimestamp(user.lastSession) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';

export default {
  created() {
    this.fetchUsers();
    this.fetchActive();
  },
  computed: {
    ...mapState({
      users: state => state.dashboardUsers || []
    }),
    ...mapGetters([
      'totalUsers',
      'activeSessionsToday',
      'averageSessionsLast7Days'
    ])
  },
  methods: {
    ...mapActions([
      'fetchUsers',
      'fetchActive'
    ]),
    formatTimestamp(timestamp) {
      const date = new Date(timestamp);
      return `${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    }
  }
}
</script>

<style scoped>
.statistics {
  padding: 20px;
}

.user-statistics {
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 5px;
}

.table {
  margin-top: 20px;
}

.highlighted-stat {
  font-size: 1.2em; /* Increase the font size */
  color: #007BFF;   /* Using a blue color for emphasis, but you can adjust this to your preference */
}
</style>

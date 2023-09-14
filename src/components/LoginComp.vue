<template>
    <div class="vue-tempalte">
        <h3>Sign In</h3>
        <div class="mb-3">
            <label>Email address</label>
            <input v-model="email" type="email" class="form-control form-control-lg" />
        </div>
        <div class="mb-3">
            <label>Password</label>
            <input v-model="password" type="password" class="form-control form-control-lg" />
        </div>
        <button @click="handleLogin" class="btn btn-dark btn-lg btn-block">Sign In</button>
        <p class="forgot-password text-right mt-2 mb-4">
            <router-link to="/forgot-password">Forgot password?</router-link>
        </p>
        <div class="social-icons">
            <ul>
                <!-- Updated the href attribute for the Google login -->
                <li><a :href="googleLoginUrl"><i class="fa fa-google"></i></a></li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            email: "liwei.lin.soso@gmail.com",
            password: "AhaXDQQQ@!123",
            googleLoginUrl: process.env.VUE_APP_BASE_URL + '/auth/google'  // 使用BASE_URL
        };
    },
    methods: {
        async handleLogin() {
            try {
                await this.$store.dispatch('handleLogin', {
                    email: this.email,
                    password: this.password
                });
            } catch (error) {
                console.error("Login failed:", error.message);
            }
        }
    }
};
</script>
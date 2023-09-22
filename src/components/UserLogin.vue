<template>
    <div class="vue-tempalte">
        <h3>Sign In</h3>
        <!-- Email input -->
        <div class="mb-3">
            <label>Email address</label>
            <input v-model="email" type="email" class="form-control form-control-lg" @blur="checkEmailValid" />
        </div>

        <!-- Password input -->
        <div class="mb-3">
            <label>Password</label>
            <input v-model="password" type="password" class="form-control form-control-lg" />
        </div>

        <!-- Error message display -->
        <div class="mb-3" v-if="errorMessage" style="color: red;">
            {{ errorMessage }}
        </div>

        <!-- Sign In button -->
        <div class="container d-flex align-items-center justify-content-between">
            <button @click="handleLogin" class="btn btn-dark btn-lg btn-block" style="height: 46px;">Sign In</button>
            <button class="google-login-button" @click="goToGoogleLogin"></button>
        </div>

        <!-- Forgot password link -->
        <p class="forgot-password text-right mt-2 mb-4">
            <router-link to="/forgot-password">Forgot password?</router-link>
        </p>
    </div>
</template>

<script>
export default {
    data() {
    return {
        email: "",
        password: "",
        googleLoginUrl: process.env.VUE_APP_BASE_URL + '/auth/google',
        errorMessage: "", // Initialize errorMessage to an empty string
        isEmailValid: false,  // New variable to track email validation state
    };
},
methods: {
    validateEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return emailRegex.test(email);
    },
    async handleLogin() {
        this.isEmailValid = this.validateEmail(this.email);  // Validate email before login

        if (!this.isEmailValid) {
            this.errorMessage = "Please provide a valid email address.";
            return;
        }

        try {
            await this.$store.dispatch('handleLogin', {
                email: this.email,
                password: this.password
            });
            this.$router.push('/dashboard').catch(() => {});
        } catch (error) {
            console.error("Login failed:", error.message);
            this.errorMessage = error.message; // Set errorMessage on login failure
        }
    },
        goToGoogleLogin() {
           window.location.href = this.googleLoginUrl;
        }
    }
};
</script>
<style scoped>
.google-login-button {
  width: 191px;
  height: 46px;
  background-image: url(~@/assets/images/btn_google_signin_dark_normal_web@2x.png);
  background-repeat: no-repeat;
  background-size: cover;
  border: none;
  cursor: pointer;
  outline: none;
}

.google-login-button:hover {
  background-image: url(~@/assets/images/btn_google_signin_dark_focus_web@2x.png);
}

.google-login-button:active {
  background-image: url(~@/assets/images/btn_google_signin_dark_pressed_web@2x.png);
}
</style>

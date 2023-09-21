<template>
    <div class="vue-tempalte">
        <h3>Sign Up</h3>
        <div class="mb-3">
            <label>Email address</label>
            <input v-model="email" type="email" class="form-control form-control-lg" />
        </div>
        <div class="mb-3">
            <label>Password</label>
            <input v-model="password" type="password" class="form-control form-control-lg" />
        </div>
        <div class="mb-3">
            <label>Confirm Password</label>
            <input v-model="cpass" type="password" class="form-control form-control-lg" />
        </div>

        <div class="container d-flex align-items-center justify-content-between">
            <button @click="triggerSignup" class="btn btn-dark btn-lg btn-block"  style="height: 46px;">Sign up</button>
            <button class="google-login-button" @click="goToGoogleLogin"></button>
        </div>
        <p class="error-msg" v-if="errorMsg">{{ errorMsg }}</p>
        <p class="forgot-password text-right">
            Already registered
            <router-link :to="{name: 'login'}">sign in?</router-link>
        </p>
    </div>
</template>
<script>
    import { ErrorCode } from '@/constants/apiErrorCodes';

    export default {
        data() {
            return {
                email: "liwei.lin.soso@gmail.com",
                password: "AhaXDQQQ@!123",
                cpass: "AhaXDQQQ@!123",
                errorMsg: "",
                googleLoginUrl: process.env.VUE_APP_BASE_URL + '/auth/google'
            }
        },
        methods: {
            validatePassword() {
                if (this.password !== this.cpass) {
                    return "Password doesn't match the confirmation.";
                }

                if (!/[a-z]/.test(this.password)) {
                    return "Password should contain at least one lower character.";
                }

                if (!/[A-Z]/.test(this.password)) {
                    return "Password should contain at least one upper character.";
                }

                if (!/[0-9]/.test(this.password)) {
                    return "Password should contain at least one digit character.";
                }

                if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(this.password)) {
                    return "Password should contain at least one special character.";
                }

                if (this.password.length < 8) {
                    return "Password should contain at least 8 characters.";
                }

                return null;  // 如果没有验证失败，返回 null
            },
            async triggerSignup() {
                this.errorMsg = "";

                const validationResult = this.validatePassword();

                if (validationResult) {
                    this.errorMsg = validationResult;
                    return;
                }

                try {
                    const response = await this.$store.dispatch('handleSignup', {
                        email: this.email,
                        password: this.password
                    });

                    if (!response.success) {
                        if (response.errCode === ErrorCode.ACCOUNT_CONFLICT_EMAIL) {
                            this.$router.push({
                                name: 'merge-account',
                                params: {
                                    mergeKey: response.mergeKey,
                                    errorCode: response.errCode
                                }
                            });
                        } else {
                            // Handle other errors or simply show the error message
                            this.errorMsg = response.message;
                            console.error(response.message);
                        }
                    } else {
                        // Handle the success scenario (e.g., navigate to dashboard)
                    }

                } catch (error) {
                    console.error("Signup failed:", error.message);
                }
            },
            goToGoogleLogin() {
                window.location.href = this.googleLoginUrl;
            }
        }
    }
</script>
<style scoped>
.error-msg {
    color: red;
    margin-top: 10px;
}
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
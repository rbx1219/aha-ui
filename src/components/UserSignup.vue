<template>
    <div class="vue-tempalte" @keyup.enter="triggerSignup">
        <h3>Sign Up</h3>
        <div class="mb-3">
            <label>Email address</label>
            <input v-model="email" @blur="checkEmailValid" type="email" class="form-control form-control-lg" />
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
import passwordValidationMixin from '@/mixins/passwordValidationMixin';

    export default {
        mixins: [passwordValidationMixin],
        data() {
            return {
                email: "",
                password: "",
                cpass: "",
                errorMsg: "",
                googleLoginUrl: process.env.VUE_APP_BASE_URL + '/auth/google',
                isEmailValid: false,
            }
        },
        methods: {
            async triggerSignup() {
                this.errorMsg = "";

                const validationResult = this.validatePassword(this.password, this.cpass);

                if (validationResult) {
                    this.errorMsg = validationResult;
                    return;
                }

                // this.checkEmailValid();
                // if (!this.isEmailValid) {
                //     this.errorMsg = this.errorMsg || 'empty email'
                //     return;
                // }

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
            },
            validateEmail(email) {
                const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
                return emailRegex.test(email);
            },
            checkEmailValid() {
                this.isEmailValid = this.validateEmail(this.email);  // Validate email on blur

                if (!this.isEmailValid) {
                    this.errorMsg = "Please provide a valid email address.";
                } else {
                    this.errorMsg = "";  // Clear the error message if the email is valid
                }
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
<template>
  <div class="verification-container">
    <h3>Account Verification</h3>
    <p>Your account is not yet verified. Please verify your account to access all features. Also, check your spam or junk folder if you don't see our email in your inbox.</p>
    <button @click="doSend" :disabled="isButtonDisabled">Resend Verification Email</button>
    <p v-if="isButtonDisabled">Please wait for {{ remainingTime }} seconds before trying again.</p>
    <p v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>

<script>

import { sendVerification } from '@/api/sendVerification';
import { mapState } from 'vuex';
import { ErrorCode } from '@/constants/apiErrorCodes';

export default {
  data() {
    return {
      isButtonDisabled: false,
      remainingTime: 0,
      timer: null,
      errorMessage: '',
    };
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    async doSend() {
      this.isButtonDisabled = true;

      const response = await sendVerification(this.user.id);
      if (response.errCode !== ErrorCode.SUCCESS) {
        this.errorMessage = response.message;
      } else {
        this.errorMessage = '';
      }

      this.remainingTime = 120;
      this.timer = setInterval(() => {
        this.remainingTime--;

        if (this.remainingTime === 0) {
          clearInterval(this.timer);
          this.isButtonDisabled = false;
        }
      }, 1000);
    }
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
};
</script>

<template>
  <div class="dialog-overlay" v-if="visible">
    <div class="dialog">
      <h4>Reset Password</h4>

      <!-- Loading Spinner -->
      <div v-if="isLoading" class="loader"></div>

      <div class="input-group">
        <label>Old Password:</label>
        <input v-model="oldPassword" type="password" class="input">
      </div>
      <div class="input-group">
        <label>New Password:</label>
        <input v-model="newPassword" type="password" class="input">
      </div>
      <div class="input-group">
        <label>Confirm New Password:</label>
        <input v-model="confirmNewPassword" type="password" class="input">
      </div>

      <!-- API Error Message -->
      <p v-if="errorMsg" class="error-message">{{ errorMsg }}</p>

      <div class="button-group">
        <button @click="resetPassword" class="button-submit" :disabled="isLoading">Submit</button>
        <button @click="cancel" class="button-cancel" :disabled="isLoading">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>

import passwordValidationMixin from '@/mixins/passwordValidationMixin';
import { updatePassword } from '@/api/updatePassword';
import { ErrorCode } from '@/constants/apiErrorCodes';

export default {
  mixins: [passwordValidationMixin],
  props: {
    visible: Boolean
  },
  data() {
    return {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
      isLoading: false,
      errorMsg: ''
    };
  },
  methods: {
    async resetPassword() {
      this.errorMsg = "";
      this.isLoading = true;

      const validationResult = this.validatePassword(this.newPassword, this.confirmNewPassword);
      if (validationResult) {
        this.errorMsg = validationResult;
        this.isLoading = false;
        return;
      }


      const response = await updatePassword({oldPassword: this.oldPassword, newPassword: this.newPassword});
      this.isLoading = false;
      if (response.errCode !== ErrorCode.SUCCESS) {
        this.errorMsg = response.message;
      } else {
        this.cancel();
      }
    },
    cancel() {
      this.$emit('cancel');
    }
  }
};
</script>

<style scoped>
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.dialog {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 80%;
  max-width: 400px;
}

.input-group {
  margin-bottom: 15px;
}

.input {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.button-group {
  text-align: center;
}

.button-submit,
.button-cancel {
  padding: 10px 15px;
  margin: 5px;
  border-radius: 4px;
  cursor: pointer;
}

.button-submit {
  background-color: #4CAF50;
  color: white;
}

.button-cancel {
  background-color: #f44336;
  color: white;
}

.loader {
  border: 16px solid #f3f3f3; /* Light grey */
  border-top: 16px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 2s linear infinite;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>

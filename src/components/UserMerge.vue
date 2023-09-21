<template>
    <div class="merge-container">
        <h3 class="merge-title">Account Merge</h3>
        <p class="merge-description mb-3">
            It seems there is an account conflict. Would you like to merge your accounts?
        </p>
        <div class="d-flex justify-content-around">
            <button @click="mergeAccounts" class="btn btn-primary">Merge</button>
            <router-link to="/" class="btn btn-secondary">Cancel</router-link>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        errorCode: {
            type: Number,
            required: true
        },
        mergeKey: {
            type: String,
            required: true
        }
    },
    methods: {
        async mergeAccounts() {
            try {
                const response = await this.$store.dispatch('mergeUserAccounts', {
                    errorCode: this.errorCode,
                    mergeKey: this.mergeKey
                });

                if (response.success) {
                    this.$router.push('/dashboard/verify');
                }
            } catch (error) {
                console.error("Account merge failed:", error.message);
            }
        }
    }
}
</script>
<style scoped>
.merge-container {
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  max-width: 500px;
  margin: auto;
}

.merge-title {
  margin-bottom: 20px;
}

.merge-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e0e0e0;
  padding: 10px 0;
}

.merge-label {
  font-weight: bold;
}

.merge-description {
  text-align: center;
  margin-bottom: 20px;
}
</style>
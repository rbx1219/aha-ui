<template>
    <div class="vue-template vh-100 d-flex justify-content-center align-items-center bg-light">
        <div class="card shadow-lg p-3 mb-5 bg-white rounded">
            <div class="card-body">
                <h3 class="card-title mb-4">Account Merge</h3>
                <p class="card-text">
                    It seems there is an account conflict. Would you like to merge your accounts?
                </p>
                <div class="d-flex justify-content-around">
                    <button @click="mergeAccounts" class="btn btn-primary">Merge</button>
                    <router-link to="/" class="btn btn-secondary">Cancel</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// Assuming you have methods or logic for the mergeAccounts function
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
                    // Handle success scenario, e.g., redirect to dashboard or show a success message
                    this.$router.push('/dashboard');
                }
            } catch (error) {
                console.error("Account merge failed:", error.message);
            }
        }
    }
}
</script>

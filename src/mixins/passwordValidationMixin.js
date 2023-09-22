export default {
    methods: {
      validatePassword(password, cpass) {
        if (password !== cpass) {
          return "Password doesn't match the confirmation.";
        }

        if (!/[a-z]/.test(password)) {
          return "Password should contain at least one lower character.";
        }

        if (!/[A-Z]/.test(password)) {
          return "Password should contain at least one upper character.";
        }

        if (!/[0-9]/.test(password)) {
          return "Password should contain at least one digit character.";
        }

        if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(password)) {
          return "Password should contain at least one special character.";
        }

        if (password.length < 8) {
          return "Password should contain at least 8 characters.";
        }

        return null;
      },
    }
  }

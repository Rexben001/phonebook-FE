<template>
  <form class="login">
        <router-link to="/">
      <p class="back"><i class="fa fa-angle-left" /> go back to home</p>
    </router-link>
    <p class="details">Login</p>
    <p class="error">{{ error }}</p>
    <input placeholder="Email address" v-model="email" type="email" />
    <input placeholder="Password" v-model="password" type="password" />
    <button id="submit" @click.prevent="submitted">Login</button>
  </form>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Login',
  data: function() {
    return {
      email: '',
      password: '',
      error: '',
      isLoading: false,
    };
  },

  methods: {
    async submitted() {
      this.isLoading = true;
      try {
        const {data} = await axios.post(
        "https://phone-book-rexben.herokuapp.com/login",
          {
            password: this.password,
            email: this.email,
          }
        );
        localStorage.setItem('zigsToken', data.token);
        window.location.href = '/';
      } catch (error) {
        this.error = error.response.data.message;
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped>
#submit {
  background: #9eb369;
  padding: 1rem 1.5rem;
  font-size: 1rem;
  color: white;
  border-radius: 7px;
  margin: 1rem;
  cursor: pointer;
}
#submit:hover {
  color: #9eb369;
  background: white;
  border: #9eb369 solid 2px;
}
form {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 500px;
  font-size: 1rem;
  padding-top: 2vh;
}
input {
  padding: 1rem;
  margin: 1rem;
  border-radius: 7px;
}
input:focus,
button:focus {
  outline: 0px;
}
p:first-child {
  font-size: 2rem;
}
a {
  text-decoration: none;
  color: black;
}
a:hover {
  color: green;
}
/* .login {
  margin-top: 70px;
} */
.login > input {
  border: #9eb369 1px solid;
}
.login > button {
  border: #9eb369 1px solid;
}
.details {
  font-size: 1.2rem;
  font-weight: 700;
  font-family: Avenir;
  color: #2a3b00;
}
.back {
  font-weight: 700;
  /* font-size: 1.5rem; */
  text-align: left;
}
@media only screen and (max-width: 700px) {
  form {
    width: 100%;
  }
}
</style>
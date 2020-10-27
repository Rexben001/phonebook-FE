<template>
  <div class="details">
    <router-link to="/">
      <p class="back"><i class="fa fa-angle-left" /> Home</p>
    </router-link>
    <img v-if="isLoading" class="loader" src="https://i.gifer.com/ZZ5H.gif" />
    <div v-else>
      <img :src="contact.Image" />
      <p><strong>Name</strong> {{ contact.Name }}</p>
      <p>
        <a :href="`mailto:${contact.Email}`">
          <strong>Email</strong> {{ contact.Email }}
        </a>
      </p>
      <p>
        <a :href="`tel:${contact.Number}`">
          <strong>Phone</strong> {{ contact.Number }}
        </a>
      </p>
      <p><strong>About Me</strong></p>
      <p>
        {{ contact.About }}
      </p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Details',
  data: function() {
    return {
      contact: '',
      isLoading: true,
    };
  },
  async mounted() {
    const { id } = this.$route.params;
    const { data } = await axios.get(
      `https://phone-book-rexben.herokuapp.com/contacts/${id}`
    );

    if (data.success) {
      console.log(data.data[0]);
      this.contact = data.data[0];
      this.isLoading = false;
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.details {
  margin: 1rem;
  /* box-shadow: 10px 10px 15px 10px #ddd; */
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

p {
  font-size: 1.1rem;
  text-align: left;
}

img {
  width: 100%;
  height: auto;
  border-radius: 7px;
}
.back {
  font-weight: 700;
  font-size: 1.5rem;
}
.fa-angle-left {
  font-size: 1.5rem;
  color: #1200a3;
}
a {
  text-decoration: none;
  color: inherit;
}
.loader {
  width: 50px;
  height: 50px;
  margin-top: 150px;
}
strong {
  color: #1200a3;
  padding-right: 0.5rem;
}
</style>

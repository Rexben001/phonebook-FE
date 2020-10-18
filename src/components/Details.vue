<template>
  <div class="details">
    <router-link to="/">
      <p class="back"><i class="fa fa-angle-left" /> go back to home</p>
    </router-link>
    <img
      src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
    />
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
</template>

<script>
import axios from 'axios';

export default {
  name: 'Details',
  data: function() {
    return {
      contact: '',
      isLoading: false,
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
  height: 300px;
  border-radius: 7px;
}
.back {
  font-weight: 700;
  font-size: 1.5rem;
}
.fa-angle-left {
  font-size: 1.5rem;
}
a {
  text-decoration: none;
  color: inherit;
}
</style>

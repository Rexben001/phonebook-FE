<template>
  <div class="hello">
    <div class="head">
      <h1>ZIGS Phonebook</h1>
      <div class="search">
        <input placeholder="Search for contacts..." />
        <i class="fa fa-search"></i>
      </div>
    </div>

    <div class="contacts">
      <div v-bind:key="contact.ID" v-for="contact in values">
        <router-link :to="`/details/${contact.ID}`" class="info">
          <img :src="contact.Image" />
          <div>
            <p><i class="fa fa-user-circle"></i> {{ contact.Name }}</p>
            <p><i class="fa fa-envelope"></i> {{ contact.Email }}</p>
            <p>
              <a :href="`tel:${contact.Number}`">
                <i class="fa fa-phone"></i> {{ contact.Number }}</a
              >
            </p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Home',
  props: {
    msg: String,
  },
  data: function() {
    return {
      values: '',
      isLoading: false,
    };
  },
  async mounted() {
    this.isLoading = true;
    const { data } = await axios.get(
      'https://phone-book-rexben.herokuapp.com/contacts'
    );

    if (data.success) {
      console.log(data.data);
      this.values = data.data;
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
  text-decoration: none;
  color: inherit;
}
.info {
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  border-radius: 8px;
  box-shadow: 3px 3px 5px 6px#ddd;
  margin: 1.5rem 0;
}
img {
  width: 40%;
  height: 170px;
}
.info > div {
  width: 50%;
  text-align: left;
}
p {
  font-size: 1.1rem;
}
.search {
  border: 1px solid #ddd;
  color: rgb(81, 81, 81);
  width: 70%;
  margin: 0 auto;
  display: flex;
  padding: 1rem;
  border-radius: 8px;
}

.search > input {
  border: none;
  width: 90%;
  /* padding: 1rem; */
}
input:focus {
  outline: 0;
}
.fa-search {
  text-align: right;
}
.contacts {
  margin-top: 22vh;
}
.head {
  position: fixed;
  top: 0px;
  margin: 0 auto;
  background: white;
  width: 100%;
  box-sizing: border-box;
}
</style>

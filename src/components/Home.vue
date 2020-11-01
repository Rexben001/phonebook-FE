<template>
  <div class="hello">
    <div :class="token ? ' head loginMode' : 'head'">
      <h1><span>ZIGS</span> Phone<span>book</span></h1>
      <div class="search">
        <input
          placeholder="Search for contacts..."
          v-model="search"
          id="search"
          @change="searchResults"
          type="text"
          v-on:input="searchResults"
        />
        <i class="fa fa-search"></i>
      </div>
    </div>

    <div :class="token ? 'contacts loginModeContact' : 'contacts'">
      <p class="total">
        Total Contacts<span> ({{ values.length }})</span>
      </p>
      <img v-if="isLoading" class="loader" src="https://i.gifer.com/ZZ5H.gif" />
      <div v-else>
        <div v-bind:key="contact.ID" v-for="contact in values">
          <router-link
            :to="`/details/${contact.ID}`"
            class="info"
            data-aos="fade-up"
            data-aos-offset="100"
            data-aos-delay="50"
            data-aos-duration="500"
            data-aos-easing="linear"
            data-aos-mirror="true"
          >
            <router-link :to="`/edit/${contact.ID}`">
              <i v-if="token" class="fa fa-edit"></i>
            </router-link>
            <i
              v-if="token"
              class="fa fa-trash"
              @click.prevent="deleteContact(contact.ID)"
            ></i>

            <img :src="contact.Image" />
            <div>
              <p><i class="fa fa-user-circle"></i> {{ contact.Name }}</p>
              <p class="email">
                <i class="fa fa-envelope"></i> {{ contact.Email }}
              </p>
              <p>
                <a :href="`tel:${contact.Number}`">
                  <i class="fa fa-phone"></i> {{ contact.Number }}</a
                >
              </p>
              <p class="see">See more...</p>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Fuse from 'fuse.js';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles

export default {
  name: 'Home',
  props: {
    msg: String,
  },

  data: function() {
    return {
      values: [],
      isLoading: true,
      search: '',
      allValues: [],
      token: localStorage.getItem('zigsToken'),
    };
  },
  async mounted() {
    this.isLoading = true;
    const { data } = await axios.get(
      'https://phone-book-rexben.herokuapp.com/contacts'
    );

    if (data.success) {
      this.values = data.data;
      this.allValues = data.data;
      this.isLoading = false;
    }
  },
  methods: {
    searchResults: function() {
      if (this.search.length > 2) {
        const fuse = new Fuse(this.allValues, {
          shouldSort: true,
          threshold: 0.3,
          location: 0,
          distance: 100,
          maxPatternLength: 12,
          minMatchCharLength: 3,
          findAllMatches: true,
          keys: ['Number', 'Email', 'Name'],
        });
        let result = fuse.search(this.search);

        result = result?.map(({ item }) => item);

        if (result.length) this.values = result;
        else this.allValues;
      } else {
        this.values = this.allValues;
      }
    },
    async deleteContact(id) {
      try {
        this.isLoading = true;
        const { data } = await axios.delete(
          `https://phone-book-rexben.herokuapp.com/contacts/${id}`,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
          }
        );
        console.log('data>>>', data);
        window.location.reload(false);
      } catch (error) {
        window.location.reload(false);
        console.log(error);
      }
    },
  },
};
AOS.init();
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.fa {
  color: #1200a3;
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
  text-decoration: none;
  color: inherit;
}
.info {
  display: flex;
  width: 100%;
  justify-content: space-between;
  border-radius: 8px;
  box-shadow: 3px 3px 5px 6px #e1e1e1;
  margin: 1.5rem 0;
  position: relative;
  box-sizing: border-box;
}
img {
  width: 40%;
  height: 180px;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}
.info > div {
  width: 60%;
  text-align: left;
  padding-left: 1rem;
}
p {
  font-size: 1rem;
  line-height: 1.2;
  /* margin: 0;
  padding: .2rem; */
}
.search {
  border: #1200a3 1px solid;
  color: rgb(81, 81, 81);
  width: 80%;
  margin: 0 auto;
  display: flex;
  padding: 1rem;
  border-radius: 8px;
  margin-left: 15px;
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
  color: #1200a3;
}
.contacts {
  margin-top: 22vh;
}
.head {
  position: fixed;
  top: 0px;
  margin: 0 auto;
  background: white !important;
  width: 100%;
  box-sizing: border-box;
  left: 0;
  z-index: 300;
  /* margin-bottom: 22vh; */
}
.loginMode {
  top: 60px;
  /* margin-bottom: 29vh; */
}
.loginModeContact {
  margin-top: 29vh;
}
.total {
  font-weight: bold;
  text-align: left;
  margin-left: 20px;
}

.total > span {
  color: #1200a3;
}

.fa-edit,
.fa-trash {
  position: absolute;
  right: 10px;
  top: 7px;
  color: red;
}
.fa-edit {
  color: rgb(83, 83, 223);
  right: 30px;
  top: 8px;
}
.loader {
  width: 50px;
  height: 50px;
  margin-top: 150px;
}
p {
  word-break: break-word;
}
.see {
  font-size: 0.9rem;
  position: absolute;
  bottom: -10px;
  right: 10px;
  font-weight: 500;
  color: #1200a3;
  /* text-align: right; */
}

.see:hover {
  color: #727272;
}

h1 span {
  color: #1200a3;
}

@media screen and (min-width: 600px) {
  .hello {
    width: 600px;
    margin: 0 auto;
  }
  .head {
    width: 600px;
    left: 35%;
  }
}
</style>

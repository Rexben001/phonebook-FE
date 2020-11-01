<template>
  <div class="details">
    <router-link to="/">
      <p class="back"><i class="fa fa-angle-left" /> Home</p>
    </router-link>
    <img v-if="isLoading" class="loader" src="https://i.gifer.com/ZZ5H.gif" />
    <div v-else>
      <img :src="contact.Image" />
      <p class="line-1 anim-typewriter">
        <strong>Name</strong> {{ contact.Name }}
      </p>
      <p class="line-1 anim-typewriter">
        <a :href="`mailto:${contact.Email}`">
          <strong>Email</strong> {{ contact.Email }}
        </a>
      </p>

      <p class="line-1 anim-typewriter">
        <a :href="`tel:${contact.Number}`">
          <strong>Phone</strong> {{ contact.Number }}
        </a>
      </p>
      <p class="line-1 anim-typewriter"><strong>About Me</strong></p>
    </div>
    <p id="txtsss">
      <!-- {{ contact.About }} -->
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
      isLoading: true,
      about: '',
      idx: 0,
    };
  },
  // components: { Typewriter },
  async mounted() {
    const { id } = this.$route.params;
    const { data } = await axios.get(
      `https://phone-book-rexben.herokuapp.com/contacts/${id}`
    );

    if (data.success) {
      this.contact = data.data[0];
      this.isLoading = false;
      this.about = this.contact.About;
      document.getElementById('txtsss').innerHTML = '';
      this.typeWriter(this.about);
    }
  },
  methods: {
    typeWriter: function(txt) {
      if (this.idx < txt.length) {
        document.getElementById('txtsss').innerHTML += txt.charAt(this.idx);
        this.idx++;
        var that = this;

        setTimeout(function() {
          that.typeWriter(that.about);
        }, 30);
      }
    },
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

.line-1 {
  /* position: relative; */
  width: 100%;
  border-right: 2px solid rgba(255, 255, 255, 0.75);
  white-space: nowrap;
  overflow: hidden;
  transform: translateY(-50%);
}

/* Animation */
.anim-typewriter {
  animation: typewriter 4s steps(44) 0s 1 normal both,
    blinkTextCursor 500ms steps(44) infinite normal;
}
@keyframes typewriter {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}
@keyframes blinkTextCursor {
  from {
    border-right-color: rgba(255, 255, 255, 0.75);
  }
  to {
    border-right-color: transparent;
  }
}
</style>

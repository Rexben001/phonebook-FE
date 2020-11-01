<template>
  <div class="details">
    <router-link to="/">
      <p class="back"><i class="fa fa-angle-left" /> Home</p>
    </router-link>
    <img v-if="isLoading" class="loader" src="https://i.gifer.com/ZZ5H.gif" />
    <div :class="isLoading ? 'disappear' : 'appear'">
      <img v-if="contact.Image" :src="contact.Image" />
      <p :style="display ? '' : ''">
        <strong>Name</strong> <span id="name"></span>
      </p>
      <p>
        <a :href="`mailto:${email}`">
          <strong>Email</strong> <span id="email"></span>
        </a>
      </p>

      <p>
        <a :href="`tel:${phone}`">
          <strong>Phone</strong> <span id="phone"></span>
        </a>
      </p>
      <p>
        <strong>About Me</strong> <br />
        <span id="about"></span>
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
      about: '',
      idx: 0,
      idxName: 0,
      idxEmail: 0,
      idxPhone: 0,
      name: '',
      email: '',
      phone: '',
    };
  },
  // components: { Typewriter },
  async mounted() {
    document.getElementById('about').innerHTML = '';
    document.getElementById('phone').innerHTML = '';
    document.getElementById('email').innerHTML = '';
    document.getElementById('name').innerHTML = '';

    const { id } = this.$route.params;
    const { data } = await axios.get(
      `https://phone-book-rexben.herokuapp.com/contacts/${id}`
    );

    if (data.success) {
      this.contact = data.data[0];
      this.isLoading = false;

      this.about = this.contact.About;
      this.name = this.contact.Name;
      this.email = this.contact.Email;
      this.phone = this.contact.Number;

      this.typeWriter(this.about);
      this.typeWriter2(this.name);
      this.typeWriter3(this.email);
      this.typeWriter4(this.phone);
    }
  },
  methods: {
    typeWriter: function(txt) {
      if (this.idx < txt.length) {
        document.getElementById('about').innerHTML += txt.charAt(this.idx);
        this.idx++;
        var that = this;

        setTimeout(function() {
          that.typeWriter(that.about);
        }, 45);
      }
    },
    typeWriter2: function(txt) {
      if (this.idxName < txt.length) {
        document.getElementById('name').innerHTML += txt.charAt(this.idxName);
        this.idxName++;
        var that = this;

        setTimeout(function() {
          that.typeWriter2(that.name);
        }, 45);
      }
    },
    typeWriter3: function(txt) {
      if (this.idxEmail < txt.length) {
        document.getElementById('email').innerHTML += txt.charAt(this.idxEmail);
        this.idxEmail++;
        var that = this;

        setTimeout(function() {
          that.typeWriter3(that.email);
        }, 45);
      }
    },
    typeWriter4: function(txt) {
      if (this.idxPhone < txt.length) {
        document.getElementById('phone').innerHTML += txt.charAt(this.idxPhone);
        this.idxPhone++;
        var that = this;

        setTimeout(function() {
          that.typeWriter4(that.phone);
        }, 45);
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

.disappear {
  opacity: 0;
}
.appear {
  opacity: 1;
}
</style>

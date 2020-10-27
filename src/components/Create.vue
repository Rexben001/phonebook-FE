<template>
  <div class="hello">
    <router-link to="/">
      <p class="back"><i class="fa fa-angle-left" /> Home</p>
    </router-link>
    <img v-if="isLoading" class="loader" src="https://i.gifer.com/ZZ5H.gif" />
    <div v-else class="">
      <h1 v-if="id">Edit Contact</h1>
      <h1 v-else>Add Contacts</h1>

      <p class="error">{{ error }}</p>

      <div class="input">
        <p>Full Name</p>
        <input
          placeholder="Enter fullname"
          v-model="name"
          id="fullName"
          type="text"
        />
      </div>
      <div class="input">
        <p>Email</p>
        <input
          placeholder="Enter email"
          v-model="email"
          id="email"
          type="text"
        />
      </div>
      <div class="input">
        <p>Number</p>
        <input
          placeholder="Enter number"
          v-model="number"
          id="number"
          type="text"
        />
      </div>
      <div class="input">
        <p>About</p>
        <textarea placeholder="Enter about" v-model="about" id="about" />
      </div>
      <div class="input">
        <p>Image</p>
        <input
          id="image"
          type="file"
          accept="image/*"
          v-on:change="handleImage"
        />
        <img v-if="id" :src="image" />
      </div>
      <button @click.prevent="submitForm">Submit Form</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Create',
  data: function() {
    return {
      values: [],
      isLoading: false,
      name: '',
      email: '',
      about: '',
      number: '',
      image: '',
      token: localStorage.getItem('zigsToken'),
      id: this.$route.params.id,
      error: '',
    };
  },
  methods: {
    handleImage: function(event) {
      const file = event.target.files[0];
      console.log(typeof file);

      this.image = file;
    },
    async submitForm() {
      if (!this.name) {
        return (this.error = 'Full Name field is required');
      }
      if (!this.email) {
        return (this.error = 'Email field is required');
      }
      if (!this.about) {
        return (this.error = 'About field is required');
      }
      if (!this.number) {
        return (this.error = 'Number field is required');
      }
      if (!this.image) {
        return (this.error = 'Pls, pick an image');
      }
      console.log(typeof this.image);
      this.isLoading = true;
      const imageFile = new FormData();
      imageFile.append('file', this.image);
      imageFile.append('upload_preset', 'daqfl6qw');
      if (typeof this.image != 'string') {
        this.image = await axios
          .post('https://api.cloudinary.com/v1_1/rexben/upload', imageFile)
          .then((res) => res.data.secure_url)
          .catch((e) => console.log('>>>>>>>', e));
      }
      const { name, email, about, number, image } = this;

      console.log('image>>>', image);

      if (!this.id) {
        const { data } = await axios.post(
          'https://phone-book-rexben.herokuapp.com/contacts',
          {
            Name: name,
            Email: email,
            Number: number,
            Image: image,
            About: about,
          }
          // {
          //   headers: {
          //     Authorization: `Bearer ${this.token}`,
          //   },
          // }
        );
        console.log('data>>>>', data);
        if (data.ID) {
          window.location.href = '/';
        }
      } else {
        console.log('Got here now');
        const { data } = await axios.put(
          `https://phone-book-rexben.herokuapp.com/contacts/${this.id}`,
          {
            Name: name,
            Email: email,
            Number: number,
            Image: image,
            About: about,
          },
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );
        console.log(data);
        if (data) {
          window.location.href = '/';
        }
      }
    },
  },
  async mounted() {
    if (this.id) {
      const { data } = await axios.get(
        `https://phone-book-rexben.herokuapp.com/contacts/${this.id}`
      );
      if (data.success) {
        const { Name, Email, About, Number, Image } = data.data[0];
        this.name = Name;
        this.email = Email;
        this.about = About;
        this.number = Number;
        this.image = Image;
      }
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
input,
textarea {
  border-radius: 8px;
  padding: 1rem;
  border: #1200a3 1px solid;
  width: 100%;
  box-sizing: border-box;
}
textarea {
  resize: none;
  height: 150px;
}
p {
  margin: 0.5rem;
  text-align: left;
}
.hello {
  width: 100%;
  box-sizing: border-box;
}
button {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  margin: 1.5rem auto;
  width: 80%;
  font-size: 1.2rem;
  border-radius: 8px;
  background: #1200a3;
  color: white;
  width: 100%;
}
.fa-angle-left {
  font-size: 2.5rem;
}
.back {
  font-weight: 700;
  font-size: 1.5rem;
  margin-top: 0.5rem;
}
img {
  width: 20px;
}
.loader {
  width: 50px;
  height: 50px;
  margin-top: 150px;
}
.back {
  font-weight: 700;
  font-size: 1.5rem;
}
.fa-angle-left {
  font-size: 1.5rem;
  color: #1200a3;
}
.error {
  color: red;
}
@media screen and (min-width: 600px) {
  .hello {
    width: 600px;
    margin: 0 auto;
  }
  .head {
    width: 600px;
  }
}
</style>

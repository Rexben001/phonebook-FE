<template>
  <div class="hello">
    <router-link to="/">
      <p class="back"><i class="fa fa-angle-left" /> Home</p>
    </router-link>
    <div class="">
      <h1>Add Contacts</h1>
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
      nummber: '',
      image: '',
      token: localStorage.getItem('zigsToken'),
    };
  },
  methods: {
    handleImage: function(event) {
      const file = event.target.files[0];
      this.image = file;
    },
    async submitForm() {
      const imageFile = new FormData();
      imageFile.append('file', this.image);
      imageFile.append('upload_preset', 'daqfl6qw');
      this.image = await axios
        .post('https://api.cloudinary.com/v1_1/rexben/upload', imageFile)
        .then((res) => res.data.secure_url)
        .catch((e) => console.log('>>>>>>>', e));
      const { name, email, about, number, image } = this;

      const { data } = await axios.post(
        'https://phone-book-rexben.herokuapp.com/contacts',
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
      if (data.ID) {
        window.location.href = '/';
      }
    },
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
  border: 1px solid #ddd;
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
  margin: 1.5rem;
  width: 80%;
  font-size: 1.2rem;
  border-radius: 8px;
}
.fa-angle-left {
  font-size: 2.5rem;
}
.back {
  font-weight: 700;
  font-size: 1.5rem;
  margin-top: 0.5rem;
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

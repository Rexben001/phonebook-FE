<template>
  <div class="hello">
    <div class="head">
      <h1>{{ msg }}</h1>
      <div class="search">
        <input placeholder="Search for contacts..." />
        <i class="fa fa-search"></i>
      </div>
    </div>

    <div class="contacts">
      <div class="info">
        <img
          src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
        />
        <div>
          <p><i class="fa fa-user-circle"></i> Rex Ben</p>
          <p><i class="fa fa-envelope"></i> rexben.rb@gmail.com</p>
          <p><i class="fa fa-phone"></i> 2347032716134</p>
        </div>
      </div>
      <div class="info">
        <img
          src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
        />
        <div>
          <p><i class="fa fa-user-circle"></i> Rex Ben</p>
          <p><i class="fa fa-envelope"></i> rexben.rb@gmail.com</p>
          <p><i class="fa fa-phone"></i> 2347032716134</p>
        </div>
      </div>
      <div class="info">
        <img
          src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
        />
        <div>
          <p><i class="fa fa-user-circle"></i> Rex Ben</p>
          <p><i class="fa fa-envelope"></i> rexben.rb@gmail.com</p>
          <p><i class="fa fa-phone"></i> 2347032716134</p>
        </div>
      </div>
      <div class="info">
        <img
          src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
        />
        <div>
          <p><i class="fa fa-user-circle"></i> Rex Ben</p>
          <p><i class="fa fa-envelope"></i> rexben.rb@gmail.com</p>
          <p><i class="fa fa-phone"></i> 2347032716134</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  props: {
    msg: String,
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
  color: #42b983;
}
.info {
  display: flex;
  width: 100%;
  justify-content: space-around;
  padding-top: 1rem;
  border-radius: 8px;
  box-shadow: 10px 10px 10px #ddd;
  margin: 1rem 0;
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

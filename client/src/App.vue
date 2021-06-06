<template>
  <div class="app">
    <header>
      <h1>Print-Web</h1>
    </header>
    <main>
      <form @submit.prevent="requestScreenshot">
        <input type="url" name="url" id="url" v-model="url" />
        <input type="submit" value="Print" />
      </form>
      <div v-if="screenshotUrl && !loading" class="canvas">
        <a :href="screenshotUrl" target="_blank" download>
          <img :src="screenshotUrl" alt="screenshot" />
        </a>
      </div>
      <div v-if="loading" style="color: white;">
        Loading...
      </div>
    </main>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "App",
  setup() {
    const url = ref("http://");
    const screenshotUrl = ref("");
    const loading = ref(false);

    const requestScreenshot = async () => {
      loading.value = true;
      const res = await fetch("http://localhost:5000/screenshot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: url.value,
        }),
      }).then((data) => data.json()).finally(() => (loading.value = false));

      screenshotUrl.value = `http://localhost:5000/static/screenshots/${res.ID}.png`;
    };

    return { url, screenshotUrl, requestScreenshot, loading };
  },
};
</script>

<style>
html {
  overflow-x: hidden;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body {
  background: #2f3136;
  overflow-x: hidden;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
  margin-top: 60px;
}

form {
  display: flex;
  width: 100%;
  justify-content: center;
  margin: 2em 0;
}

input {
  box-shadow: 0 3px 3px rgba(211, 211, 211, 0.301);
}

input[type="url"] {
  font-size: 1rem;
  border-radius: 2em 0 0 2em;
  background: #fff;
  padding: 0.2em 1em;
  width: 50%;
  display: block;
  border: none;
  outline: none;
}

a {
  display: inline;
}

input[type="submit"] {
  font-size: 1.5rem;
  background: #fff;
  color: #696969;
  font-weight: bold;
  border: none;
  outline: none;
  padding: .5em;
  border-radius: 0 2em 2em 0;
  transition: 0.2s;
  cursor: pointer;
}

input[type="submit"]:hover {
  background: rgb(217, 218, 219);
}

.canvas {
  width: 60vw;
  border: 2px solid #44ddbf;
  margin: auto;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>

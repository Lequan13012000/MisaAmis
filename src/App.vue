<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: "App",
};
</script>
<style lang="scss">
body {
  font-family: GoogleSans;
  // font-size: 13px;
  margin: 0;
  overflow-y: hidden;
  p {
    margin: 0;
  }
}
::-webkit-scrollbar {
  height: 6px;
  width: 6px;
  background-color: #fff;
}
::-webkit-scrollbar-thumb {
  border-radius: 2px;
  cursor: pointer;
  width: 4px;
  height: 4px;
  background-color: #b6b9ce;
}
@font-face {
  font-family: GoogleSans;
  src: url("assets/font/GoogleSans/GoogleSans-Regular.woff2");
}

@font-face {
  font-family: GoogleSans-Bold;
  src: url("assets/font/GoogleSans/GoogleSans-Bold.woff2");
}
@font-face {
  font-family: GoogleSans-italic;
  src: url("assets/font/GoogleSans/GoogleSans-Italic.woff2");
}
</style>

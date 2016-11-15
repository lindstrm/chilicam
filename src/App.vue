<template>
  <div id="app" :style="{ backgroundImage: bgimage }">
    <div class="">
      <h1>chilicam</h1>
      <h2>{{ currentImage.replace('.jpg','') }}</h2>
      <!-- <img :src="'http://delete.fnu.nu/chilicam/'+ currentImage" id="scrubber"> -->
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
export default {
  name: 'app',
  data() { return { currentImage: 'Webcam.jpg', imageList: [] }; },
  mounted() {
    this.getImages();
    var self = this;

    $('#app').mousemove(function(e) {
      const x = e.pageX - this.offsetLeft;
      const y = e.pageY - this.offsetTop;
      const hoverPercent = Math.round(x / $(this).width() * 100);
      let index = Math.floor((self.imageList.length+4) * (hoverPercent/100));

      index = index == 0 ? 0 : index-1;
      let bodyindex = index == 0 ? 0 : index-1;

      self.currentImage = self.imageList[index];

      $('body').css({
        backgroundImage: `url(http://delete.fnu.nu/chilicam/${encodeURIComponent(self.imageList[bodyindex])})`
      })
    })
  },
  methods: {
    getImages() {
      const url = 'http://cors-anywhere.herokuapp.com/http://delete.fnu.nu/chilicam/list.php';
      fetch(url)
        .then(response => response.json())
        .then(response => {
          this.currentImage = response[response.length-1];
          this.imageList = response;
        });
    }
  },

  computed: {
    dev() {
      return process.env.NODE_ENV === 'development';
    },

    bgimage() {
      return `url(http://delete.fnu.nu/chilicam/${encodeURIComponent(this.currentImage)})`
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Shrikhand');

body {
  font-family: 'Shrikhand', cursive;
  background-color: rgb(38, 40, 36);
  padding: 0;
  margin: 0;
  color: #ccff00;
  text-shadow: 2px 2px #ff0000;
  background-image: url(http://delete.fnu.nu/chilicam/Webcam.jpg);
  background-position: 0 0;
  background-repeat: no-repeat;
  background-size: cover;
}

#app {
  height: 100vh;
  background-position: 0 0;
  background-repeat: no-repeat;
  background-size: cover;
 }

 h1, h2 {
   margin: 0 0 0 20px;
 }

#scrubber { width: 100%; max-height: 100%; }
</style>

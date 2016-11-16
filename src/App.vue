<template>
  <div id="app" :style="{ backgroundImage: bgimage }" v-touch:swipe="swipe">
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
  data() { return { currentImage: 'Webcam.jpg', imageList: [], swipeIndex: 0 }; },
  mounted() {
    this.getImages();
    var self = this;

    $('#app').mousemove(function(event) {
      self.scrub(event);
    })
  },
  methods: {
    swipe(event) {
      let index = event.offsetDirection === 2 ? ++this.swipeIndex : --this.swipeIndex;

      if(index < 0) index = 0;
      else if(index > this.imageList.length) index = this.imageList.length - 1;

      this.currentImage = this.imageList[index];

      this.setBodyBG(index);
    },

    scrub(event) {
      var self = this;
      const x = event.pageX - $('#app').offset().left;
      const y = event.pageY - $('#app').offset().top;
      const hoverPercent = Math.round(x / $('#app').width() * 100);
      let index = Math.floor((self.imageList.length) * (hoverPercent/100));
      // console.log(self)
      index = index == 0 ? 0 : index-1;

      self.currentImage = self.imageList[index];

      self.setBodyBG(index);
    },

    setBodyBG(index) {
      let bodyindex = index == 0 ? 0 : index-1;
      $('body').css({
        backgroundImage: `url(http://delete.fnu.nu/chilicam/${encodeURIComponent(this.imageList[bodyindex])})`
      });
    },

    getImages() {
      const url = 'http://cors-anywhere.herokuapp.com/http://delete.fnu.nu/chilicam/list.php';
      this.$http.get(url)
        .then(response => JSON.parse(response.body))
        // .then(response => console.log(response))
        .then(response => {
          this.currentImage = response[response.length-1];
          this.imageList = response;
        });
    }
  },

  computed: {
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

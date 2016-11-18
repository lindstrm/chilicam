<template>
  <div id="app" :style="{ backgroundImage: bgimage }" v-touch:pan="scrub">
    <div class="">
      <h1>chilicam</h1>
      <h2>{{ currentImage.replace('.jpg','') }}</h2>
      <h2 class="portrait-notice">Looks best in landscape mode!</h2>
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
    scrub(event) {
      const self = this;
      const pageX = event.pageX ? event.pageX : event.pointers[0].pageX;
      const x = pageX - $('#app').offset().left;
      let hoverPercent = Math.round(x / $('#app').width() * 100);
      hoverPercent = hoverPercent < 0 ? 0 : (hoverPercent > 100 ? 100 : hoverPercent);
      let index = Math.floor((this.imageList.length) * (hoverPercent/100));
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

.portrait-notice {
  display: none;
}

#scrubber { width: 100%; max-height: 100%; }

@media screen and (max-width: 500px) {
  .portrait-notice {
    display: block;
  }

  h1, h2 {
    /*font-size: 3em;*/
  }

  #app {
    background-position: -330px 0
  }
}
/* Landscape */

@media screen and (orientation:landscape) {
  /* Landscape styles here */
}

</style>

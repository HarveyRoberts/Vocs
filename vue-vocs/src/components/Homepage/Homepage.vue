<template>
  <div v-scroll="scroll">
    <v-parallax class="s1-parallax" src="https://wallpapershome.com/images/pages/pic_h/11925.jpg" style="height:100vh;width:100vw">
      <v-layout column align-center justify-center>
        <v-flex class="text-md-center" :class="s1TextClass">
          <h1 class="white--text text-xs-center textMain" >La différence entre <br>parler anglais et <br>bien parler anglais c'est<br></h1>
          <h1 class="white--text text-xs-center mb-0">Vocs</h1>
          <p><v-btn color="white" class="mt-3 s1-btn" large to="/inscription">
            Commencer
          </v-btn></p>
        </v-flex>
      </v-layout>
    </v-parallax>
    <br>
    <br>
    <br>
    <v-container>
      <v-layout row wrap >
        <v-flex xs6 class="text-xs-center s2-image" >
          <img :class="s2IphoneClass" :src="iphone" class="s2-iphone" height="420px">
        </v-flex>
        <v-flex :class="s2TextClass" xs6 class="text-xs-center mt-5 s2-text">
          <h3>Vocs partout où vous êtes.</h3>
          <h5>Grâce au site Web et à l'application mobile, vous pourrez apprendre l'anglais partout où vous êtes.
            Pas de connexion internet? Avec l'application mobile téléchargez votre vocabulaire sur votre appareil pour toujours l'avoir avec vous.</h5>
        </v-flex>
      </v-layout>
    </v-container>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
      <v-container fluid style="background-color: #f5f5f5">
        <br>
        <br>
        <v-flex xs10 offset-xs1>
          <v-layout row wrap >
            <v-flex xs12 style="height: 100px" class="text-xs-center s3-headline" :class="s3MainTextClass">
              <h3>Une superb façon d'apprendre</h3>
            </v-flex>
          </v-layout>
          <v-layout row wrap >
            <v-flex xs3 class="text-xs-center s3-box" :class="s3TextClassLeft">
              <p><v-icon class="s3-icon">done</v-icon></p>
              <h4>Simple, efficace et facile d'utilisation.</h4>
            </v-flex>
            <v-flex xs3 class="text-xs-center s3-box">
              <p><v-icon :class="s3TextClassMiddle" class="s3-icon">memory</v-icon></p>
              <h4 :class="s3TextClassMiddle">Algorithmes d'apprentissage.</h4>
            </v-flex>
            <v-flex xs3 class="text-xs-center s3-box">
              <p><v-icon :class="s3TextClassMiddle" class="s3-icon">school</v-icon></p>
              <h4 :class="s3TextClassMiddle">Rejoingnez une classe.</h4>
            </v-flex>
            <v-flex xs3 class="text-xs-center s3-box" :class="s3TextClassRight">
              <p><v-icon class="s3-icon">language</v-icon></p>
              <h4 >Intéragissez avec votre enseignant.</h4>
            </v-flex>
          </v-layout>
        </v-flex>
        <br>
      </v-container>
    <v-parallax :src="clouds" height="3600" style="height: 220vh;background-color: #4bcdff; width:100vw">
      <v-parallax :src="clouds2" height="11000" style="position:absolute; width:100vw">
      </v-parallax>
      <v-layout row wrap style="margin-top: 500px" >
        <v-flex xs6 class="text-xs-center s2-image" >
          <img :class="s4IphoneImgClass" :src="iphone" height="420px">
          <h3 style="color: #f5f5f5; margin-top: 10px" :class="s4IphoneTextClass">Disponible à télécharger sur votre iPhone.</h3>
          <v-btn :class="s4IphoneTextClass">AppStore</v-btn>
        </v-flex>
        <v-flex xs6 class="text-xs-center s2-text" >
          <img :class="s4AndroidImgClass" :src="android" height="420px">
          <h3 style="color: #f5f5f5; margin-top: 10px" :class="s4AndroidTextClass">Ou alors sur votre appareil Android. Obtenez Vocs dès maintenant.</h3>
          <v-btn :class="s4AndroidTextClass">Google Play Store</v-btn>
        </v-flex>
      </v-layout>
    </v-parallax>
    <footer style="height: 300px;background-color: rgba(0,0,0,0.85)">

    </footer>
  </div>
</template>

<script>
  import HomepageBG from '@/assets/HomepageBG.png'
  import HomepageBG2 from '@/assets/HomepageBG2.png'
  import HomepageBG3 from '@/assets/HomepageBG3.png'
  import HomepageBG4 from '@/assets/HomepageBG4.png'
  import Iphone from '@/assets/iphone.png'
  import Android from '@/assets/android.png'
  import clouds from '@/assets/cloud1.png'
  import clouds2 from '@/assets/cloud2.png'

  export default {
    data () {
      return {
        sliderImages: [
          {imageUrl: HomepageBG, title: 'Le Vocabulaire'},
          {imageUrl: HomepageBG2, title: 'L\'Orthophe'},
          {imageUrl: HomepageBG3, title: 'La Grammaire'},
          {imageUrl: HomepageBG4, title: 'Vocs'}
        ],
        iphone: Iphone,
        android: Android,
        clouds: clouds,
        clouds2: clouds2,
        s1TextClass: 's1-text-hide',
        s2IphoneClass: 's2-iphone-hide',
        s2TextClass: 's2-text-hide',
        s3MainTextClass: 's3-main-text-hide',
        s3TextClassLeft: 's3-text-left-hide',
        s3TextClassRight: 's3-text-right-hide',
        s3TextClassMiddle: 's3-text-middle-hide',
        s4IphoneTextClass: 's4-iphone-text-hide',
        s4IphoneImgClass: 's4-iphone-img-hide',
        s4AndroidTextClass: 's4-android-text-hide',
        s4AndroidImgClass: 's4-android-img-hide',
        headlineTexts: ['Le Vocabulaire', 'La Grammaire', 'L\'Orthographe', 'Vocs']
      }
    },
    methods: {
      scroll (e) {
        this.offsetTop = window.pageYOffset || document.documentElement.scrollTop
        if (this.offsetTop > 300) {
          this.s2IphoneClass = 's2-iphone-show'
          this.s2TextClass = 's2-text-show'
        } else if (this.offsetTop < 280) {
          this.s2IphoneClass = 's2-iphone-hide'
          this.s2TextClass = 's2-text-hide'
        }
        if (this.offsetTop > 750) {
          this.s3MainTextClass = 's3-main-text-show'
        }
        if (this.offsetTop > 900) {
          this.s3TextClassLeft = 's3-text-left-show'
          this.s3TextClassRight = 's3-text-right-show'
        }
        if (this.offsetTop > 900) {
          this.s3TextClassMiddle = 's3-text-middle-show'
        }
        if (this.offsetTop < 750) {
          this.s3MainTextClass = 's3-main-text-hide'
          this.s3TextClassLeft = 's3-text-left-hide'
          this.s3TextClassRight = 's3-text-right-hide'
          this.s3TextClassMiddle = 's3-text-middle-hide'
        }
        if (this.offsetTop > 1800) {
          this.s4IphoneTextClass = 's4-iphone-text-show'
          this.s4IphoneImgClass = 's4-iphone-img-show'
          this.s4AndroidTextClass = 's4-android-text-show'
          this.s4AndroidImgClass = 's4-android-img-show'
        }
        if (this.offsetTop < 1800) {
          this.s4IphoneTextClass = 's4-iphone-text-hide'
          this.s4IphoneImgClass = 's4-iphone-img-hide'
          this.s4AndroidTextClass = 's4-android-text-hide'
          this.s4AndroidImgClass = 's4-android-img-hide'
        }
      }
    },
    mounted () {
      this.$nextTick(function () {
        this.offsetTop = window.pageYOffset || document.documentElement.scrollTop
        if (this.offsetTop >= 0) {
          this.s1TextClass = 's1-text-show'
        }
      })
    },
    created () {
      this.$store.dispatch('setIsPlayingGame', false)
    }
  }
</script>

<style scoped>
  .textSlide {
    color: white;
    font-size: 4em;

  }
  .textMain {
    margin-top:22vh;
    color: white;
    font-size: 6rem;

  }
  .s1-parallax {
    background-size: contain;
  }
  .s1-text-hide {
    transform: translateY(-150%);
    opacity: 0;
    transition: transform 1.2s ease, opacity 3s;
  }
  .s1-text-show {
    transition: transform 1.2s ease, opacity 3s;
  }
  .s1-btn :hover{
    height: 500px !important;
    transition: height 5s;
  }
  .s2-iphone{
    width:auto;
  }
  .s2-iphone-hide {
    transform: translateX(-300%);
    transition: transform 0.7s cubic-bezier(0.6, 0, 0.07, 1);
  }
  .s2-iphone-show {
    transition: transform 0.7s cubic-bezier(0.6, 0, 0.07, 1);
  }
  .s2-text{
    height: 350px;
  }
  .s2-text-hide {
    transform: translateX(300%);
    transition: transform 0.7s cubic-bezier(0.6, 0, 0.07, 1);
  }
  .s2-text-show {
    transition: transform 0.7s cubic-bezier(0.6, 0, 0.07, 1);
  }
  .s3-headline {
    height: 180px;
  }
  .s3-box {
    height:220px;
  }
  .s3-icon {
    font-size:100px;
  }
  .s3-text-left-hide {
    transform: translateX(-300%);
    opacity: 0;
    transition: transform 0.7s cubic-bezier(0.6, 0, 0.07, 1), opacity 2s;
  }
  .s3-text-left-show {
    transition: transform 0.7s cubic-bezier(0.6, 0, 0.07, 1), opacity 2s;
  }
  .s3-text-middle-hide {
    font-size: 26px;
    opacity: 0.1;
    transition: font-size 1.2s cubic-bezier(0.6, 0, 0.07, 1), opacity 1.2s;
  }
  .s3-text-middle-show {
    transition: font-size 1.2s cubic-bezier(0.6, 0, 0.07, 1), opacity 1.2s;
  }
  .s3-text-right-hide {
    transform: translateX(300%);
    opacity: 0;
    transition: transform 0.7s cubic-bezier(0.6, 0, 0.07, 1), opacity 2s;
  }
  .s3-text-right-show {
    transition: transform 0.7s cubic-bezier(0.6, 0, 0.07, 1), opacity 2s;
  }
  .s3-main-text-hide {
    opacity:0;
    transition: opacity 2s cubic-bezier(0.6, 0, 0.07, 1);
  }
  .s3-main-text-show {
    transition: opacity 2s cubic-bezier(0.6, 0, 0.07, 1);
  }
  .s4-iphone-text-hide {
    transform: translateX(-300%);
    transition: transform 0.7s cubic-bezier(0.6, 0, 0.07, 1);
  }
  .s4-iphone-text-show {
    transition: transform 0.7s cubic-bezier(0.6, 0, 0.07, 1);
  }
  .s4-iphone-img-hide {
    transform: translatex(-300%);
    transition: transform 0.7s cubic-bezier(0.6, 0, 0.07, 1);
  }
  .s4-iphone-img-show {
    transition: transform 0.7s cubic-bezier(0.6, 0, 0.07, 1);
  }
  .s4-android-text-hide {
    transform: translateX(300%);
    transition: transform 0.7s cubic-bezier(0.6, 0, 0.07, 1);
  }
  .s4-android-text-show {
    transition: transform 0.7s cubic-bezier(0.6, 0, 0.07, 1);
  }
  .s4-android-img-hide {
    transform: translateX(300%);
    transition: transform 0.7s cubic-bezier(0.6, 0, 0.07, 1);
  }
  .s4-android-img-show {
    transition: transform 0.7s cubic-bezier(0.6, 0, 0.07, 1);
  }
</style>

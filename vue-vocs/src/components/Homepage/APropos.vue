<template>
  <div v-scroll="scroll">
    <v-parallax class="s1-parallax" src="https://www.sinium.com/media/2013/08/sinium-bg.png" style="height:100vh;width:100vw">
      <v-layout column align-center justify-center>
        <v-flex class="text-md-center" :class="s1TextClass">
          <h1 class="white--text text-xs-center textMain" >A propos de<br></h1>
          <h1 class="white--text text-xs-center mb-0">Vocs</h1>
          <p><v-btn icon class="mt-3 s1-btn" large @click="autoScrollDown">
            <v-icon large color="white">keyboard_arrow_down</v-icon></v-btn></p>
        </v-flex>
      </v-layout>
    </v-parallax>
    <br>
    <br>
    <br>
    <v-container>
      <v-layout row wrap class="text-xs-center">
        <h5><strong>Vocs a pour but de répondre à plusieurs

          problématiques :</strong><br><br>

          ➔ Comment apprendre le vocabulaire anglais sur le long terme ?<br><br>

          ➔ Comment utiliser les technologies mises à disposition (smartphone,

          ordinateur) des étudiants à des fins pédagogiques ?<br><br>

          ➔ Comment partager le savoir des professeurs d’anglais à une grande

          communauté d’étudiants ?<br><br><br>

          <strong> Les Listes :</strong><br><br>

          Nous comptons tout d'abord implanter un système de listes. Initialement la plateforme

          contiendra des listes de vocabulaire sur différentes thématiques que les utilisateurs

          pourront s’approprier.<br>

          Ainsi, tout le monde pourra télécharger une liste quand il le souhaitera pour pouvoir réviser

          où bon lui plaira et surtout, quand le temps le lui permettra.<br>

          Chaque utilisateur pourra créer ses propres listes de mots traduits qu'il pourra

          ensuite réviser à sa guise. (Les listes pourront être mises en ligne après être soumises à une

          correction des traductions par des professeurs ou par les administrateurs).<br>

          Les listes pourront aussi être mises par des professeurs, et être soumises à leurs élèves,

          qui devront s'inscrire dans leur classe pour pouvoir les consulter.<br>

          Par exemple, vous êtes professeur d'une classe de première 4 au lycée Victor Hugo à

          Caen. Sur internet, un groupe privé sera créé et nommé "1A du lycée Victor Hugo Caen". Le

          professeur pourra créer la classe, choisir son nom et gérer la classe. Les élèves pourront

          rejoindre la classe et vous pourrez accepter ou non leur demande d'adhésion (pour éviter les

          fausses candidatures). Les élèves pourront ainsi faire des tests.<br><br><br>

          <strong>Les modes d’apprentissage :</strong><br><br>

          Nous avons aussi pour idée d'implanter différents modes d’apprentissage. Par exemple:

          - La Traduction: une traduction en français ou en anglais des mots proposés par

          l'application.<br><br>

          - Le Time-Attack: à l'image de beaucoup de mini-jeux sur internet, nous proposons un jeu où

          le but est de traduire le plus de mots possible dans le temps imparti.<br><br>

          - Le Matching: ce mode propose une liste de mots français et anglais répartis de part et

          d'autre de l'écran. Ils sont placés au hasard et l'élève doit relier les traductions entre elles.<br><br>

          - Le QCM: un mot en anglais ou en français est proposé. Plusieurs traductions apparaissent.

          Il suffit de cocher la ou les bonnes réponses.<br><br>

          - Le mode Hard: Les mots que chaque utilisateur orthographient le moins bien sont stockés

          dans une Hard-List personnelle. Nous prenons ensuite ces fameux mots et réalisons un test

          constitué uniquement de ces mots.<br><br><br>

          <strong>Les statistiques :</strong><br><br>

          Nous souhaitons aussi mettre en place un système de statistiques, permettant à

          chacun de savoir dans quels domaines il est le plus performant et, a contrario, dans lesquels

          il doit progresser.<br><br><br>

          <strong>Les fonctionnalités supplémentaires :</strong><br><br>

          Un système de prononciation sera aussi mis en place, accompagné de symboles

          phonétiques. Il sera possible de cliquer sur un bouton haut-parleur pour entendre la

          prononciation du mot choisi, et la phonétique de ce mot apparaîtra juste à côté.</h5>
      </v-layout>
    </v-container>


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
        s3TextClassMiddle: 's3-text-middle-hide'
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
        if (this.offsetTop > 800) {
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
      },
      autoScrollDown () {
        do {
          document.documentElement.scrollTop = document.documentElement.scrollTop + 1
        } while (document.documentElement.scrollTop < 700)
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
    height: 90px !important;
    transition: height 2s;
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
</style>

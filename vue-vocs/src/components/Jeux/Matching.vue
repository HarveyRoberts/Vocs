<template>
  <v-container fluid class="mt-5" style="background-color: #f4f4f4; height: 685px" >
    <v-layout row wrap style="margin-top: 20vh">
      <v-flex xs4 offset-xs4>
        <div class="text-xs-center">
          <form v-if="!finished">
            <h4>{{questionResult}}</h4>
            <v-layout row wrap style="margin-left:-25vw;width: 75vw">
              <v-flex xs6 style="background-color: #0d47a1">
                <div v-for="(aword,index) in listTrads"  v-if="index < amountOfQuestionsUserWants">
                  <v-btn :class="{selected: selectedTradWord === aword}" @click="testButtonsAndSelectCurrent(null,aword)"><h4>{{aword}}</h4></v-btn>
                </div>
              </v-flex>
              <v-flex xs6 style="background-color: #00a150">
                <div v-for="(aword,index) in listWords" v-if="index < amountOfQuestionsUserWants">
                  <v-btn :class="{selected: selectedWord === aword}" @click="testButtonsAndSelectCurrent(aword,null)"><h4>{{aword}}</h4></v-btn>
                </div>
              </v-flex>
            </v-layout>
          </form>
          <div v-if="finished">
            <h2>Résultat:</h2>
            <br>
            <h2>{{correctAnswers}} / {{questionsAsked}} !</h2>
            <br>
            <v-btn class="blue" dark large to=/games>Terminer</v-btn>
          </div>
        </div>
      </v-flex>
    </v-layout>
    <v-layout row justify-center>
      <v-dialog v-if="this.listSize >= 1"persistent v-model="amountOfQuestionsDialog">
        <v-card class="light-blue" dark>
          <v-card-title dark class="headline">Selectionnez le nombre de mots voulues</v-card-title>
          <v-slider min="1" dark class="pl-4 pr-4" track-color="gray" thumb-color="indigo" color="white" :max="this.listSize" v-model="amountOfQuestionsUserWants" thumb-label step="1" snap></v-slider>
          <div class="text-xs-center pb-2"> <v-btn large flat dark @click="amountOfQuestionsDialog = false" >Jouer</v-btn></div>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        question: '',
        userAnswer: '',
        answer: '',
        questionsAsked: 0,
        finished: false,
        questionResult: '',
        correctAnswers: 0,
        currentWordToRemove: '',
        listSize: 0,
        amountOfQuestionsUserWants: null,
        amountOfQuestionsDialog: true,
        droppedList: [],
        listWords: [],
        listTrads:[],
        selectedWord: null,
        selectedTradWord: null
      }
    },
    computed: {
      list () {
        return JSON.parse(JSON.stringify(this.$store.getters.gameList))
      },
      progress () {
        return (this.questionsAsked / this.amountOfQuestionsUserWants) * 100
      }
    },
    methods: {
      randomQuestion () {
        var randomNum = Math.floor(Math.random() * this.list.wordTrads.length)
        this.question = this.list.wordTrads[randomNum].word.content
        this.answer = this.list.wordTrads[randomNum].trad.content
        this.currentWordToRemove = randomNum
      },
      testAnswer () {
        this.questionsAsked++
        if (this.userAnswer === this.answer) {
          this.correctAnswers++
          this.questionResult = 'Bonne Réponse'
          if (this.questionsAsked >= this.amountOfQuestionsUserWants) {
            this.finished = true
          } else {
            this.list.wordTrads.splice(this.currentWordToRemove, 1)
            this.randomQuestion()
          }
        } else {
          this.questionResult = 'Mauvaise Réponse'
          if (this.questionsAsked >= this.amountOfQuestionsUserWants) {
            this.finished = true
          } else {
            this.list.wordTrads.splice(this.currentWordToRemove, 1)
            this.randomQuestion()
          }
        }
        this.userAnswer = ''
      },
      testButtonsAndSelectCurrent(word,trad) {
        if (word === null) {
          this.selectedTradWord = trad
        } else {
          this.selectedWord = word
        }
        if (this.selectedTradWord !== null && this.selectedWord !== null) {
          var theCorrectAnswer = null
          for(var i=0;i<this.list.wordTrads.length;i++) {
            if(this.selectedTradWord === this.list.wordTrads[i].trad.content) {
              theCorrectAnswer = this.list.wordTrads[i].word.content
            }
          }
          console.log(theCorrectAnswer)
          if(this.selectedWord === theCorrectAnswer) {
            this.questionResult = 'correct'
          } else {
            this.questionResult = 'wrong'
          }
        }
      }
    },
    created () {
      this.listSize = this.list.wordTrads.length
      for(var i=0;i<this.listSize;i++) {
        this.listWords[i] = this.list.wordTrads[i].word.content
        this.listTrads[i] = this.list.wordTrads[i].trad.content
      }
      this.randomQuestion()
    }
  }
</script>

<style scoped>
  .selected {
    opacity:0.5;
  }
</style>

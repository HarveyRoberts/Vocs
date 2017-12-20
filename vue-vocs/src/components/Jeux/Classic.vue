<template>
  <v-container fluid class="mt-5" style="background-color: #f4f4f4; height: 685px" >
    <v-layout row wrap style="margin-top: 20vh">
      <v-flex xs4 offset-xs4>
        <div class="text-xs-center">
          <div class="mb-5">
            <div style="width: 100%; background-color: rgba(0,115,237,0.47); height: 10px">
              <div style="background-color: #059ffb; height: 10px; transition: all 300ms cubic-bezier(0.550, 0.085, 0.680, 0.530)" :style="{width: progress + '%'}"></div>
            </div>
          </div>
          <form v-if="!finished">
            <h5>{{questionResult}}</h5>
            <br>
            <h2>Question: {{question}}</h2>
            <br>
            <v-layout row>
              <v-flex xs12>
                <v-text-field
                  name="answer"
                  label="Réponse"
                  id="Answer"
                  v-model="userAnswer"
                  autofocus
                  clearable
                  hint="Entrez le la traduction du mot affiché"
                >
                </v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12>
                <v-btn @click="testAnswer" >Ok</v-btn>
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
          <v-card-title dark class="headline">Selectionnez le nombre de questions voulues</v-card-title>
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
        amountOfQuestionsDialog: true
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
      }
    },
    created () {
      this.listSize = this.list.wordTrads.length
      this.randomQuestion()
    }
  }
</script>

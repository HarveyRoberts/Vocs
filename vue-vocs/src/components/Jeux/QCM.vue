<template>
  <v-container fluid class=mt-5 style="background-color: #f4f4f4; height: 685px" >
    <v-layout row wrap style="margin-top: 10vh">
      <v-flex xs4 offset-xs4>
        <div class=text-xs-center>
          <div class="mb-5">
            <div style="width: 100%; background-color: rgba(0,115,237,0.47); height: 10px">
              <div style="background-color: #059ffb; height: 10px; transition: all 300ms cubic-bezier(0.550, 0.085, 0.680, 0.530)" :style="{width: progress + '%'}"></div>
            </div>
          </div>
          <form v-if=!finished>
            <v-layout row>
              <v-flex xs12>

                <v-alert
                  v-if="userEnteredCorrectAnswer"
                  color="success"
                  icon="check_circle"
                  :value="userEnteredCorrectAnswer"
                  dismissible
                  transition="scale-transition"
                >
                  Bonne Réponse!
                </v-alert>
                <div v-if="userEnteredWrongAnswer">
                  <v-alert
                    color="error"
                    icon="warning"
                    :value="userEnteredWrongAnswer"
                    transition="scale-transition"
                  >
                    Mauvaise Réponse...<br>
                    La Bonne Réponse Etait:
                    <h6>{{answer}}</h6>
                    Entrer le bonne réponse en dessous.
                  </v-alert>
                </div>
              </v-flex>
            </v-layout>
            <br>
            <h2>Question: {{question}}</h2>
<!--            <br>
            list: {{list}}
            <br>
            <br>
            tempTemplist: {{tempTempList}}
            <br>
            <br>
            questionChoisesTempList: {{questionChoisesTempList.wordTrads}}-->
            <v-layout row>
              <v-flex xs12 offset-xs4 >
                <v-radio-group v-model=userAnswer :mandatory=false>
                  <v-radio :label=questionChoises[0] :value=questionChoises[0]></v-radio>
                  <v-radio :label=questionChoises[1] :value=questionChoises[1]></v-radio>
                  <v-radio :label=questionChoises[2] :value=questionChoises[2]></v-radio>
                  <v-radio :label=questionChoises[3] :value=questionChoises[3]></v-radio>
                </v-radio-group>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12>
                <v-btn @click=testAnswer>Ok</v-btn>
              </v-flex>
            </v-layout>
          </form>
          <div v-if=finished>
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
      <v-dialog v-if="this.listSize >= 5"persistent v-model="amountOfQuestionsDialog">
        <v-card class="blue" dark>
          <v-card-title class="headline">Selectionnez le nombre de questions voulues</v-card-title>
          <v-slider min="4" dark class="pl-4 pr-4" track-color="gray" thumb-color="indigo" color="white" :max="this.listSize" v-model="amountOfQuestionsUserWants" thumb-label step="1" snap></v-slider>
          <div class="text-xs-center">
            <v-btn dark flat  @click="amountOfQuestionsDialog = false" >Jouer</v-btn>
          </div>
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
        questionChoises: [],
        userAnswer: '',
        answer: '',
        questionsAsked: 0,
        finished: false,
        questionResult: '',
        correctAnswers: 0,
        currentWordToRemove: '',
        listSize: 0,
        tempTempList: '',
        questionChoisesTempList: '',
        randomIndexForCorrectAnswer: null,
        amountOfQuestionsUserWants: null,
        amountOfQuestionsDialog: true,
        userEnteredCorrectAnswer: false,
        userEnteredWrongAnswer: false,
        hasGotItWrong: false
      }
    },
    computed: {
      SelectedListForGameIsLessThanFour () {
        return this.$store.getters.getSelectedListForGame.wordTrads.length <= 4
      },
      list () {
        return JSON.parse(JSON.stringify(this.$store.getters.gameList))
      },
      progress () {
        return (this.questionsAsked / this.amountOfQuestionsUserWants) * 100
      }
    },
    methods: {
      randomQuestion () {
        this.hasGotItWrong = false;
        this.userAnswer = ''
        var randomNum = Math.floor(Math.random() * this.list.wordTrads.length)
        console.log('randomNum: ' + randomNum)
        this.currentWordToRemove = randomNum
        this.question = this.list.wordTrads[randomNum].word.content
        this.answer = this.list.wordTrads[randomNum].trad.content
        this.randomIndexForCorrectAnswer = Math.floor(Math.random() * 4)
        console.log('randomIndexForCorrectAnswer: ' + randomNum)
        console.log('questionChoises: ' + this.questionChoises)
        this.questionChoises[this.randomIndexForCorrectAnswer] = this.answer
        console.log('questionChoises: ' + this.questionChoises)
        for (var h = 0; h < this.list.wordTrads.length; h++) {
          console.log('List: ' + JSON.stringify(this.list.wordTrads[h].trad.content))
        }
        for (var u = 0; u < this.tempTempList.wordTrads.length; u++) {
          console.log('tempTempList: ' + JSON.stringify(this.tempTempList.wordTrads[u].trad.content))
        }
        for (var o = 0; o < this.questionChoisesTempList.wordTrads.length; o++) {
          console.log('questionChoisesTempListBeforeSplice: ' + JSON.stringify(this.questionChoisesTempList.wordTrads[o].trad.content))
        }
        var wordToRemove = null
        for (var x = 0; x < this.questionChoisesTempList.wordTrads.length; x++) {
          console.log('question: ' + this.question)
          console.log('this.questionChoisesTempList.wordTrads[x].trad.content: ' + this.answer)
          if (this.answer === this.questionChoisesTempList.wordTrads[x].trad.content) {
            wordToRemove = x
          }
        }
        this.questionChoisesTempList.wordTrads.splice(wordToRemove, 1)
        for (var y = 0; y < this.questionChoisesTempList.wordTrads.length; y++) {
          console.log('questionChoisesTempListAfterSplice: ' + JSON.stringify(this.questionChoisesTempList.wordTrads[y].trad.content))
        }
        var randomNumChoises = Math.floor(Math.random() * this.questionChoisesTempList.wordTrads.length)
        console.log('randomNumChoises: ' + randomNumChoises)
        for (var i = 0; i < 4; i++) {
          console.log('i: ' + i)
          if (i !== this.randomIndexForCorrectAnswer) {
            this.questionChoises[i] = this.questionChoisesTempList.wordTrads[randomNumChoises].trad.content
            console.log('questionChoises: ' + this.questionChoises)
            this.questionChoisesTempList.wordTrads.splice(randomNumChoises, 1)
            for (var j = 0; j < this.questionChoisesTempList.wordTrads.length; j++) {
              console.log('questionChoisesTempListAfterSplice: ' + JSON.stringify(this.questionChoisesTempList.wordTrads[j].trad.content))
            }
            randomNumChoises = Math.floor(Math.random() * this.questionChoisesTempList.wordTrads.length)
            console.log('randomNumChoises: ' + randomNumChoises)
          }
        }
        console.log('------------------------------------------------')
        console.log('------------------------------------------------')
        console.log('------------------------------------------------')
      },
      testAnswer () {
        if (this.userAnswer === this.answer) {
          if(!this.hasGotItWrong){
            this.correctAnswers++
          }
          this.userEnteredCorrectAnswer = true;
          this.userEnteredWrongAnswer = false;
          this.questionsAsked++
          if (this.questionsAsked >= this.amountOfQuestionsUserWants) {
            this.finished = true
            this.userAnswer = ''
          } else {
            this.list.wordTrads.splice(this.currentWordToRemove, 1)
            this.questionChoises = []
            this.questionChoisesTempList = JSON.parse(JSON.stringify(this.tempTempList))
            this.randomQuestion()
          }
        } else {
          this.hasGotItWrong = true;
          this.userEnteredCorrectAnswer = false;
          this.userEnteredWrongAnswer = true;
        }
      }
    },
    created () {
      /* if (this.$store.getters.getSelectedListForGame !== '' && !this.SelectedListForGameIsLessThanFour) {
        this.list = this.$store.getters.getSelectedListForGame
      } else {
        this.list = this.$store.getters.basicList
      } */
      this.tempTempList = JSON.parse(JSON.stringify(this.list))
      this.questionChoisesTempList = JSON.parse(JSON.stringify(this.list))
      this.listSize = this.list.wordTrads.length
      console.log(JSON.stringify(this.list))
      this.randomQuestion()
      if(this.listSize < 5) {
        this.amountOfQuestionsUserWants = 4;
      }
    }
  }
</script>

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
                  <v-btn class="blue" dark large @click="alertSignalerMot=true">Signaler Le Mot</v-btn>
                </div>
              </v-flex>
            </v-layout>
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
                  hint="Entrez la traduction du mot affiché"
                >
                </v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12>
                <v-btn class="blue" dark large @click="testAnswer" >Ok</v-btn>
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
      <v-dialog v-if="this.listSize > 1"persistent v-model="amountOfQuestionsDialog">
        <v-card class="light-blue" dark>
          <v-card-title dark class="headline">Selectionnez le nombre de questions voulues</v-card-title>
          <v-slider min="1" dark class="pl-4 pr-4" track-color="gray" thumb-color="indigo" color="white" :max="this.listSize" v-model="amountOfQuestionsUserWants" thumb-label step="1" snap></v-slider>
            <div class="text-xs-center pb-2"> <v-btn large flat dark @click="amountOfQuestionsDialog = false" >S'Entrainer</v-btn></div>
        </v-card>
      </v-dialog>
    </v-layout>
    <v-layout row justify-center>
      <v-dialog v-if="alertSignalerMot"persistent v-model="alertSignalerMot">
        <v-card>
          <v-card-title v-if="accountType == 'Élève'" class="headline text-xs-center">Voulez-vous proposer votre mot à votre professeur?</v-card-title>
          <v-card-title v-else class="headline">Voulez-vous proposer votre mot aux administrateurs?</v-card-title>
          <h5 class="text-xs-center">La Bonne réponse:</h5>
          <h5 class="text-xs-center">{{answer}}</h5>
            <h5 class="text-xs-center">Votre proposition:</h5>
          <h5 class="text-xs-center">{{userAnswer}}</h5>
          <div class="text-xs-center pb-2">
            <v-btn large @click="alertSignalerMot = false" >Annuler</v-btn>
            <v-btn large @click="sendSynonyme" >Envoyer</v-btn>
          </div>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-container>
</template>

<script>
  //import VBtn from "vuetify/src/components/VBtn/VBtn";

  export default {
    //components: {VBtn},
    data () {
      return {
        question: '',
        userAnswer: '',
        answer: '',
        questionsAsked: -1,
        finished: false,
        questionResult: '',
        correctAnswers: 0,
        currentWordToRemove: '',
        listSize: 0,
        amountOfQuestionsUserWants: null,
        amountOfQuestionsDialog: true,
        alertSignalerMot: false,
        userEnteredCorrectAnswer : false,
        userEnteredWrongAnswer : false
      }
    },
    computed: {
      user () {
        return this.$store.getters.user
      },
      list () {
        return JSON.parse(JSON.stringify(this.$store.getters.gameList))
      },
      progress () {
        return (this.questionsAsked / this.amountOfQuestionsUserWants) * 100
      },
      accountType () {
        if (this.user.roles === 'STUDENT' || JSON.stringify(this.user.roles) === '["ROLE_STUDENT"]') {
          return 'Élève'
        } else if (this.user.roles === 'PROFESSOR' || JSON.stringify(this.user.roles) === '["ROLE_PROFESSOR"]') {
          return 'Professeur'
        } else {
          return 'Libre'
        }
      }
    },
    methods: {
      randomQuestion () {
        this.questionsAsked++;
        var randomNum = Math.floor(Math.random() * this.list.wordTrads.length)
        this.question = this.list.wordTrads[randomNum].word.content
        this.answer = this.list.wordTrads[randomNum].trad.content
        this.currentWordToRemove = randomNum
        this.userAnswer = ''
      },
      nextQuestion() {
        this.userEnteredCorrectAnswer = false;
        this.userEnteredWrongAnswer= false;
        if (this.questionsAsked >= this.amountOfQuestionsUserWants) {
          this.finished = true
        } else {
          this.list.wordTrads.splice(this.currentWordToRemove, 1)
          this.randomQuestion()
        }
      },
      testAnswer () {
        if (this.userAnswer === this.answer) {
          this.correctAnswers++
          this.userEnteredCorrectAnswer = true;
          this.userEnteredWrongAnswer = false;
          this.questionResult = 'Bonne Réponse'
          if (this.questionsAsked >= this.amountOfQuestionsUserWants) {
            this.finished = true
            this.userAnswer = ''
          } else {
            this.list.wordTrads.splice(this.currentWordToRemove, 1)
            this.randomQuestion()
          }
        } else {
          this.correctAnswers--;
          this.userEnteredCorrectAnswer = false;
          this.userEnteredWrongAnswer = true;
          this.questionResult = 'Mauvaise Réponse'
        }

      },

      sendSynonyme () {
        this.$store.dispatch('sendSynonyme', this.userAnswer, this.answer);

        alertSignalerMot = false;
      }
    },
    created () {
      this.listSize = this.list.wordTrads.length
      this.randomQuestion()
    }
  }
</script>

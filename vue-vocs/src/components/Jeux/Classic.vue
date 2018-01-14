<template>
  <v-container fluid class="mt-5" style="background-color: #f4f4f4; height: 685px" >
    <v-layout row wrap style="margin-top: 5vh">
      <div class="mb-5 text-xs-center" style="width: 90vw;margin:auto">
        <div style="width: 100%; background-color: rgba(0,115,237,0.47); height: 10px">
          <div style="background-color: #059ffb; height: 10px; transition: all 300ms cubic-bezier(0.550, 0.085, 0.680, 0.530)" :style="{width: progress + '%'}"></div>
        </div>
      </div>
      <v-flex xs4 offset-xs4>
        <div class="text-xs-center">
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
                <div v-if="userEnteredSynonym">
                  <v-alert
                    color="info"
                    icon="check_circle"
                    :value="userEnteredSynonym"
                    transition="scale-transition"
                  >
                    C'est correct!<br>
                    Une autre solution est:
                    <h6>{{previousAnswer}}</h6>
                  </v-alert>
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
        answerObject: {},
        questionsAsked: 0,
        finished: false,
        questionResult: '',
        correctAnswers: 0,
        currentWordToRemove: '',
        listSize: 0,
        amountOfQuestionsUserWants: localStorage.getItem('amountOfQuestions'),
        alertSignalerMot: false,
        userEnteredCorrectAnswer : false,
        userEnteredWrongAnswer : false,
        userEnteredSynonym: false,
        hasGotItWrong: false,
        synonymes : [],
        previousAnswer: null
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
        return (this.questionsAsked / this.amountOfQuestionsUserWants) * 100;
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
        this.hasGotItWrong = false;
        var randomNum = Math.floor(Math.random() * this.list.wordTrads.length);
        console.log('Word: ' + JSON.stringify(this.list.wordTrads[randomNum]));
        if(this.list.wordTrads[randomNum].word.language.code === 'EN') {
          this.question = this.list.wordTrads[randomNum].trad.content;
          this.answer = this.list.wordTrads[randomNum].word.content.toLowerCase();
          this.synonymes = this.list.wordTrads[randomNum].trad.trads;
        } else{
          this.question = this.list.wordTrads[randomNum].word.content;
          this.answer = this.list.wordTrads[randomNum].trad.content.toLowerCase();
          this.synonymes = this.list.wordTrads[randomNum].word.trads;
        }
        console.log("all synonymes: " + JSON.stringify(this.list.wordTrads[randomNum].word));
        this.answerObject = this.list.wordTrads[randomNum];
        this.currentWordToRemove = randomNum;
        this.userAnswer = '';
      },
      testAnswer () {
        var heEnteredSynonyme = this.testIfUserEnteredASynonyme(this.userAnswer,this.synonymes);
        if (this.userAnswer.toLowerCase() === this.answer) {
          if(!this.hasGotItWrong){
            this.correctAnswers++
          }
          this.userEnteredCorrectAnswer = true;
          this.userEnteredWrongAnswer = false;
          this.userEnteredSynonym = false;
          this.questionResult = 'Bonne Réponse'
          this.questionsAsked++;
          if (this.questionsAsked >= this.amountOfQuestionsUserWants) {
            this.finished = true
            this.userAnswer = ''
          } else {
            this.list.wordTrads.splice(this.currentWordToRemove, 1)
            this.randomQuestion()
          }
        } else if(heEnteredSynonyme) {
          if(!this.hasGotItWrong){
            this.correctAnswers++
          }
          this.userEnteredCorrectAnswer = false;
          this.userEnteredSynonym = true;
          this.userEnteredWrongAnswer = false;
          this.previousAnswer = this.answer;
          this.questionResult = 'Bonne Réponse'
          this.questionsAsked++;
          if (this.questionsAsked >= this.amountOfQuestionsUserWants) {
            this.finished = true
            this.userAnswer = ''
          } else {
            this.list.wordTrads.splice(this.currentWordToRemove, 1)
            this.randomQuestion()
          }
        }else {
          this.hasGotItWrong = true;
          this.userEnteredSynonym = false;
          this.userEnteredCorrectAnswer = false;
          this.userEnteredWrongAnswer = true;
          this.questionResult = 'Mauvaise Réponse'
        }

      },
      testIfUserEnteredASynonyme(userInput,synonymes){
        console.log("testing for synonyme");
        for (var s=0;s<synonymes.length;s++){
          console.log("user input: "+userInput+" curent synonyme: "+synonymes[s].content);
          if (userInput.toLowerCase() == synonymes[s].content.toLowerCase()){
            return true;
          }
        }
        return false;
      },
      sendSynonyme () {
        var toSend = {
          userAnswer: this.userAnswer,
          answerObject: this.answerObject
        }
        console.log(this.userAnswer);
        this.$store.dispatch('sendSynonyme', toSend);
        this.alertSignalerMot = false;
      }
    },
    created () {
      this.listSize = this.list.wordTrads.length;
      this.randomQuestion();
    }
  }
</script>

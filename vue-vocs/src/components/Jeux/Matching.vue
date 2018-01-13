<template>
  <v-container fluid class="mt-5" style="background-color: #f4f4f4; height: 125vh" >
    <v-layout row wrap style="margin-top: 5vh">
      <div class="mb-5 text-xs-center" style="width: 90vw;margin:auto">
        <div style="width: 100%; background-color: rgba(0,115,237,0.47); height: 10px">
          <div style="background-color: #059ffb; height: 10px; transition: all 300ms cubic-bezier(0.550, 0.085, 0.680, 0.530)" :style="{width: progress + '%'}"></div>
        </div>
      </div>
      <v-flex xs4 offset-xs4>
        <div class="text-xs-center">
          <form v-if="!finished">
            <v-layout row wrap style="margin-left:-25vw;width: 75vw" v-if="matchedWords.length>0">
              <v-flex xs6 >
                <div v-for="(aword,index) in matchedWords" :key="aword.id" v-if="index < 10">
                  <v-btn style="opacity: 0.3; background-color: #787878"><h4>{{aword.word}}</h4></v-btn>
                </div>
              </v-flex>
              <v-flex xs6 >
                <div v-for="(aword,index) in matchedWords" :key="aword.id" v-if="index < 10">
                  <v-btn style="opacity: 0.3; background-color: #787878"><h4>{{aword.trad}}</h4></v-btn>
                  <v-btn icon style="position:absolute;margin-left: 35px" @click="putBackInList(aword,index)"><v-icon>clear</v-icon></v-btn>
                </div>
              </v-flex>
            </v-layout>
            <br>
            ---------------------------------------------------------------------------------
            <br>
            <v-layout row wrap style="margin-left:-25vw;width: 75vw">
              <v-flex xs6 >
                <div v-for="(aword,index) in listTrads" :key="aword" v-if="index < 10">
                  <v-btn :class="{selected: selectedTradWord === aword}" @click="testButtonsAndSelectCurrent(null,aword)"><h4>{{aword}}</h4></v-btn>
                </div>
              </v-flex>
              <v-flex xs6 >
                <div v-for="(aword,index) in listWords" :key="aword" v-if="index < 10">
                  <v-btn :class="{selected: selectedWord === aword}" @click="testButtonsAndSelectCurrent(aword,null)"><h4>{{aword}}</h4></v-btn>
                </div>
              </v-flex>
            </v-layout>
            <div><v-btn :disabled="matchedWords.length < 10" large class="blue white--text" @click="testAllMatchedWords">Valider</v-btn></div>
          </form>
          <div v-if="finished">
            <h2>Résultat:</h2>
            <br>
            <h2>{{correctAnswers}} / 10 !</h2>
            <br>
            <v-btn class="blue" dark large to=/games>Terminer</v-btn>
            <form v-if="finished">
              <v-layout row wrap style="margin-left:-25vw;width: 75vw" v-if="matchedWords.length>0">
                <v-flex xs6 >
                  <div v-for="(aword,index) in correctionList" :key="aword.id" v-if="index < 10">
                    <v-btn :style="{backgroundColor: aword.color}"><h4>{{aword.word}}</h4></v-btn>
                  </div>
                </v-flex>
                <v-flex xs6 >
                  <div v-for="(aword,index) in correctionList" :key="aword.id" v-if="index < 10">
                    <v-btn :style="{backgroundColor: aword.color}"><h4>{{aword.trad}}</h4></v-btn>
                  </div>
                </v-flex>
              </v-layout>
            </form>
          </div>
        </div>
      </v-flex>
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
        finished: false,
        questionResult: '',
        correctAnswers: 0,
        currentWordToRemove: '',
        listSize: 0,
        droppedList: [],
        listWords: [],
        listTrads:[],
        //array of the words the user has matched
        matchedWords: [],
        //list that appears when user has finished
        correctionList: [],
        selectedWord: null,
        selectedTradWord: null,
        hasGotItWrong: false,
        progress: 0
      }
    },
    computed: {
      list () {
        return JSON.parse(JSON.stringify(this.$store.getters.gameList))
      }
    },
    methods: {
      wordInArray(word){
        for(var i = 0;i<this.listWords.length;i++) {
          if(word == this.listWords[i]) {
            return i;
          }
        }
        return -1;
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
          this.progress = this.progress + 10;
            for(var i=0;i<this.list.wordTrads.length;i++) {
              if(this.selectedTradWord === this.list.wordTrads[i].trad.content) {
                this.matchedWords.push({
                  id:this.matchedWords.length+1,
                  word:this.listTrads[i],
                  trad:this.listWords[this.wordInArray(this.selectedWord)],
                  correct:this.selectedWord === theCorrectAnswer,
                  theHoleWordTradObject:this.list.wordTrads[i]
                });
                this.list.wordTrads.splice(i,1);
                this.listWords.splice(this.wordInArray(this.selectedWord),1);
                this.listTrads.splice(i,1);
                this.selectedTradWord = null;
                this.selectedWord = null;
              }
            }
        }
      },
      putBackInList(aword,index) {
        this.list.wordTrads.unshift(aword.theHoleWordTradObject)
        this.listWords.unshift(aword.trad);
        this.listTrads.unshift(aword.word);
        this.matchedWords.splice(index,1);
        this.progress = this.progress - 10;
      },
      testAllMatchedWords() {
        this.finished = true;
        for(let i=0;i<10;i++){
          if(this.matchedWords[i].correct){
            this.correctAnswers ++;
            this.correctionList[i]= {
              id:i,
              word:this.matchedWords[i].word,
              trad:this.matchedWords[i].trad,
              color: '#89dc6c'
            };
          } else {
            this.correctionList[i]= {
              id:i,
              word:this.matchedWords[i].word,
              trad:this.matchedWords[i].trad,
              color: '#ca6b6c'
            };
          }
        }
      }
    },
    created () {
      this.listSize = this.list.wordTrads.length
      var selectedWord = this.list.wordTrads[Math.floor(Math.random() * (this.listSize))].word.content;
      for(var i=0;i<this.listSize;i++) {
        if(i>0) {
          while(this.wordInArray(selectedWord)>-1) {
            selectedWord = this.list.wordTrads[Math.floor(Math.random() * (this.listSize))].word.content
          }
        }
        this.listWords[i] = selectedWord;
        this.listTrads[i] = this.list.wordTrads[i].trad.content
        selectedWord = this.list.wordTrads[Math.floor(Math.random() * (this.listSize))].word.content
      }
    }
  }
</script>

<style scoped>
  .selected {
    opacity:0.5;
  }
</style>

<template>
  <v-container  style="margin-top: 100px">
    <v-layout>
      <v-flex xs10 offset-xs1>
        <v-card>
          <v-toolbar color="light-blue" dark>
            <v-btn flat to="/lists"><v-icon >arrow_back</v-icon>Retour</v-btn>
            <v-toolbar-title>{{list.name}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn v-if="isAPersonalList" icon @click.stop="createWordDialog = true">
              <v-icon>add</v-icon>
            </v-btn>
          </v-toolbar>
          <v-list>
            <div v-if="list.wordTrads.length <= 0" class="text-xs-center mt-4"><h5>Liste vide</h5></div>
            <v-list-tile v-for="aWord in list.wordTrads" :key="aWord.id">
              <v-dialog v-model="showWordDeleteConfirmation" persistent>
                <v-card>
                  <v-card-title class="headline">Êtes-vous sûr de vouloir supprimer ce mot?</v-card-title>
                  <v-card-text>En supprimant ce mot vous ne pouvez pas revenir en arrière.</v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue" flat @click.native="showWordDeleteConfirmation = false">Annuler</v-btn>
                    <v-btn color="blue" flat @click.native="showWordDeleteConfirmation = false; removeWord(wordRemovalId)">Supprimer</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-list-tile-content>
                <v-list-tile-title>{{aWord.word.content}} &rarr; {{aWord.trad.content}}</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn icon v-if="isAPersonalList" @click="showWordDeleteConfirmation=true; wordRemovalId=aWord.id; selectWord(aWord)">
                  <v-icon color="grey lighten-1">delete</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
    <v-dialog v-model="createWordDialog" temporary>
      <v-card>
        <v-toolbar style="flex: 0 0 auto;" class="info">
          <v-btn icon @click.native="createWordDialog = false" dark>
            <v-icon dark>close</v-icon>
          </v-btn>
          <v-toolbar-title style="color: white">Ajouter un mot</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-title primary-title>
          <v-flex xs12 sm6 offset-sm3>
              <v-form>
                <v-text-field
                  label="Mot"
                  v-model="createWordName"
                  :counter="10"
                  required
                ></v-text-field>
                <v-text-field
                  label="Traduction"
                  v-model="createWordTranslation"
                  :counter="10"
                  required
                ></v-text-field>
                <v-btn :disabled="createWordName === '' || createWordTranslation === ''" @click="addWord(createWordName, createWordTranslation)">Ajouter</v-btn>
              </v-form>
              <div v-for="createdWord in createdWords">{{createdWord.word.content}} &rarr;  {{createdWord.trad.content}}</div>
          </v-flex>
        </v-card-title>
        <v-card-actions>
          <v-flex xs12 sm6 offset-sm3>
            <v-btn
              @click="addWords(createdWords)"
              @click.stop="createWordDialog = false"
              :disabled="!createWordFormIsValid"
            >
              OK
            </v-btn>
          </v-flex>
        </v-card-actions>
        <div style="flex: 1 1 auto;"></div>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        showWordDeleteConfirmation: false,
        wordRemovalId: '',
        createWordDialog: false,
        createWordName: '',
        createWordTranslation: '',
        createWordId: '',
        createdWords: [],
        createWordFormIsValid: false
      }
    },
    props: ['id'],
    computed: {
      list () {
        return this.$store.getters.getSelectedList
      },
      isAPersonalList () {
        return this.$store.getters.isAPersonalList
      }
    },
    methods: {
      removeWord (wordId) {
        this.$store.dispatch('removeWord', wordId)
      },
      selectWord (word) {
        return this.$store.dispatch('selectWord', word)
      },
      addWord (word, trad) {
        if (this.createWordId === '') {
          if (this.list.wordTrads.length > 0) {
            this.createWordId = parseInt(this.list.wordTrads[this.list.wordTrads.length - 1].id) + 1
          } else {
            this.createWordId = 1
          }
        } else {
          this.createWordId++
        }
        this.createdWords.push({word: {content: word, language: 'EN'}, trad: {content: trad, language: 'FR'}})
        this.createWordName = ''
        this.createWordTranslation = ''
        this.createWordFormIsValid = true
      },
      addWords (words) {
        this.$store.dispatch('addWords', words)
        this.createdWords = []
        this.createWordId = ''
      }
    }
  }
</script>

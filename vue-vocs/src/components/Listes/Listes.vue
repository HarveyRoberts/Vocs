<template>
<v-container fluid style="margin-top: 100px">
    <!--Lists card-->
  <v-layout>
    <v-flex xs10 offset-xs1>
      <v-card>
        <v-toolbar color="light-blue" dark>
          <v-toolbar-title>Mes Listes</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click.stop="createList = true">
            <v-icon>add</v-icon>
          </v-btn>
        </v-toolbar>
        <v-list>
          <template v-for="(list,index) in lists">
            <v-list-tile two-line  v-bind:key="list.name" class="mt-3 mb-3">
              <v-btn icon @click.native.stop="confirmListRemoval = true; listRemovalId=list.id">
                <v-icon class="white&#45;&#45;text" >delete</v-icon>
              </v-btn>
              <v-btn v-if="list.wordTrads.length > 0" style="font-size: 12px; background-color: #23c9ff; color: white" @click="selectListForGame(list); confirmPlayWithList = true;" >
                Jouer
              </v-btn>
              <v-btn v-if="isValidForAddingToClass(list.wordTrads.length)" style="font-size: 12px; background-color: #23c9ff; color: white" @click="addToClass = true; selectedListToAddInClass = list" >
                Ajouter dans une classe
              </v-btn>
              <v-list-tile-content style="cursor: pointer" class="ml-3" @click="clickedList(list.id); selectList(list, true)">
                <v-list-tile-title style="font-size: 20px">{{list.name}} <v-icon class="ml-2" @click="confirmListRemoval = true">edit_mode</v-icon></v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-icon style="cursor: pointer" color="grey lighten-1" @click="clickedList(list.id); selectList(list, true)">arrow_right</v-icon>
              </v-list-tile-action>
            </v-list-tile>
            <v-divider style="width:90%" inset v-if="index + 1 < lists.length"></v-divider>
          </template>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
  <v-layout v-if="role === 'STUDENT' && classes.length > 0">
    <v-flex xs10 offset-xs1 class="mt-5">
      <v-card>
        <v-toolbar color="light-blue" dark>
          <v-toolbar-title>Listes De Ma Classe</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-list>
          <v-list-tile v-if="classes[0].lists.length <= 0">
            <v-list-tile-content>
              <v-list-tile-title>Pas De Listes</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <template v-for="(list, index) in classes[0].lists">
            <v-list-tile v-if="classes[0].lists.length > 0">
              <v-btn icon @click="">
                <v-icon>description</v-icon>
              </v-btn>
              <v-btn v-if="list.wordTrads.length > 0" style="font-size: 12px; background-color: #23c9ff; color: white" @click="selectListForGame(list); confirmPlayWithList = true;" >
                Jouer
              </v-btn>
              <v-list-tile-content class="ml-3" style="cursor: pointer" @click="clickedList(list.id); selectList(list, false)">
                <v-list-tile-title style="font-size: 20px">{{ list.name }}</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-icon style="cursor: pointer" color="grey lighten-1" @click="clickedList(list.id); selectList(list, false)">arrow_right</v-icon>
              </v-list-tile-action>
            </v-list-tile>
            <v-divider style="width:90%" inset v-if="index + 1 < lists.length"></v-divider>
          </template>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
  <v-layout v-if="role === 'PROFESSOR'">
    <v-flex xs10 offset-xs1 class="mt-5">
      <v-card>
        <v-toolbar color="light-blue" dark>
          <v-toolbar-title>Listes Dans Mes Classes</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-list>
          <v-list-group v-for="aClass in classes">
            <v-list-tile slot="item" @click="">
              <v-list-tile-action>
                <v-icon>school</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{ aClass.name }}</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-icon>keyboard_arrow_down</v-icon>
              </v-list-tile-action>
            </v-list-tile>
            <v-list-tile v-if="aClass.lists.length <= 0">
              <v-list-tile-content>
                <v-list-tile-title>Pas De Listes</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile v-for="list in aClass.lists">
              <v-list-tile-action>
                <v-icon>description</v-icon>
              </v-list-tile-action>
              <v-list-tile-content style="margin-left: -20px">
                <v-list-tile-title>{{ list.name }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>

  <v-layout row justify-center>
    <v-dialog v-model="confirmListRemoval">
      <v-card>
        <v-card-title class="headline">Êtes-vous sûr de vouloir supprimer votre liste?</v-card-title>
        <v-card-text>Vous ne pouvez pas récupérer votre liste une fois supprimer</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat="flat" @click.native="confirmListRemoval = false">Non</v-btn>
          <v-btn color="blue darken-1" flat="flat" @click.native=" removeList(listRemovalId); confirmListRemoval = false">Oui</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>

  <v-layout row justify-center>
    <v-dialog v-model="confirmClassListRemoval">
      <v-card>
        <v-card-title class="headline">Êtes-vous sûr de vouloir supprimer votre liste?</v-card-title>
        <v-card-text>Vous ne pouvez pas récupérer votre liste une fois supprimer</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat="flat" @click.native="confirmClassListRemoval = false">Non</v-btn>
          <v-btn color="green darken-1" flat="flat" @click.native=" removeClassList(listRemovalId); confirmClassListRemoval = false">Oui</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>

    <!--Create list page-->
    <v-dialog v-model="createList" fullscreen transition="dialog-bottom-transition" style="z-index: 999;position: absolute" :overlay=true
              scrollable>
      <v-card>
        <v-toolbar style="flex: 0 0 auto;" class="info">
          <v-btn icon @click.native="createList = false; addWords = false; createWordName = ''; createWordTranslation = ''; createListName= ''; createListWords = []" dark>
            <v-icon dark>close</v-icon>
          </v-btn>
          <v-toolbar-title style="color: white">Créer une liste</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-title primary-title class="ml-5 mr-5">
          <v-flex xs5 class="ml-5 mr-5">
            <v-card>
              <v-toolbar color="indigo" dark>
                <v-toolbar-title>Ma nouvelle liste</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <div class="ma-5 pb-1">
                <v-form class="ma-5">
                  <v-text-field
                    label="Nom de la liste"
                    v-model="createListName"
                    :counter="10"
                    required
                  ></v-text-field>
                  <v-btn @click="addWords=true" :disabled="addWords===true">Ajouter des mots</v-btn>
                  <v-form v-if="addWords">
                    <v-text-field
                      label="Mot (anglais)"
                      v-model="createWordName"
                      :counter="10"
                      required
                    ></v-text-field>
                    <v-text-field
                      label="Traduction (français)"
                      v-model="createWordTranslation"
                      :counter="10"
                      required
                    ></v-text-field>
                    <v-btn :disabled="createWordName === '' || createWordTranslation === ''" @click="addWord">Ajouter mon mot</v-btn>
                  </v-form>
                </v-form>
              </div>
            </v-card>
          </v-flex>
          <v-flex xs5 class="ml-5 mr-5 mt-0">
            <v-card>
              <v-toolbar color="indigo" dark>
                <v-toolbar-title>Mots ajoutés</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <div>
                <br>
                <div v-if="createListWords.length === 0" class="text-xs-center">Pas de mots ajoutés</div>
                <div v-for="createListWord in createListWords" class="text-xs-center">{{createListWord.word.content}} &rarr; {{createListWord.trad.content}}</div>
                <br>
              </div>
            </v-card>
          </v-flex>
        </v-card-title>
        <v-card-actions>
          <v-flex xs12 sm6 offset-sm5>
            <v-btn
              @click="createAList"
              @click.stop="createList = false"
              :disabled="!createListFormIsValid"
            >
              CREER MA LISTE
            </v-btn>
          </v-flex>
        </v-card-actions>
        <div style="flex: 1 1 auto;"></div>
      </v-card>
    </v-dialog>



  <v-dialog v-model="addToClass" fullscreen transition="dialog-bottom-transition" style="z-index: 999;position: absolute">
    <v-card>
      <v-toolbar style="flex: 0 0 auto;" class="info">
        <v-btn icon @click.native="addToClass = false" dark>
          <v-icon dark>close</v-icon>
        </v-btn>
        <v-toolbar-title style="color: white">Ajouter une liste dans vos classes</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-flex xs12 sm6 offset-sm3>
        <v-card style="width:100%; margin-top: 30px; margin-bottom: 30px" class="gray--text text-xs-center ml-3 mr-3">
          <v-list>
            <template v-for="(aClass,index) in classes">
              <v-list-tile two-line  v-bind:key="aClass.name" class="mt-3 mb-3">
                <v-list-tile-avatar>
                  <img src="https://www.practicepanther.com/wp-content/uploads/2017/02/user.png">
                </v-list-tile-avatar>
                <v-list-tile-content style="cursor: pointer" class="ml-3">
                  <v-list-tile-title style="font-size: 20px">{{aClass.name}} </v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-checkbox v-model="tickedClasses[index]" @click="tickClass(aClass.id)" light></v-checkbox>
                </v-list-tile-action>
              </v-list-tile>
              <v-divider style="width:90%" inset v-if="index + 1 < classes.length"></v-divider>
            </template>
          </v-list>
        </v-card>
      </v-flex>
      <v-card-actions>
        <v-flex xs12 sm6 offset-sm6>
          <v-btn
            @click="addListToClasses(tickedClasses)"
            @click.stop="addToClass = false"
            :disabled="!addListToClassFormIsValid"
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
        createListBoxIsOpen: false,
        createListName: '',
        addWords: false,
        createWordName: '',
        createWordTranslation: '',
        createWordId: 1,
        createListId: '',
        createListWords: [],
        createList: false,
        confirmListRemoval: false,
        confirmPlayWithList: false,
        confirmClassListRemoval: false,
        listRemovalId: '',
        addToClass: false,
        isAPersonalList: null,
        selectedListToAddInClass: ''
      }
    },
    computed: {
      lists () {
        /* loadedLists doesn't take parenthese it is a property (even though it is a method in the store */
        return this.$store.getters.loadedLists
      },
      classLists () {
        return this.$store.getters.classLists
      },
      createListFormIsValid () {
        if (this.createListName !== '' && this.createListWords.length > 0) {
          return true
        }
        return false
      },
      tickedClasses () {
        return this.$store.getters.isClickedClasses
      },
      role () {
        return this.$store.getters.roles
      },
      classes () {
        return this.$store.getters.classes
      },
      addListToClassFormIsValid () {
        var atLeastOneTicked = false
        for (var i = 0; i < this.classes.length; i++) {
          if (this.tickedClasses[i] === true) {
            atLeastOneTicked = true
          }
        }
        return atLeastOneTicked
      },
      hasClass () {
        return JSON.stringify(this.$store.getters.user.classes) !== '[]'
      }
    },
    methods: {
      clickedList (id) {
        this.$router.push('/lists/' + id)
      },
      createAList () {
        const listData = {
          name: this.createListName,
          wordTrads: this.createListWords
        }
        this.$store.dispatch('createList', listData)
        this.createListBoxIsOpen = false
      },
      addWord () {
        this.createListWords.push({word: {content: this.createWordName, language: 'EN'}, trad: {content: this.createWordTranslation, language: 'FR'}})
        this.createWordTranslation = ''
        this.createWordName = ''
        this.createWordId++
      },
      removeList (listId) {
        this.$store.dispatch('removeList', listId)
      },
      removeClassList (listId) {
        this.$store.dispatch('removeClassList', listId)
      },
      setIsAPersonalList (booleanValue) {
        this.isAPersonalList = booleanValue
      },
      selectList (list, booleanValue) {
        this.$store.dispatch('selectList', list)
        this.setIsAPersonalList(booleanValue)
        this.$store.dispatch('setIsAPersonalList', this.isAPersonalList)
      },
      selectListForGame (list) {
        this.$store.dispatch('selectListForGame', list)
        this.$router.push('/games')
      },
      isValidForAddingToClass (listLength) {
        if (this.role === 'PROFESSOR' && listLength > 0) {
          return true
        } else {
          return false
        }
      },
      tickClass (aClassId) {
        this.$store.dispatch('setIsClickedClasses', aClassId)
      },
      addListToClasses (tickedClasses) {
        var toSendOff = {
          selectedList: this.selectedListToAddInClass,
          tickedArray: tickedClasses
        }
        this.$store.dispatch('addListToClasses', toSendOff)
      },
      listIsInClass (list) {
        this.dispatch('listIsInClass', list)
      }
    },
    created () {
      for (var i = 0; i < this.classes.length; i++) {
        this.tickedClasses[i] = false
      }
    }
  }
</script>

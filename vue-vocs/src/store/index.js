import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index.js'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    user: {
      id: null,
      isLoggedIn: false,
      roles: null,
      firstname: null,
      surname: null,
      email: null,
      classes: [
        {
          id: null,
          name: null,
          school: null,
          users: {
            id: null,
            firstname: null,
            surname: null,
            roles: null
          },
          lists: null
        },
        {
          id: 1,
          name: '1A TD1',
          school: 'IUT Caen Ifs',
          users: [
            {id: 1, firstname: 'Jean', surname: 'Tal', avatar: 'https://www.practicepanther.com/wp-content/uploads/2017/02/user.png', roles: 'STUDENT'},
            {id: 2, firstname: 'Simon', surname: 'Aranud', avatar: 'https://www.practicepanther.com/wp-content/uploads/2017/02/user.png', roles: 'STUDENT'},
            {id: 3, firstname: 'Mathis', surname: 'Delaunay', avatar: 'https://www.practicepanther.com/wp-content/uploads/2017/02/user.png', roles: 'STUDENT'},
            {id: 4, firstname: 'Etienne', surname: 'Lebarillier', avatar: 'https://www.practicepanther.com/wp-content/uploads/2017/02/user.png', roles: 'STUDENT'},
            {id: 5, firstname: 'Antoine', surname: 'Lebrun', avatar: 'https://www.practicepanther.com/wp-content/uploads/2017/02/user.png', roles: 'STUDENT'},
            {id: 6, firstname: 'Maxime', surname: 'Gouet', avatar: 'https://www.practicepanther.com/wp-content/uploads/2017/02/user.png', roles: 'STUDENT'},
            {id: 7, firstname: 'Christophe', surname: 'Genard', avatar: 'https://www.practicepanther.com/wp-content/uploads/2017/02/user.png', roles: 'STUDENT'},
            {id: 8, firstname: 'Loic', surname: 'Bitter', avatar: 'https://www.practicepanther.com/wp-content/uploads/2017/02/user.png', roles: 'STUDENT'},
            {id: 9, firstname: 'Thomas', surname: 'Herbelin', avatar: 'https://www.practicepanther.com/wp-content/uploads/2017/02/user.png', roles: 'STUDENT'}
          ],
          lists: null,
          avatar: 'https://www.practicepanther.com/wp-content/uploads/2017/02/user.png'
        }
      ],
      personalLists: []
    },
    isPlayingGame:false,
    editProfil: false,
    isConfirmingPassword: false,
    selectedList: '',
    selectedWord: '',
    selectedListForGame: '',
    gameList: '',
    selectedClass: '',
    isAPersonalList: null,
    firstTimeStudent: false,
    connectionErrorMessage: '',
    inscriptionErrorMessage: '',
    loading: false,
    isClickedClasses: [],
    myDemands: {
      demandSend: [],
      demandReceive: []
    },
    snackbarMessage: '',
    snackbarIsEnabled: false,
    basicList: {
      id: 999,
      name: 'Informatique',
      creationDate: '2017-11-03T17:52:03+01:00',
      wordTrads: [
        {
          id: 8,
          word: {
            trads: [],
            language: {
              code: 'FR'
            },
            content: 'Computer'
          },
          trad: {
            trads: [],
            language: {
              code: 'EN'
            },
            content: 'Ordinateur'
          }
        },
        {
          id: 9,
          word: {
            trads: [],
            language: {
              code: 'FR'
            },
            content: 'Mouse'
          },
          trad: {
            trads: [],
            language: {
              code: 'EN'
            },
            content: 'Souris'
          }
        },
        {
          id: 10,
          word: {
            trads: [],
            language: {
              code: 'FR'
            },
            content: 'Keyboard'
          },
          trad: {
            trads: [],
            language: {
              code: 'EN'
            },
            content: 'Clavier'
          }
        },
        {
          id: 11,
          word: {
            trads: [],
            language: {
              code: 'FR'
            },
            content: 'Screen'
          },
          trad: {
            trads: [],
            language: {
              code: 'EN'
            },
            content: 'Ecran'
          }
        },
        {
          id: 12,
          word: {
            trads: [],
            language: {
              code: 'FR'
            },
            content: 'Chair'
          },
          trad: {
            trads: [],
            language: {
              code: 'EN'
            },
            content: 'Chaise'
          }
        },
        {
          id: 13,
          word: {
            trads: [],
            language: {
              code: 'FR'
            },
            content: 'Door'
          },
          trad: {
            trads: [],
            language: {
              code: 'EN'
            },
            content: 'Porte'
          }
        },
        {
          id: 14,
          word: {
            trads: [],
            language: {
              code: 'FR'
            },
            content: 'Bed'
          },
          trad: {
            trads: [],
            language: {
              code: 'EN'
            },
            content: 'Lit'
          }
        },
        {
          id: 15,
          word: {
            trads: [],
            language: {
              code: 'FR'
            },
            content: 'Clock'
          },
          trad: {
            trads: [],
            language: {
              code: 'EN'
            },
            content: 'Horloge'
          }
        },
        {
          id: 16,
          word: {
            trads: [],
            language: {
              code: 'FR'
            },
            content: 'Printer'
          },
          trad: {
            trads: [],
            language: {
              code: 'EN'
            },
            content: 'Imprimante'
          }
        },
        {
          id: 17,
          word: {
            trads: [],
            language: {
              code: 'FR'
            },
            content: 'Pillow'
          },
          trad: {
            trads: [],
            language: {
              code: 'EN'
            },
            content: 'Oreiller'
          }
        }
      ]
    },
    users: null,
    schools: null,
    allClasses: null
  },
  mutations: {
    createList (state, payload) {
      state.user.personalLists.push(payload);
    },
    addListToUser (state, payload) {
      state.user.personalLists.push(payload);
    },
    createClass (state, payload) {
      state.user.classes.push(payload);
    },
    addStudents (state, payload) {
      /*      for (var i = 0; i < state.user.classes.length; i++) {
              if (state.user.classes[i].id === payload.selectedClass.id) {
                for (var y = 0; y < payload.invitedStudents.length; y++) {
                  state.user.classes[i].users.push({id: state.user.classes[i].users.length + 1, firstname: payload.invitedStudents[y].firstname, surname: payload.invitedStudents[y].surname, roles: 'STUDENT', avatar: 'https://www.practicepanther.com/wp-content/uploads/2017/02/user.png'})
                }
              }
            } */
      state.myDemands.demandSend.push(payload);
      console.log('payload: ' + JSON.stringify(payload));
      console.log('myDemands: ' + JSON.stringify(state.myDemands));
    },
    addTeachers (state, payload) {
      state.myDemands.demandSend.push(payload);
      console.log('payload: ' + JSON.stringify(payload));
      console.log('myDemands: ' + JSON.stringify(state.myDemands));
    },
    removeList (state, payload) {
      for (let i = 0; i < state.user.personalLists.length; i++) {
        if (state.user.personalLists[i].id === payload) {
          state.user.personalLists.splice(i, 1);
        }
      }
    },
    removeClassList (state, payload) {
      for (let i = 0; i < state.user.classLists.length; i++) {
        if (state.user.classLists[i].id === payload) {
          state.user.classLists.splice(i, 1);
        }
      }
    },
    logout (state) {
      state.user = {
        id: null,
        isLoggedIn: false,
        roles: null,
        firstname: null,
        surname: null,
        email: null,
        classes: null,
        personalLists: null
      }
      state.connectionErrorMessage = '';
      state.inscriptionErrorMessage = '';
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userPassword');
    },
    signUserIn (state, payload) {
      state.user = payload;
      if (state.isConfirmingPassword) {
        state.editProfil = true;
      }
      this.dispatch('getAndSetListsClass');
    },
    signUserUp (state, payload) {
      state.user = payload;
    },
    removeStudent (state, payload) {
      if (state.user.roles === 'PROFESSOR') {
        for (var i = 0; i < state.user.classes.length; i++) {
          if (state.user.classes[i] === state.selectedClass) {
            for (var y = 0; y < state.selectedClass.users.length; y++) {
              if (state.selectedClass.users[y].id === payload) {
                state.user.classes[i].users.splice(y, 1);
              }
            }
          }
        }
      } else if (state.user.roles === 'STUDENT') {
        state.user.classes = [];
        router.push('/home');
        state.user.roles = 'USER';
      }
    },
    removeWord (state, payload) {
      for (var i = 0; i < state.selectedList.wordTrads.length; i++) {
        if (state.selectedList.wordTrads[i].id === payload) {
          for (var y = 0; y < state.user.personalLists.length; y++) {
            if (state.user.personalLists[y] === state.selectedList) {
              state.user.personalLists[y].wordTrads.splice(i, 1);
            }
          }
        }
      }
    },
    removeClass (state, payload) {
      for (var i = 0; i < state.user.classes.length; i++) {
        if (state.user.classes[i].id === payload) {
          state.user.classes.splice(i, 1);
        }
      }
    },
    selectList (state, payload) {
      state.selectedList = payload;
    },
    selectWord (state, payload) {
      state.selectedWord = payload;
    },
    selectListForGame (state, payload) {
      state.selectedListForGame = payload;
    },
    setGameList (state, payload) {
      state.gameList = payload;
    },
    selectClass (state, payload) {
      state.selectedClass = payload;
    },
    setIsAPersonalList (state, payload) {
      state.isAPersonalList = payload
    },
    addWords (state, payload) {
      state.selectedList.wordTrads = payload
    },
    setRoles (state, payload) {
      state.user.roles = payload
    },
    setFirstTimeStudent (state, payload) {
      state.firstTimeStudent = payload
    },
    setUserClass (state, payload) {
      /* if (JSON.stringify(state.user.classes) === '[]') {
        state.user.classes = [ {id: null, name: null, school: null} ]
      }
      console.log(payload[0])
      state.user.classes[0].name = payload[0] */
      state.myDemands.demandSend.push(payload)
    },
    resetSignInAndUpErrorMessages (state) {
      state.connectionErrorMessage = ''
      state.inscriptionErrorMessage = ''
    },
    setIsClickedClasses (state, payload) {
      var clickedArray = []
      for (var i = 0; i < state.user.classes.length; i++) {
        if (state.user.classes[i].id === payload) {
          console.log('found the class')
          if (state.isClickedClasses[i] === false) {
            clickedArray[i] = true
          } else {
            clickedArray[i] = false
          }
        } else {
          clickedArray[i] = state.isClickedClasses[i]
        }
      }
      state.isClickedClasses = clickedArray
    },
    addListToClasses (state, payload) {
      var ok = true;
      for (var i = 0; i < state.user.classes.length; i++) {
        if (payload.tickedArray[i] === true) {
          for(var c=0;c<state.user.classes[i].lists.length;c++) {
            if(payload.selectedList.id === state.user.classes[i].lists[c].id) {
              ok =false;
            }
          }
          if(ok) {
            state.user.classes[i].lists.push(payload.selectedList)
          }
        }
      }
    },
    listIsInClass (state, payload) {
      var isInClass = false
      for (var i = 0; i < state.user.classes.length; i++) {
        for (var y = 0; y < state.user.classes[i].lists; y++) {
          if (state.user.classes[i].lists[y] === payload) {
            isInClass = true
          }
        }
      }
      return isInClass
    },
    deleteDemand (state, payload) {
      for (var i = 0; i < state.myDemands.demandReceive.length; i++) {
        if (state.myDemands.demandReceive[i].id === payload) {
          state.myDemands.demandReceive.splice(i, 1)
        }
      }
    },
    deleteDemand2 (state, payload) {
      for (var i = 0; i < state.myDemands.demandSend.length; i++) {
        if (state.myDemands.demandSend[i].id === payload) {
          state.myDemands.demandSend.splice(i, 1)
        }
      }
    },
    addUserToClass (state, payload) {
      state.user.classes[0] = payload
      state.user.roles = 'STUDENT'
      state.myDemands.demandReceive = []
    },
    getAndSetListsClass (state) {
      var counter = 0
      if (state.user.classes.length > 0) {
        for (var b = 0; b < state.user.classes[0].lists.length; b++) {
          Vue.http.get('https://vocsapi.lebarillier.fr/rest/lists/' + state.user.classes[0].lists[b].id)
            .then(response => {
              return response.json()
            })
            .then(data => {
              state.user.classes[0].lists[counter] = data
              counter++
            })
        }
      } else {
        return null
      }
    },
    setSnackbarMessage (state, payload) {
      state.snackbarMessage = payload
    },
    setSnackbarIsEnabled (state, payload) {
      state.snackbarIsEnabled = payload
    },
    modifyProfil (state, payload) {
      state.user.firstname = payload.firstname
      state.user.surname = payload.surname
      state.user.email = payload.email
    }
  },














  /*ACTIONS*/




  actions: {
    setIsPlayingGame({state},payload) {
      state.isPlayingGame = payload;
    },
    createList ({commit, state}, payload) {
      state.loading = true
      var list = {
        name: payload.name,
        wordTrads: []
      }
      var wordContent;
      var tradContent;
      var ok = 0
      Vue.http.post('https://vocsapi.lebarillier.fr/rest/users/' + state.user.id + '/lists', list)
        .then(response => {
          list.id = response.body.id
          console.log(response)
          console.log(list.id)
          console.log('payload.wordTrads: ' + JSON.stringify(payload.wordTrads[0]))
          var wordsToSend = []
          for (var i = 0; i < payload.wordTrads.length; i++) {
            wordContent = payload.wordTrads[i].word.content.toLowerCase()
            wordContent= wordContent.charAt(0).toUpperCase() + wordContent.slice(1);
            tradContent =  payload.wordTrads[i].trad.content.toLowerCase()
            tradContent = tradContent.charAt(0).toUpperCase() + tradContent.slice(1);
            wordsToSend[i] = {
              word: {
                content: wordContent,
                language: 'EN'
              },
              trad: {
                content: tradContent,
                language: 'FR'
              }
            }
            console.log('wordsToSend: ' + JSON.stringify(wordsToSend[i]))
            Vue.http.post('https://vocsapi.lebarillier.fr/rest/users/' + state.user.id + '/lists/' + list.id + '/wordTrad', wordsToSend[i])
              .then(user => {
                console.log('user: ' + user)
                console.log('wordTrads[' + i + ']: ' + JSON.stringify(list.wordTrads[i]))
                console.log('wordTrads: ' + JSON.stringify(list.wordTrads))
                console.log('okBefore: ' + ok)
                ok++
                console.log('okAfter: ' + ok)
                if (ok >= payload.wordTrads.length) {
                  Vue.http.get('https://vocsapi.lebarillier.fr/rest/users/' + state.user.id + '/lists/' + list.id)
                    .then(response2 => {
                      return response2.json()
                    })
                    .then(data2 => {
                      list = data2
                      state.loading = false
                      this.dispatch('setSnackbarIsEnabled', true)
                      this.dispatch('setSnackbarMessage', 'Votre liste a bien été créée')
                      commit('createList', list)
                    })
                }
              })
              .catch(
                error => {
                  console.log(error)
                  this.dispatch('setSnackbarIsEnabled', true)
                  this.dispatch('setSnackbarMessage', 'Votre liste n\'a pas été créée')
                  state.loading = false
                }
              )
          }
        })
        .catch(
          error => {
            console.log(error)
            this.dispatch('setSnackbarIsEnabled', true)
            this.dispatch('setSnackbarMessage', 'Votre liste n\'a pas été créée')
            state.loading = false
          }
        )
    },
    createClass ({commit, state}, payload) {
      state.loading = true
      var theClass = {
        name: payload.name,
        school: null,
        users: [],
        lists: []
      }
      Vue.http.post('https://vocsapi.lebarillier.fr/rest/users/' + state.user.id + '/classes', theClass)
        .then(response => {
          theClass.id = response.body.id
          theClass.users = payload.users
          console.log('theClass: ' + JSON.stringify(theClass))
          var indexer = []
          var counter = 0
          /* var toSendOff = {} */
          var invitationToSendOff = null
          if(payload.users.length > 0){
            for (var i = 0; i < payload.users.length; i++) {
              indexer[i] = i
              invitationToSendOff = {
                userSend: state.user.id,
                userReceive: theClass.users[i].id,
                classe: theClass.id
              }

              Vue.http.post('https://vocsapi.lebarillier.fr/rest/demands', invitationToSendOff)
                .then(response => {
                  theClass.users = [
                    {
                      id: state.user.id,
                      firstname: state.user.firstname,
                      surname: state.user.surname,
                      roles: 'PROFESSOR'
                    }
                  ]
                  console.log(response)
                  counter++
                  if (counter >= i) {
                    this.dispatch('setSnackbarIsEnabled', true)
                    this.dispatch('setSnackbarMessage', 'Votre classe a bien été créée')
                    state.loading = false
                    commit('createClass', theClass)
                  }
                })
                .catch(
                  error => {
                    console.log(error)
                    this.dispatch('setSnackbarIsEnabled', true)
                    this.dispatch('setSnackbarMessage', 'Votre classe n\'a pas été créée')
                    state.loading = false
                  }
                )
            }
          } else {
            theClass.users = [
              {
                id: state.user.id,
                firstname: state.user.firstname,
                surname: state.user.surname,
                roles: 'PROFESSOR'
              }
            ]
            commit('createClass', theClass)
            this.dispatch('setSnackbarIsEnabled', true)
            this.dispatch('setSnackbarMessage', 'Votre classe a bien été créée')
            state.loading = false
          }
        })
        .catch(
          error => {
            console.log(error)
            this.dispatch('setSnackbarIsEnabled', true)
            this.dispatch('setSnackbarMessage', 'Votre classe n\'a pas été créée')
            state.loading = false
          }
        )
    },
    addStudents ({commit, state}, payload) {
      state.loading = true
      var counter = 0
      /* var toSendOff = {} */
      var invitationToSendOff = null
      var indexer = []
      for (var i = 0; i < payload.invitedStudents.length; i++) {
        indexer[i] = i
        invitationToSendOff = {
          userSend: state.user.id,
          userReceive: payload.invitedStudents[i].id,
          classe: payload.selectedClass.id
        }
        Vue.http.post('https://vocsapi.lebarillier.fr/rest/demands', invitationToSendOff)
          .then(response => {
            console.log(response.body)
            counter++
            commit('addStudents', response.body)
            if (counter >= i) {
              this.dispatch('setSnackbarIsEnabled', true)
              this.dispatch('setSnackbarMessage', 'Votre demande a bien été envoyée')
              state.loading = false
              console.log(state.myDemands)
            }
          })
          .catch(
            error => {
              console.log(error)
              this.dispatch('setSnackbarIsEnabled', true)
              this.dispatch('setSnackbarMessage', 'Votre demande n\'a pas été envoyée')
              state.loading = false
            }
          )
      }
    },
    addTeachers ({commit, state}, payload) {
      state.loading = true
      var counter = 0
      /* var toSendOff = {} */
      var invitationToSendOff = null
      var indexer = []
      for (var i = 0; i < payload.invitedTeachers.length; i++) {
        indexer[i] = i
        invitationToSendOff = {
          userSend: state.user.id,
          userReceive: payload.invitedTeachers[i].id,
          list: payload.selectedListToShare
        }
        Vue.http.post('https://vocsapi.lebarillier.fr/rest/demands', invitationToSendOff)
          .then(response => {
            console.log(response.body)
            counter++
            commit('addTeachers', response.body)
            if (counter >= i) {
              this.dispatch('setSnackbarIsEnabled', true)
              this.dispatch('setSnackbarMessage', 'Votre liste a bien été envoyée')
              state.loading = false
              console.log(state.myDemands)
            }
          })
          .catch(
            error => {
              console.log(error)
              this.dispatch('setSnackbarIsEnabled', true)
              this.dispatch('setSnackbarMessage', 'Votre liste n\'a pas été envoyée')
              state.loading = false
            }
          )
      }
    },
    removeList ({commit, state}, payload) {
      state.loading = true
      Vue.http.delete('https://vocsapi.lebarillier.fr/rest/lists/' + payload)
        .then(
          commit('removeList', payload),
          this.dispatch('setSnackbarIsEnabled', true),
          this.dispatch('setSnackbarMessage', 'Votre liste a bien été supprimée'),
          state.loading = false
        )
    },
    removeClassList ({commit}, payload) {
      commit('removeClassList', payload)
    },
    logout ({commit}) {
      commit('logout')
    },
    testPasswordConfirm({commit,state}, payload) {
      state.loading = true
      state.isConfirmingPassword = true;
      this.dispatch('signUserIn',payload)
    },
    signUserIn ({commit, state}, payload) {
      state.loading = true
      var theUser = {}
      Vue.http.post('https://vocsapi.lebarillier.fr/rest/users/authentification', payload)
        .then(user => {
          theUser = {
            id: user.body.id,
            isLoggedIn: true,
            firstname: user.body.firstname,
            surname: user.body.surname,
            email: user.body.email,
            personalLists: user.body.lists
          }
          Vue.http.get('https://vocsapi.lebarillier.fr/rest/users/' + theUser.id)
            .then(response2 => {
              return response2.json()
            })
            .then(data => {
              theUser.roles = data.roles
              Vue.http.get('https://vocsapi.lebarillier.fr/rest/users/' + theUser.id + '/lists')
                .then(response2 => {
                  return response2.json()
                })
                .then(data2 => {
                  theUser.personalLists = data2
                  Vue.http.get('https://vocsapi.lebarillier.fr/rest/users/' + theUser.id + '/classes')
                    .then(response2 => {
                      return response2.json()
                    })
                    .then(data3 => {
                      theUser.classes = data3
                      Vue.http.get('https://vocsapi.lebarillier.fr/rest/users')
                        .then(response3 => {
                          return response3.json()
                        })
                        .then(data4 => {
                          state.users = data4
                        })
                      Vue.http.get('https://vocsapi.lebarillier.fr/rest/demands/users/' + theUser.id)
                        .then(response4 => {
                          console.log(JSON.stringify(response4))
                          return response4.json()
                        })
                        .then(data5 => {
                          console.log(JSON.stringify(data5))
                          state.myDemands = data5
                          console.log('mes demandes: ' + JSON.stringify(state.myDemands))
                          console.log('https://vocsapi.lebarillier.fr/rest/demands/users/' + state.user.id)
                        })
                      if (JSON.stringify(theUser.roles) === '["ROLE_USER"]') {
                        theUser.roles = 'USER'
                      } else if (JSON.stringify(theUser.roles) === '["ROLE_STUDENT"]') {
                        theUser.roles = 'STUDENT'
                      } else if (JSON.stringify(theUser.roles) === '["ROLE_PROFESSOR"]') {
                        theUser.roles = 'PROFESSOR'
                      } else {
                        console.log(theUser.roles)
                      }
                      if (state.isConfirmingPassword) {
                        state.loading = false
                        commit('signUserIn', theUser)
                      } else {
                        router.push('/home')
                        localStorage.setItem('userPassword',payload.password)
                        localStorage.setItem('userEmail',payload.email)
                        if(!localStorage.getItem('userEmail') || !localStorage.getItem('userPassword')) {
                          this.dispatch('setSnackbarIsEnabled', true)
                          this.dispatch('setSnackbarMessage', 'De retour!')
                        }
                        state.loading = false
                        commit('signUserIn', theUser)
                      }
                    })
                })
            })
        })
        .catch(
          error => {
            console.log(error)
            state.loading = false
            if (state.isConfirmingPassword) {
              this.dispatch('setSnackbarIsEnabled', true)
              this.dispatch('setSnackbarMessage', 'Mot de passe incorrect')
            }
            state.connectionErrorMessage = 'Indentifiants incorrectes'
          }
        )
    },
    signUserUp ({commit, state}, payload) {
      state.loading = true
      console.log(JSON.stringify(payload));
      const user = {
        firstname: payload.firstname,
        surname: payload.surname,
        email: payload.email,
        password: payload.password,
        roles: ['ROLE_' + payload.roles]
      }
      if (JSON.stringify(user.roles) === '["ROLE_USER"]') {
        user.roles = []
      }
      console.log(JSON.stringify(user))
      var theUser = {}
      Vue.http.post('https://vocsapi.lebarillier.fr/rest/users', user)
        .then(response => {
          theUser = {
            id: response.body.id,
            isLoggedIn: true,
            firstname: response.body.firstname,
            surname: response.body.surname,
            email: response.body.email,
            personalLists: response.body.lists,
            classes: payload.classes
          }
          Vue.http.get('https://vocsapi.lebarillier.fr/rest/users/' + theUser.id)
            .then(response2 => {
              return response2.json()
            })
            .then(data => {
              theUser.roles = data.roles
              Vue.http.get('https://vocsapi.lebarillier.fr/rest/users/' + theUser.id + '/lists')
                .then(response2 => {
                  return response2.json()
                })
                .then(data2 => {
                  theUser.personalLists = data2
                  Vue.http.get('https://vocsapi.lebarillier.fr/rest/users/' + theUser.id + '/classes')
                    .then(response2 => {
                      return response2.json()
                    })
                    .then(data3 => {
                      theUser.classes = data3
                      Vue.http.get('https://vocsapi.lebarillier.fr/rest/users')
                        .then(response3 => {
                          return response3.json()
                        })
                        .then(data4 => {
                          state.users = data4
                        })
                      Vue.http.get('https://vocsapi.lebarillier.fr/rest/demands/users/' + theUser.id)
                        .then(response4 => {
                          console.log(JSON.stringify(response4))
                          return response4.json()
                        })
                        .then(data5 => {
                          console.log(JSON.stringify(data5))
                          state.myDemands = data5
                          console.log(JSON.stringify(state.myDemands))
                          console.log('https://vocsapi.lebarillier.fr/rest/demands/users/' + state.user.id)
                        })
                      if (JSON.stringify(theUser.roles) === '["ROLE_USER"]') {
                        theUser.roles = 'USER'
                      } else if (JSON.stringify(theUser.roles) === '["ROLE_STUDENT"]') {
                        theUser.roles = 'STUDENT'
                      } else if (JSON.stringify(theUser.roles) === '["ROLE_PROFESSOR"]') {
                        theUser.roles = 'PROFESSOR'
                      }
                      router.push('/home')
                      this.dispatch('setSnackbarIsEnabled', true)
                      this.dispatch('setSnackbarMessage', 'Bienvenu sur Vocs!')
                      localStorage.setItem('userPassword',payload.password)
                      localStorage.setItem('userEmail',payload.email)
                      localStorage.setItem('userVoicePreference','US English Male')
                      state.loading = false
                      commit('signUserUp', theUser)
                    })
                })
            })
        })
        .catch(
          error => {
            console.log(error)
            state.loading = false
            state.inscriptionErrorMessage = 'Votre adresse mail est déja lié à un compte, Voulez-vous vous connectez avec?'
          }
        )
    },
    signStudentUp ({commit, state}, payload) {
      state.loading = true
      const user = {
        firstname: payload.user.firstname,
        surname: payload.user.surname,
        email: payload.user.email,
        password: payload.user.password,
        roles: ['ROLE_' + payload.user.roles]
      }
      if (JSON.stringify(user.roles) === '["ROLE_USER"]') {
        user.roles = []
      }
      console.log(JSON.stringify(user))
      var theUser = {}
      Vue.http.post('https://vocsapi.lebarillier.fr/rest/users', user)
        .then(response => {
          theUser = {
            id: response.body.id,
            isLoggedIn: true,
            firstname: response.body.firstname,
            surname: response.body.surname,
            email: response.body.email,
            personalLists: response.body.lists,
            classes: payload.user.classes
          }
          Vue.http.get('https://vocsapi.lebarillier.fr/rest/users/' + theUser.id)
            .then(response2 => {
              return response2.json()
            })
            .then(data => {
              theUser.roles = data.roles
              Vue.http.get('https://vocsapi.lebarillier.fr/rest/users/' + theUser.id + '/lists')
                .then(response2 => {
                  return response2.json()
                })
                .then(data2 => {
                  theUser.personalLists = data2
                  Vue.http.get('https://vocsapi.lebarillier.fr/rest/users/' + theUser.id + '/classes')
                    .then(response2 => {
                      return response2.json()
                    })
                    .then(data3 => {
                      theUser.classes = data3
                      Vue.http.get('https://vocsapi.lebarillier.fr/rest/users')
                        .then(response3 => {
                          return response3.json()
                        })
                        .then(data4 => {
                          state.users = data4,
                          this.dispatch('setUserClass', payload.classe)
                        })
                      Vue.http.get('https://vocsapi.lebarillier.fr/rest/demands/users/' + theUser.id)
                        .then(response4 => {
                          console.log(JSON.stringify(response4))
                          return response4.json()
                        })
                        .then(data5 => {
                          console.log(JSON.stringify(data5))
                          state.myDemands = data5
                          console.log(JSON.stringify(state.myDemands))
                          console.log('https://vocsapi.lebarillier.fr/rest/demands/users/' + state.user.id)
                        })
                      if (JSON.stringify(theUser.roles) === '["ROLE_USER"]') {
                        theUser.roles = 'USER'
                      } else if (JSON.stringify(theUser.roles) === '["ROLE_STUDENT"]') {
                        theUser.roles = 'STUDENT'
                      } else if (JSON.stringify(theUser.roles) === '["ROLE_PROFESSOR"]') {
                        theUser.roles = 'PROFESSOR'
                      }
                      router.push('/home')
                      this.dispatch('setSnackbarIsEnabled', true)
                      this.dispatch('setSnackbarMessage', 'Bienvenu sur Vocs!')
                      localStorage.setItem('userPassword',payload.user.password)
                      localStorage.setItem('userEmail',payload.user.email)
                      localStorage.setItem('userVoicePreference','US English Male')
                      state.loading = false
                      commit('signUserUp', theUser)
                    })
                })
            })
        })
        .catch(
          error => {
            console.log(error)
            state.loading = false
            state.inscriptionErrorMessage = 'Votre adresse mail est déja lié à un compte, Voulez-vous vous connectez avec?'
          }
        )
    },
    removeStudent ({commit, state}, payload) {
      state.loading = true
      if (state.user.roles === 'PROFESSOR') {
        Vue.http.delete('https://vocsapi.lebarillier.fr/rest/classes/' + state.selectedClass.id + '/users/' + payload)
          .then(response => {
            console.log(response)
            var toSendOff = {
              roles: []
            }
            Vue.http.patch('https://vocsapi.lebarillier.fr/rest/users/' + payload, toSendOff)
              .then(
                commit('removeStudent', payload),
                this.dispatch('setSnackbarIsEnabled', true),
                this.dispatch('setSnackbarMessage', 'L\'élève a bien été supprimé'),
                state.loading = false)
              .catch(
                error => {
                  console.log(error)
                  this.dispatch('setSnackbarIsEnabled', true)
                  this.dispatch('setSnackbarMessage', 'L\'élève n\'a pas été supprimé')
                  state.loading = false
                })
          })
          .catch(
            error => {
              console.log(error)
              this.dispatch('setSnackbarIsEnabled', true)
              this.dispatch('setSnackbarMessage', 'L\'élève n\'a pas été supprimé')
              state.loading = false
            }
          )
      } else if (state.user.roles === 'STUDENT') {
        Vue.http.delete('https://vocsapi.lebarillier.fr/rest/classes/' + state.user.classes[0].id + '/users/' + payload)
          .then(response => {
            console.log('deleted student from classe: ' + response)
            console.log('user id: ' + state.user.id)
            var userRole = {
              roles: []
            }
            Vue.http.patch('https://vocsapi.lebarillier.fr/rest/users/' + state.user.id, userRole)
              .then(response2 => {
                console.log(response2)
                this.dispatch('setSnackbarIsEnabled', true)
                this.dispatch('setSnackbarMessage', 'Vous avez quitté la classe')
                state.loading = false
                commit('removeStudent', payload)
              })
              .catch(
                error => {
                  console.log('the error: ' + error)
                  this.dispatch('setSnackbarIsEnabled', true)
                  this.dispatch('setSnackbarMessage', 'Vous n\'avez pas pu quitté la classe')
                  state.loading = false
                })
          })
          .catch(
            error => {
              console.log(error)
              this.dispatch('setSnackbarIsEnabled', true)
              this.dispatch('setSnackbarMessage', 'Vous n\'avez pas pu quitté la classe')
              state.loading = false
            })
      }
    },
    removeWord ({commit, state}, payload) {
      state.loading = true
      Vue.http.delete('https://vocsapi.lebarillier.fr/rest/lists/' + state.selectedList.id + '/wordTrad/' + payload)
        .then(
          commit('removeWord', payload),
          this.dispatch('setSnackbarIsEnabled', true),
          this.dispatch('setSnackbarMessage', 'Le mot a bien été supprimé'),
          state.loading = false
        )
        .catch(
          error => {
            console.log(error)
            this.dispatch('setSnackbarIsEnabled', true)
            this.dispatch('setSnackbarMessage', 'Le mot n\'a pas été supprimé')
            state.loading = false
          }
        )
    },
    removeClass ({commit, state}, payload) {
      state.loading = true
      var usersInclass = null
      var counter = 0
      var toSendOff = {
        roles: []
      }
      for (var i = 0; i < state.user.classes.length; i++) {
        if (state.user.classes[i].id === payload) {
          usersInclass = state.user.classes[i].users
        }
      }
      if(usersInclass.length > 1) {
        for (var y = 0; y < usersInclass.length; y++) {
          if (JSON.stringify(usersInclass[y].roles) !== '["ROLE_PROFESSOR"]') {
            Vue.http.patch('https://vocsapi.lebarillier.fr/rest/users/' + usersInclass[y].id, toSendOff)
              .then(data => {
                console.log(data)
                counter++
                if (counter >= usersInclass.length - 1) {
                  Vue.http.delete('https://vocsapi.lebarillier.fr/rest/classes/' + payload)
                    .then(
                      commit('removeClass', payload),
                      this.dispatch('setSnackbarIsEnabled', true),
                      this.dispatch('setSnackbarMessage', 'La classe a bien été supprimé'),
                      state.loading = false
                    )
                    .catch(
                      error => {
                        console.log(error)
                        this.dispatch('setSnackbarIsEnabled', true)
                        this.dispatch('setSnackbarMessage', 'La classe n\'a pas été supprimé')
                        state.loading = false
                      }
                    )
                }
              })
              .catch(
                error => {
                  console.log(error)
                  this.dispatch('setSnackbarIsEnabled', true)
                  this.dispatch('setSnackbarMessage', 'La classe n\'a pas été supprimé')
                  state.loading = false
                })
          }
        }
      } else {
        Vue.http.delete('https://vocsapi.lebarillier.fr/rest/classes/' + payload)
          .then(
            commit('removeClass', payload),
            this.dispatch('setSnackbarIsEnabled', true),
            this.dispatch('setSnackbarMessage', 'La classe a bien été supprimé'),
            state.loading = false
          )
          .catch(
            error => {
              console.log(error)
              this.dispatch('setSnackbarIsEnabled', true)
              this.dispatch('setSnackbarMessage', 'La classe n\'a pas été supprimé')
              state.loading = false
            }
          )
      }
    },
    selectList ({commit}, payload) {
      commit('selectList', payload)
    },
    selectWord ({commit}, payload) {
      commit('selectWord', payload)
    },
    selectListForGame ({commit}, payload) {
      commit('selectListForGame', payload)
    },
    setGameList ({commit}, payload) {
      commit('setGameList', payload)
    },
    selectClass ({commit}, payload) {
      commit('selectClass', payload)
    },
    setIsAPersonalList ({commit}, payload) {
      commit('setIsAPersonalList', payload)
    },
    addWords ({commit, state}, payload) {
      state.loading = true
      var ok = 0
      var wordsToSend = []
      var wordContent;
      var tradContent;
      for (var i = 0; i < payload.length; i++) {
        wordContent = payload[i].word.content.toLowerCase()
        wordContent= wordContent.charAt(0).toUpperCase() + wordContent.slice(1);
        tradContent =  payload[i].trad.content.toLowerCase()
        tradContent = tradContent.charAt(0).toUpperCase() + tradContent.slice(1);
        wordsToSend[i] = {
          word: {
            content: wordContent,
            language: 'EN'
          },
          trad: {
            content: tradContent,
            language: 'FR'
          }
        }
        Vue.http.post('https://vocsapi.lebarillier.fr/rest/users/' + state.user.id + '/lists/' + state.selectedList.id + '/wordTrad', wordsToSend[i])
          .then(user => {
            console.log('user: ' + user)
            console.log('okBefore: ' + ok)
            ok++
            console.log('okAfter: ' + ok)
            if (ok >= payload.length) {
              Vue.http.get('https://vocsapi.lebarillier.fr/rest/users/' + state.user.id + '/lists/' + state.selectedList.id)
                .then(response2 => {
                  return response2.json()
                })
                .then(data2 => {
                  var list = data2
                  state.loading = false
                  this.dispatch('setSnackbarIsEnabled', true)
                  this.dispatch('setSnackbarMessage', 'Le mot a bien été ajouté')
                  commit('addWords', list.wordTrads)
                })
            }
          })
          .catch(
            error => {
              state.loading = false
              this.dispatch('setSnackbarIsEnabled', true)
              this.dispatch('setSnackbarMessage', 'Le mot n\'a pas été ajouté')
              console.log(error)
            }
          )
      }
    },
    setRoles ({commit}, payload) {
      commit('setRoles', payload)
    },
    setFirstTimeStudent ({commit}, payload) {
      commit('setFirstTimeStudent', payload)
    },
    setUserClass ({commit, state}, payload) {
      state.loading = true
      var userReceiveId = null
      Vue.http.get('https://vocsapi.lebarillier.fr/rest/classes/' + payload.id)
        .then(response2 => {
          return response2.json()
        })
        .then(data2 => {
          for (var i = 0; i < data2.users.length; i++) {
            if (JSON.stringify(data2.users[i].roles) === '["ROLE_PROFESSOR"]') {
              userReceiveId = data2.users[i].id
            }
          }
          var invitationToSendOff = {
            userSend: state.user.id,
            userReceive: userReceiveId,
            classe: payload.id
          }
          Vue.http.post('https://vocsapi.lebarillier.fr/rest/demands', invitationToSendOff)
            .then(response => {
              state.loading = false
              this.dispatch('setSnackbarIsEnabled', true)
              this.dispatch('setSnackbarMessage', 'La demande a bien été envoyée')
              commit('setUserClass', response.body)
            })
            .catch(
              error => {
                console.log(error)
                this.dispatch('setSnackbarIsEnabled', true)
                this.dispatch('setSnackbarMessage', 'La demande n\'a pas été envoyée')
                state.loading = false
              }
            )
        })
    },
    resetSignInAndUpErrorMessages ({commit}) {
      commit('resetSignInAndUpErrorMessages')
    },
    setIsClickedClasses ({commit}, payload) {
      commit('setIsClickedClasses', payload)
    },
    addListToClasses ({commit, state}, payload) {
      var allListsOfAllTickedClasses = []
      var amountOfTickedClasses = 0
      var counter = 0
      var classesPatched = 0
      var patchToSendOff = {
        lists: []
      }
      for (var i = 0; i < state.user.classes.length; i++) {
        if (payload.tickedArray[i] === true) {
          amountOfTickedClasses++
          Vue.http.get('https://vocsapi.lebarillier.fr/rest/classes/' + state.user.classes[i].id)
            .then(response => {
              return response.json()
            })
            .then(data => {
              console.log('lists:' + JSON.stringify(data))
              if (JSON.stringify(data.lists) === '[]') {
                console.log('liste vide')
                allListsOfAllTickedClasses[counter] = data
              } else {
                console.log('liste pas vide')
                allListsOfAllTickedClasses[counter] = data
                console.log('i: ' + i)
                console.log('allListsOfAllClasses:' + JSON.stringify(allListsOfAllTickedClasses))
              }
              counter++
              if (counter >= amountOfTickedClasses) {
                console.log('done all lists of all classes')
                for (var y = 0; y < allListsOfAllTickedClasses.length; y++) {
                  for (var j = 0; j < allListsOfAllTickedClasses[y].lists.length; j++) {
                    patchToSendOff.lists[j] = allListsOfAllTickedClasses[y].lists[j].id
                  }
                  var listAllreadyInClass = false
                  for (var u = 0; u < patchToSendOff.lists.length; u++) {
                    if (patchToSendOff.lists[u] === payload.selectedList.id) {
                      console.log('list all ready in class')
                      listAllreadyInClass = true
                    }
                  }
                  if (!listAllreadyInClass) {
                    patchToSendOff.lists.push(payload.selectedList.id)
                  }
                  console.log('lists of class[' + y + ']: ' + JSON.stringify(patchToSendOff.lists))
                  console.log('Vue.http.patch(\'https://vocsapi.lebarillier.fr/rest/classes/' + allListsOfAllTickedClasses[y].id + ', ' + patchToSendOff.lists + ')')
                  /*                  for (var f = 0; f < patchToSendOff.lists.length; f++) {
                                      Vue.http.get('https://vocsapi.lebarillier.fr/rest/lists/' + patchToSendOff.lists[f])
                                        .then(response2 => {
                                          return response2.json()
                                        })
                                        .then(data2 => {
                                          var list = data2
                                          state.loading = false
                                          commit('addWords', list.wordTrads)
                                        })
                                    } */
                  Vue.http.patch('https://vocsapi.lebarillier.fr/rest/classes/' + allListsOfAllTickedClasses[y].id, patchToSendOff)
                    .then(response => {
                      classesPatched++
                      for (var t = 0; t < state.user.classes.length; t++) {
                        if (state.user.classes[t].id === response.body.id) {
                          state.user.classes[t] = response.body
                        }
                      }
                      if (classesPatched >= allListsOfAllTickedClasses.length) {
                        console.log('Patched All Classes')
                        this.dispatch('setSnackbarIsEnabled', true)
                        this.dispatch('setSnackbarMessage', 'La liste a bien été ajoutée à la classe')
                        commit('addListToClasses', payload)
                      }
                    })
                    .catch(
                      error => {
                        console.log(error)
                        this.dispatch('setSnackbarIsEnabled', true)
                        this.dispatch('setSnackbarMessage', 'La liste n\'a pas été ajoutée à la classe')
                        state.loading = false
                      })
                }
              }

              state.loading = false
            })
        }
      }
    },
    deleteDemand ({commit, state}, payload) {
      state.loading = true
      Vue.http.delete('https://vocsapi.lebarillier.fr/rest/demands/' + payload)
        .then(
          commit('deleteDemand', payload),
          state.loading = false
        )
        .catch(
          error => {
            console.log(error)
            state.loading = false
          }
        )
    },
    deleteDemand2 ({commit, state}, payload) {
      state.loading = true
      Vue.http.delete('https://vocsapi.lebarillier.fr/rest/demands/' + payload)
        .then(
          commit('deleteDemand2', payload),
          state.loading = false
        )
        .catch(
          error => {
            console.log(error)
            state.loading = false
          }
        )
    },
    getClasses ({commit, state}, payload) {
      Vue.http.get('https://vocsapi.lebarillier.fr/rest/classes/' + payload)
        .then(response => {
          console.log('classes:' + JSON.stringify(response))
          return response.json()
        })
        .then(data => {
          state.loading = false
          var dat = data
          commit('addUserToClass', dat)
        })
    },
    addUserToClass ({state}, payload) {
      state.loading = true
      var toSendOff = {
        classes: [payload.classId],
        roles: ['ROLE_STUDENT']
      }
      Vue.http.patch('https://vocsapi.lebarillier.fr/rest/users/' + payload.userId, toSendOff)
        .then(response => {
          console.log('https://vocsapi.lebarillier.fr/rest/users/' + payload.userId)
          console.log(response)
          if (state.user.roles === 'STUDENT' || state.user.roles === 'USER') {
            this.dispatch('getClasses', payload.classId)
          } else {
            Vue.http.get('https://vocsapi.lebarillier.fr/rest/users/' + payload.userId)
              .then(response => {
                return response.json()
              })
              .then(data => {
                if(state.user.classes !== null) {
                  for (var i = 0; i < state.user.classes.length; i++) {
                    if (state.user.classes[i].id === payload.classId) {
                      state.user.classes[i].users.push(data)
                      state.loading = false
                    }
                  }
                }
              })
          }
        })
        .catch(
          error => {
            console.log(error)
            state.loading = false
          })
    },
    addListToUser ({commit,state}, payload) {
      state.loading = true
      var listToAdd;
      var wordTradIds = [];
      Vue.http.get('https://vocsapi.lebarillier.fr/rest/lists/' + payload.listId)
        .then(response => {
          return response.json()
        })
        .then(data => {
          listToAdd = data;
          for(var c=0;c<data.wordTrads.length;c++) {
            wordTradIds.push(data.wordTrads[c].id)
          }
          var toSendOff = {
            name: data.name,
            wordTrads: wordTradIds
          }
          Vue.http.post('https://vocsapi.lebarillier.fr/rest/users/' + state.user.id + '/lists', toSendOff)
            .then(response => {
              commit('addListToUser', response.body)
              this.dispatch('setSnackbarIsEnabled', true)
              this.dispatch('setSnackbarMessage', 'Votre liste a été ajoutée')
              state.loading = false
            })
            .catch(
              error => {
                console.log(error)
                this.dispatch('setSnackbarIsEnabled', true)
                this.dispatch('setSnackbarMessage', 'Votre liste n\'a pas pu être ajoutée')
                state.loading = false
              }
            )
        })
    },
    getSchools ({commit, state}) {
      state.loading = true;
      Vue.http.get('https://vocsapi.lebarillier.fr/rest/schools')
        .then(response => {
          return response.json()
        })
        .then(data => {
          state.schools = data
          state.loading = false;
        })
    },
    getSchoolsAndClasses ({commit, state}) {
      state.loading = true;
      Vue.http.get('https://vocsapi.lebarillier.fr/rest/schools')
        .then(response => {
          return response.json()
        })
        .then(data => {
          state.schools = data
          Vue.http.get('https://vocsapi.lebarillier.fr/rest/classes')
            .then(response3 => {
              return response3.json()

            })
            .then(data4 => {
              state.allClasses = data4
              state.loading = false;
            })
        })
    },
    getAndSetListsClass ({commit}) {
      commit('getAndSetListsClass')
    },
    setSnackbarMessage ({commit}, payload) {
      commit('setSnackbarMessage', payload)
    },
    setSnackbarIsEnabled ({commit}, payload) {
      commit('setSnackbarIsEnabled', payload)
    },
    modifyProfil ({commit, state}, payload) {
      state.loading = true
      var toSendOff = {
        firstname: payload.firstname,
        surname: payload.surname,
        email: payload.email,
      }
      Vue.http.patch('https://vocsapi.lebarillier.fr/rest/users/' + state.user.id, toSendOff)
        .then(
          commit('modifyProfil', payload),
          this.dispatch('setSnackbarIsEnabled', true),
          this.dispatch('setSnackbarMessage', 'Votre profil a bien été modifié'),
          state.isConfirmingPassword = false,
          state.loading = false)
        .catch(
          error => {
            console.log(error)
            this.dispatch('setSnackbarIsEnabled', true)
            this.dispatch('setSnackbarMessage', 'Votre profil n\'a pas pu être modifié')
            state.isConfirmingPassword = false
            state.loading = false
          })
    },
    autoLoginIn ({commit}) {
      if (!localStorage.getItem('userEmail') || !localStorage.getItem('userPassword')) {
        return
      }
      var info = {
        email: localStorage.getItem('userEmail'),
        password: localStorage.getItem('userPassword')
      }
      this.dispatch('signUserIn', info)
    },

    sendSynonyme({state},payload) {
      state.loading = true
      var userReceiveId = null
      var wordContent;
      if(state.user.roles === 'STUDENT') {
        Vue.http.get('https://vocsapi.lebarillier.fr/rest/classes/' + state.user.classes[0].id)
          .then(response2 => {
            return response2.json()
          })
          .then(data2 => {
            for (var i = 0; i < data2.users.length; i++) {
              if (JSON.stringify(data2.users[i].roles) === '["ROLE_PROFESSOR"]') {
                userReceiveId = data2.users[i].id
              }
            }
            wordContent = payload.userAnswer.toLowerCase()
            wordContent= wordContent.charAt(0).toUpperCase() + wordContent.slice(1);
            var invitationToSendOff = {
              userSend: state.user.id,
              userReceive: userReceiveId,
              wordTrad: {
                word: {
                  content: wordContent,
                  language: 'EN',
                  trads: []
                },
                trad: {
                  content: payload.answerObject.trad.content,
                  language: 'FR',
                  trads: []
                }
              }
            }
            Vue.http.post('https://vocsapi.lebarillier.fr/rest/demands', invitationToSendOff)
              .then(response => {
                Vue.http.get('https://vocsapi.lebarillier.fr/rest/demands/users/' + state.user.id)
                  .then(response4 => {
                    return response4.json()
                  })
                  .then(data5 => {
                    state.myDemands = data5
                    state.loading = false
                    this.dispatch('setSnackbarIsEnabled', true)
                    this.dispatch('setSnackbarMessage', 'La demande a bien été envoyée')
                  })
              })
              .catch(
                error => {
                  console.log(error)
                  this.dispatch('setSnackbarIsEnabled', true)
                  this.dispatch('setSnackbarMessage', 'La demande n\'a pas été envoyée')
                  state.loading = false
                }
              )
          })
      }else {
        var invitationToSendOff = {
          userSend: state.user.id,
          userReceive: 48,
          wordTrad: {
            word: {
              content: payload.userAnswer.toLowerCase().charAt(0).toUpperCase(),
              language: 'EN',
              trads: []
            },
            trad: {
              content: payload.answerObject.trad.content,
              language: 'FR',
              trads: []
            }
          }
        }
        Vue.http.post('https://vocsapi.lebarillier.fr/rest/demands', invitationToSendOff)
          .then(response => {
            Vue.http.get('https://vocsapi.lebarillier.fr/rest/demands/users/' + state.user.id)
              .then(response4 => {
                return response4.json()
              })
              .then(data5 => {
                state.myDemands = data5
                state.loading = false
                this.dispatch('setSnackbarIsEnabled', true)
                this.dispatch('setSnackbarMessage', 'La demande a bien été envoyée')
              })
          })
          .catch(
            error => {
              console.log(error)
              this.dispatch('setSnackbarIsEnabled', true)
              this.dispatch('setSnackbarMessage', 'La demande n\'a pas été envoyée')
              state.loading = false
            }
          )
      }

    },
    addSynonyme({commit,state},payload) {
      var trads = [];
      if(payload.wordTrad.trad.trads.length>0) {
        for(var f = 0;f<payload.wordTrad.trad.trads.length;f++){
          trads.push(payload.wordTrad.trad.trads[f].id);
        }
      }
      trads.push(payload.wordTrad.word.id)
      var toSendOff = {
        content: payload.wordTrad.trad.content,
        language: 'FR',
        trads: trads
      }
      Vue.http.patch('https://vocsapi.lebarillier.fr/rest/words/' + payload.wordTrad.trad.id, toSendOff)
        .then(
          this.dispatch('setSnackbarIsEnabled', true),
          this.dispatch('setSnackbarMessage', 'Le Synonyme a bien été ajouté'),
          state.loading = false)
        .catch(
          error => {
            console.log(error)
            this.dispatch('setSnackbarIsEnabled', true)
            this.dispatch('setSnackbarMessage', 'Le Synonyme n\'a pas pu être ajouté')
            state.loading = false
          })
    }
  },















  /*GETTERS*/







  getters: {
    loadedLists (state) {
      return state.user.personalLists
    },
    loadedList (state) {
      return (listId) => {
        return state.user.personalLists.find((list) => {
          return list.id === listId
        })
      }
    },
    selectedWord (state) {
      return (wordId) => {
        return state.user.personalLists.find((word) => {
          return word.id === wordId
        })
      }
    },
    isLoggedIn (state) {
      return state.user.isLoggedIn
    },
    getSelectedList (state) {
      return state.selectedList
    },
    getSelectedWord (state) {
      return state.selectedWord
    },
    getSelectedListForGame (state) {
      return state.selectedListForGame
    },
    gameList (state) {
      return state.gameList
    },
    selectedClass (state) {
      return state.selectedClass
    },
    isAPersonalList (state) {
      return state.isAPersonalList
    },
    roles (state) {
      return state.user.roles
    },
    user (state) {
      return state.user
    },
    users (state) {
      return state.users
    },
    teachers (state) {
      var teachers = [];
      for (var i = 0; i < state.users.length; i++) {
        if (JSON.stringify(state.users[i].roles) === '["ROLE_PROFESSOR"]') {
          teachers.push(state.users[i]);
        }
      }
      return teachers;
    },
    classes (state) {
      return state.user.classes
    },
    allClasses (state) {
      return state.allClasses
    },
    firstTimeStudent (state) {
      return state.firstTimeStudent
    },
    connectionErrorMessage (state) {
      return state.connectionErrorMessage
    },
    inscriptionErrorMessage (state) {
      return state.inscriptionErrorMessage
    },
    basicList (state) {
      return state.basicList
    },
    loading (state) {
      return state.loading
    },
    myDemands (state) {
      return state.myDemands
    },
    isClickedClasses (state) {
      return state.isClickedClasses
    },
    theTeacherInTheClass (state) {
      for (var i = 0; i < state.user.classes[0].users.length; i++) {
        if (JSON.stringify(state.user.classes[0].users[i].roles) === '["ROLE_PROFESSOR"]') {
          return state.user.classes[0].users[i]
        }
      }
    },
    schools (state) {
      return state.schools
    },
    snackbarMessage (state) {
      return state.snackbarMessage
    },
    snackbarIsEnabled (state) {
      return state.snackbarIsEnabled
    },
    editProfil (state) {
      return state.editProfil
    },
    getIsPlayingGame (state) {
      return state.isPlayingGame
    }
  }
})

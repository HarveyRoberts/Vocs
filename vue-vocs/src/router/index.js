import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home/Home.vue'
import Settings from '@/components/Settings/Settings.vue'
import Listes from '@/components/Listes/Listes.vue'
import List from '@/components/Listes/List.vue'
import Class from '@/components/Classe/Class.vue'
import JoinClass from '@/components/Classe/JoinClass.vue'
import Classes from '@/components/Classe/Classes.vue'
import Profil from '@/components/Profile/Profile.vue'
import Statistics from '@/components/Statistiques/Statistics.vue'
import Games from '@/components/Jeux/Games.vue'
import Classic from '@/components/Jeux/Classic.vue'
import QCM from '@/components/Jeux/QCM.vue'
import Matching from '@/components/Jeux/Matching.vue'
import Homepage from '@/components/Homepage/Homepage.vue'
import Connexion from '@/components/Homepage/Connexion.vue'
import Inscription from '@/components/Homepage/Inscription.vue'
import APropos from '@/components/Homepage/APropos.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/homepage',
      name: 'Homepage',
      component: Homepage
    },
    {
      path: '/connection',
      name: 'Connection',
      component: Connexion
    },
    {
      path: '/inscription',
      name: 'Insciption',
      component: Inscription
    },
    {
      path: '/about',
      name: 'APropos',
      component: APropos
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings
    },
    {
      path: '/lists',
      name: 'Listes',
      component: Listes
    },
    {
      path: '/games',
      name: 'Games',
      component: Games
    },
    {
      path: '/games/classic',
      name: 'Classic',
      component: Classic
    },
    {
      path: '/games/QCM',
      name: 'QCM',
      component: QCM
    },
    {
      path: '/games/matching',
      name: 'Matching',
      component: Matching
    },
    {
      path: '/lists/:id',
      name: 'List',
      props: true,
      component: List
    },
    {
      path: '/class',
      name: 'Class',
      component: Class
    },
    {
      path: '/classes',
      name: 'Classes',
      component: Classes
    },
    {
      path: '/joinclass',
      name: 'JoinClass',
      component: JoinClass
    },
    {
      path: '/profil',
      name: 'Profil',
      component: Profil
    },
    {
      path: '/statistics',
      name: 'Statistics',
      component: Statistics
    }
  ],
  mode: 'history'
})

import Vue from 'vue'
import Router from 'vue-router'
// import writelog from '@/components/writelog'
// import dayreport from '@/components/writechildren/dayreport.vue'
// import weekreport from '@/components/writechildren/weekreport.vue'
// import mouthreport from '@/components/writechildren/mouthreport.vue'
// import visitreport from '@/components/writechildren/visitreport.vue'

// import choosepeo from '@/components/writechildren/choosepeo'
// import choosegroup from '@/components/writechildren/choosegroup'
// import choosepeo2 from '@/components/writechildren/choosepeo2'
// import choosegroup2 from '@/components/writechildren/choosegroup2'
// import choosepeo3 from '@/components/writechildren/choosepeo3'
// import choosegroup3 from '@/components/writechildren/choosegroup3'
// import choosepeo4 from '@/components/writechildren/choosepeo4'
// import choosegroup4 from '@/components/writechildren/choosegroup4'

// import readlog from '@/components/readlog'
// import gjchoose from '@/components/readchildren/gjchoose'
// import readday from '@/components/readchildren/readday.vue'
// import readweek from '@/components/readchildren/readweek.vue'
// import readmouth from '@/components/readchildren/readmouth.vue'
// import readvisit from '@/components/readchildren/readvisit.vue'
const writelog = () => import('@/components/writelog')
const dayreport = () => import('@/components/writechildren/dayreport.vue')
const weekreport = () => import('@/components/writechildren/weekreport.vue')
const mouthreport = () => import('@/components/writechildren/mouthreport.vue')
const visitreport = () => import('@/components/writechildren/visitreport.vue')

const choosepeo = () => import('@/components/writechildren/choosepeo')
const choosegroup = () => import('@/components/writechildren/choosegroup')
const choosepeo2 = () => import('@/components/writechildren/choosepeo2')
const choosegroup2 = () => import('@/components/writechildren/choosegroup2')
const choosepeo3 = () => import('@/components/writechildren/choosepeo3')
const choosegroup3 = () => import('@/components/writechildren/choosegroup3')
const choosepeo4 = () => import('@/components/writechildren/choosepeo4')
const choosegroup4 = () => import('@/components/writechildren/choosegroup4')

const readlog = () => import('@/components/readlog')
const gjchoose = () => import('@/components/readchildren/gjchoose')
const readday = () => import('@/components/readchildren/readday.vue')
const readweek = () => import('@/components/readchildren/readweek.vue')
const readmouth = () => import('@/components/readchildren/readmouth.vue')
const readvisit = () => import('@/components/readchildren/readvisit.vue')

Vue.use(Router)

export default new Router({
  // mode: 'history',  
  routes: [
    {
      path: '/writelog',
      name: 'writelog',
      component: writelog,
    },
    {
      path:'/',
      redirect:'/writelog',
    },
    {
      path: '/dayreport',
      name: 'dayreport',
      component: dayreport,
    },{
      path: '/weekreport',
      name: 'weekreport',
      component: weekreport,
    },{
      path: '/mouthreport',
      name: 'mouthreport',
      component: mouthreport,
    },{
      path: '/visitreport',
      name: 'visitreport',
      component: visitreport,
    },{
      path: '/choosepeo',
      name: 'choosepeo',
      component: choosepeo,
    },{
      path: '/choosegroup',
      name: 'choosegroup',
      component: choosegroup,
    },{
      path: '/choosepeo2',
      name: 'choosepeo2',
      component: choosepeo2,
    },{
      path: '/choosegroup2',
      name: 'choosegroup2',
      component: choosegroup2,
    },{
      path: '/choosepeo3',
      name: 'choosepeo3',
      component: choosepeo3,
    },{
      path: '/choosegroup3',
      name: 'choosegroup3',
      component: choosegroup3,
    },{
      path: '/choosepeo4',
      name: 'choosepeo4',
      component: choosepeo4,
    },{
      path: '/choosegroup4',
      name: 'choosegroup4',
      component: choosegroup4,
    },{
      path: '/readlog',
      name: 'readlog',
      component:readlog,
    },{
      path: '/gjchoose',
      name: 'gjchoose',
      component: gjchoose,
    },{
      path: '/readday',
      name: 'readday',
      component: readday,
    },{
      path: '/readweek',
      name: 'readweek',
      component: readweek,
    },{
      path: '/readmouth',
      name: 'readmouth',
      component: readmouth,
    },{
      path: '/readvisit',
      name: 'readvisit',
      component: readvisit,
    }
  ],
  // 返回时保持之前页面滚动位置
  scrollBehavior (to, from, savedPosition) {
       if (savedPosition) {
          return savedPosition
        } else {
          return { x: 0, y: 0 }
        }
  }
})

import Vue from 'vue'
import VueRouter from 'vue-router'

// admin
import Login from '../components/admin/Login.vue'
import Register from '../components/admin/Register.vue'
import ChangePwd from '../components/admin/ChangePwd.vue'

// student
import Selection from '../components/student/Selection.vue'
import StudentInfo from '../components/student/StudentInfo.vue'
import PersonalPage from '../components/student/PersonalPage.vue'
import Aspiration from '../components/student/Aspiration.vue'
import Grade from '../components/student/Grade.vue'

// school
import SchoolInfo from '../components/school/SchoolInfo.vue'
import ScoreSearch from '../components/school/ScoreSearch.vue'
import ExamSearch from '../components/school/ExamineeSearch.vue'
import RecruitSet from '../components/school/RecruitSet.vue'
import InterviewEntry from '../components/school/InterviewEntry.vue'

//edu
import EduInfo from '../components/edu/EduInfo.vue'



Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },

  // admin
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/changePwd', component: ChangePwd },

  // student
  {
    path: '/stu_info', redirect: '/personal', component: StudentInfo, children: [
      { path: '/personal', component: PersonalPage },
      { path: '/selection', component: Selection },
      { path: '/grade', component: Grade },
      { path: '/aspiration', component: Aspiration },
    ]
  },

  // school
  {
    path: '/sch_info', redirect: '/recruitPlanSet', component: SchoolInfo, children: [
      { path: '/validScoreSearch', component: ScoreSearch },
      { path: '/examineeSearch', component: ExamSearch },
      { path: '/recruitPlanSet', component: RecruitSet },
      { path: '/interviewScoreEntry', component: InterviewEntry },
    ]
  },

  // edu
  { path: '/edu_info', redirect: '/', component: EduInfo }
]

const router = new VueRouter({
  routes
})

export default router
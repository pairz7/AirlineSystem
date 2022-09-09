import Vue from 'vue'
import Login from '@/views/Login'
import register from '@/views/register'
import Homepage from '@/views/Homepage'
import VueRouter from 'vue-router'
import flight from "@/views/flight";
import ticket from "@/views/ticket";
import flightBox from "@/components/flightBox";
import ticketResult from "@/views/ticketResult";
import bookSideCard from "@/components/bookSideCard";
import book from "@/views/book";
import submitBook from "@/views/submitBook";
import myOrder from "@/views/myOrder";
import admin from "@/views/admin";
import adminTicket from "@/views/admin/adminTicket";
import adminUser from "@/views/admin/adminUser";
import bookDetail from "@/views/bookDetail";
import userInfo from "@/views/userInfo";
import refund from "@/views/refund";
import adminDev from "../views/admin/adminDev";
import adminGlobal from "../views/admin/adminGlobal";
import notfound from "../views/notfound";


Vue.use(VueRouter)

const routes = [{
  path: '/login',
  name: 'login',
  component: Login
},
  {
    path: '/register',
    name: 'register',
    component: register
  },
  {
    path: '/',
    name: 'Homepage',
    component: Homepage
  },
  {
    path: '/flight',
    name:'flight',
    component: flight
  },
  {
    path:'/ticket',
    name: 'ticket',
    component: ticket
  },
  {
    path:'/flightResult',
    name:'flightBox',
    component: flightBox
  },
  {
    path:'/ticketResult',
    name:'ticketResult',
    component: ticketResult
  },
  {
    path: '/book',
    name:'book',
    component: book
  },
  {
    path: '/submitBook',
    name:'submitBook',
    component: submitBook
  },
  {
    path: '/OrderInfo',
    name: 'myOrder',
    component: myOrder
  },
  {
    path: '/admin',
    name: 'admin',
    component: admin
  },
  {
    path: '/adminTicket',
    name:'adminTicket',
    component: adminTicket
  },
  {
    path:'/adminUser',
    name:'adminUser',
    component: adminUser
  },
  {
    path:'/bookDetail',
    name:bookDetail,
    component: bookDetail
  },
  {
    path:'/userInfo',
    name:userInfo,
    component: userInfo
  },
  {
    path:'/refund',
    name:refund,
    component: refund
  },
  {
    path:'/adminDev',
    name:adminDev,
    component: adminDev
  },
  {
    path:'/adminGlobal',
    name:adminGlobal,
    component: adminGlobal
  },
  {
    path:'/404',
    name:notfound,
    component: notfound
  },
]




export default new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})


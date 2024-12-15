import { createApp } from 'vue'
import App from './App.vue'
import {createRouter, createWebHistory} from 'vue-router'
import AssetView from './views/AssetView/AssetView.vue'
import AssetAdjustment from './pages/AssetAdjustment/AssetAdjustment.vue'
import AccountList from './pages/accountList/AccountList.vue'
import TheContent from './layouts/TheContent/TheContent.vue'
import clickOutSide from '@/directive/clickOutSide'
import assetTransfer from './pages/assetTransfer/assetTransfer.vue'
import assetDepreciation from './pages/assetDepreciation/assetDepreciation.vue'
import assetDecrement from './pages/assetDecrement/assetDecrement.vue'
// import TableTree from './views/TableTree/TableTree.vue'
import AccountManage from './views/TableTree/AccountManage.vue'
import {save, insert, esc, up, down, move} from '@/directive/multipleKeydown'
import store from './js/store'


const routers = [
    {path: "/Asset", component: TheContent},
    {path: "/AccountList", component: AccountList},
    {path: "/IncrementAsset", component: AssetView},
    {path: "/AssetAdjustment", component: AssetAdjustment},
    {path: "/AssetTransfer", component: assetTransfer},
    {path: "/assetDepreciation", component: assetDepreciation},
    {path: "/assetDecrement", component: assetDecrement},
    {path: "/CheckAgain", component: AccountManage}
]

window.$ = window.jQuery = require('jquery');

const router = createRouter({
    history: createWebHistory(),
    routes: routers
})


createApp(App)
.use(router)
.use(store)
.directive('outside', clickOutSide)
.directive('esc', esc)
.directive('up', up)
.directive('down', down)
.directive('save', save)
.directive('insert', insert)
.directive('move', move)
.mount('#app')

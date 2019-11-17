import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import Mobiler from '@/components/mobiler'
import Abonnemang from '@/components/abonnemang'
import Guiden from '@/components/guiden'
import OmOss from '@/components/omoss'
import Test from '@/components/test'
import TelenorAbb from '@/components/rewrites/telenor-abb'
import ComviqAbbSenior from '@/components/rewrites/comviq-abb-senior'
import ComviqAbbStudent from '@/components/rewrites/comviq-abb-student'
import ComviqAbb from '@/components/rewrites/comviq-abb'
import felloAbb from '@/components/rewrites/fello-abb'
import halebopAbbStudent from '@/components/rewrites/halebop-abb-student'
import halebopAbb from '@/components/rewrites/halebop-abb'
import hallonAbb from '@/components/rewrites/hallon-abb'
import hallonAbbRabatt from '@/components/rewrites/hallon-abb-rabatt'
import Tele2Abb from '@/components/rewrites/tele2-abb'
import TeliaAbb from '@/components/rewrites/telia-abb'
import TreAbb from '@/components/rewrites/tre-abb'
import VimlaAbb from '@/components/rewrites/vimla-abb'
import doro8040Telia from '@/components/rewrites/telefoner/doro-8040/telia'
import galaxyNote8Comviq from '@/components/rewrites/telefoner/galaxy-note8/comviq'
import galaxyNote8Halebop from '@/components/rewrites/telefoner/galaxy-note8/halebop'
import galaxyNote8Telenor from '@/components/rewrites/telefoner/galaxy-note8/telenor'
import galaxyNote8Telia from '@/components/rewrites/telefoner/galaxy-note8/telia'
import galaxyNote8Tre from '@/components/rewrites/telefoner/galaxy-note8/tre'
import galaxyS7Telia from '@/components/rewrites/telefoner/galaxy-s7/telia'
import galaxyS7Tre from '@/components/rewrites/telefoner/galaxy-s7/tre'
import galaxyS8Comviq from '@/components/rewrites/telefoner/galaxy-s8/comviq'
import galaxyS8Halebop from '@/components/rewrites/telefoner/galaxy-s8/halebop'
import galaxyS8Tele2 from '@/components/rewrites/telefoner/galaxy-s8/tele2'
import galaxyS8Telenor from '@/components/rewrites/telefoner/galaxy-s8/telenor'
import galaxyS8Telia from '@/components/rewrites/telefoner/galaxy-s8/telia'
import galaxyS8Tre from '@/components/rewrites/telefoner/galaxy-s8/Tre'
import galaxyS8PlusComviq from '@/components/rewrites/telefoner/galaxy-s8+/comviq'
import galaxyS8PlusHalebop from '@/components/rewrites/telefoner/galaxy-s8+/halebop'
import galaxyS8PlusTele2 from '@/components/rewrites/telefoner/galaxy-s8+/tele2'
import galaxyS8PlusTelia from '@/components/rewrites/telefoner/galaxy-s8+/telia'
import galaxyS8PlusTre from '@/components/rewrites/telefoner/galaxy-s8+/tre'
import galaxyS9Comviq from '@/components/rewrites/telefoner/galaxy-s9/comviq'
import galaxyS9Halebop from '@/components/rewrites/telefoner/galaxy-s9/halebop'
import galaxyS9Hallon from '@/components/rewrites/telefoner/galaxy-s9/hallon'
import galaxyS9Tele2 from '@/components/rewrites/telefoner/galaxy-s9/tele2'
import galaxyS9Telenor from '@/components/rewrites/telefoner/galaxy-s9/telenor'
import galaxyS9Telia from '@/components/rewrites/telefoner/galaxy-s9/telia'
import galaxyS9Tre from '@/components/rewrites/telefoner/galaxy-s9/tre'
import galaxyS9PlusComviq from '@/components/rewrites/telefoner/galaxy-s9+/comviq'
import galaxyS9PlusHalebop from '@/components/rewrites/telefoner/galaxy-s9+/halebop'
import galaxyS9PlusHallon from '@/components/rewrites/telefoner/galaxy-s9+/hallon'
import galaxyS9PlusTele2 from '@/components/rewrites/telefoner/galaxy-s9+/tele2'
import galaxyS9PlusTelenor from '@/components/rewrites/telefoner/galaxy-s9+/telenor'
import galaxyS9PlusTelia from '@/components/rewrites/telefoner/galaxy-s9+/telia'
import galaxyS9PlusTre from '@/components/rewrites/telefoner/galaxy-s9+/tre'
import galaxyXCover4Telenor from '@/components/rewrites/telefoner/galaxy-xcover4/telenor'
import galaxyXCover4Telia from '@/components/rewrites/telefoner/galaxy-xcover4/telia'
import galaxyXCover4Tre from '@/components/rewrites/telefoner/galaxy-xcover4/tre'
import huaweiHonor9Tre from '@/components/rewrites/telefoner/huawei-honor-9/tre'
import huaweiMate10LiteHalebop from '@/components/rewrites/telefoner/huawei-mate-10-lite/halebop'
import huaweiMate10LiteTelia from '@/components/rewrites/telefoner/huawei-mate-10-lite/telia'
import huaweiMate10ProComviq from '@/components/rewrites/telefoner/huawei-mate-10-pro/comviq'
import huaweiMate10ProHalebop from '@/components/rewrites/telefoner/huawei-mate-10-pro/halebop'
import huaweiMate10ProTele2 from '@/components/rewrites/telefoner/huawei-mate-10-pro/tele2'
import huaweiMate10ProTelenor from '@/components/rewrites/telefoner/huawei-mate-10-pro/telenor'
import huaweiMate10ProTelia from '@/components/rewrites/telefoner/huawei-mate-10-pro/telia'
import huaweiMate10ProTre from '@/components/rewrites/telefoner/huawei-mate-10-pro/tre'
import huaweiP20LiteHalebop from '@/components/rewrites/telefoner/huawei-p20-lite/halebop'
import huaweiP20LiteTelenor from '@/components/rewrites/telefoner/huawei-p20-lite/telenor'
import huaweiP20LiteTelia from '@/components/rewrites/telefoner/huawei-p20-lite/telia'
import huaweiP20LiteTre from '@/components/rewrites/telefoner/huawei-p20-lite/tre'
import huaweiP20ProComviq from '@/components/rewrites/telefoner/huawei-p20-pro/comviq'
import huaweiP20ProHalebop from '@/components/rewrites/telefoner/huawei-p20-pro/halebop'
import huaweiP20ProTele2 from '@/components/rewrites/telefoner/huawei-p20-pro/tele2'
import huaweiP20ProTelenor from '@/components/rewrites/telefoner/huawei-p20-pro/telenor'
import huaweiP20ProTelia from '@/components/rewrites/telefoner/huawei-p20-pro/telia'
import huaweiP20ProTre from '@/components/rewrites/telefoner/huawei-p20-pro/tre'
import iphone7Comviq from '@/components/rewrites/telefoner/iphone-7/comviq'
import iphone7Halebop from '@/components/rewrites/telefoner/iphone-7/halebop'
import iphone7Tele2 from '@/components/rewrites/telefoner/iphone-7/tele2'
import iphone7Telenor from '@/components/rewrites/telefoner/iphone-7/telenor'
import iphone7Telia from '@/components/rewrites/telefoner/iphone-7/telia'
import iphone7Tre from '@/components/rewrites/telefoner/iphone-7/tre'
import iphone8Comviq from '@/components/rewrites/telefoner/iphone-8/comviq'
import iphone8Halebop from '@/components/rewrites/telefoner/iphone-8/halebop'
import iphone8Hallon from '@/components/rewrites/telefoner/iphone-8/hallon'
import iphone8Tele2 from '@/components/rewrites/telefoner/iphone-8/tele2'
import iphone8Telenor from '@/components/rewrites/telefoner/iphone-8/telenor'
import iphone8Telia from '@/components/rewrites/telefoner/iphone-8/telia'
import iphone8Tre from '@/components/rewrites/telefoner/iphone-8/tre'
import iphone8PlusComviq from '@/components/rewrites/telefoner/iphone-8+/comviq'
import iphone8PlusHalebop from '@/components/rewrites/telefoner/iphone-8+/halebop'
import iphone8PlusHallon from '@/components/rewrites/telefoner/iphone-8+/hallon'
import iphone8PlusTele2 from '@/components/rewrites/telefoner/iphone-8+/tele2'
import iphone8PlusTelenor from '@/components/rewrites/telefoner/iphone-8+/telenor'
import iphone8PlusTelia from '@/components/rewrites/telefoner/iphone-8+/telia'
import iphone8PlusTre from '@/components/rewrites/telefoner/iphone-8+/tre'
import iphoneSEHalebop from '@/components/rewrites/telefoner/iphone-se/halebop'
import iphoneSEHallon from '@/components/rewrites/telefoner/iphone-se/hallon'
import iphoneSETele2 from '@/components/rewrites/telefoner/iphone-se/tele2'
import iphoneSETelenor from '@/components/rewrites/telefoner/iphone-se/telenor'
import iphoneSETelia from '@/components/rewrites/telefoner/iphone-se/telia'
import iphoneSETre from '@/components/rewrites/telefoner/iphone-se/tre'
import iphoneXComviq from '@/components/rewrites/telefoner/iphone-x/comviq'
import iphoneXHalebop from '@/components/rewrites/telefoner/iphone-x/halebop'
import iphoneXHallon from '@/components/rewrites/telefoner/iphone-x/hallon'
import iphoneXTele2 from '@/components/rewrites/telefoner/iphone-x/tele2'
import iphoneXTelenor from '@/components/rewrites/telefoner/iphone-x/telenor'
import iphoneXTelia from '@/components/rewrites/telefoner/iphone-x/telia'
import iphoneXTre from '@/components/rewrites/telefoner/iphone-x/tre'
import motoG6PlusHalebop from '@/components/rewrites/telefoner/moto-g6+/halebop'
import motoG6PlusTelia from '@/components/rewrites/telefoner/moto-g6+/telia'
import oneplus5TTelia from '@/components/rewrites/telefoner/oneplus-5t/telia'
import oneplus6Halebop from '@/components/rewrites/telefoner/oneplus-6/halebop'
import oneplus6Telia from '@/components/rewrites/telefoner/oneplus-6/telia'
import phoneEasy530Telenor from '@/components/rewrites/telefoner/phoneeasy-530x/telenor'
import phoneEasy530Telia from '@/components/rewrites/telefoner/phoneeasy-530x/telia'
import xperiaL1Halebop from '@/components/rewrites/telefoner/xperia-l1/halebop'
import xperiaL1Telenor from '@/components/rewrites/telefoner/xperia-l1/telenor'
import xperiaL1Telia from '@/components/rewrites/telefoner/xperia-l1/telia'
import xperiaL1Tre from '@/components/rewrites/telefoner/xperia-l1/tre'
import xperiaXz2Comviq from '@/components/rewrites/telefoner/xperia-xz2/comviq'
import xperiaXz2Halebop from '@/components/rewrites/telefoner/xperia-xz2/halebop'
import xperiaXz2Tele2 from '@/components/rewrites/telefoner/xperia-xz2/tele2'
import xperiaXz2Telenor from '@/components/rewrites/telefoner/xperia-xz2/telenor'
import xperiaXz2Telia from '@/components/rewrites/telefoner/xperia-xz2/telia'
import xperiaXz2Tre from '@/components/rewrites/telefoner/xperia-xz2/tre'
import iphone8LargeHalebop from '@/components/rewrites/telefoner/iphone-8/halebopLarge'
import iphone8PlusLargeHalebop from '@/components/rewrites/telefoner/iphone-8+/halebopLarge'
import iphoneXLargeHalebop from '@/components/rewrites/telefoner/iphone-x/halebopLarge'
import oneplus6LargeHalebop from '@/components/rewrites/telefoner/oneplus-6/halebopLarge'
import myBeat from '@/components/rewrites/mybeat'
import PageNotFound from '@/components/pagenotfound'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '*', component: PageNotFound },
    { path: '/mobiler', name: 'mobiler', component: Mobiler },
    { path: '/abonnemang', component: Abonnemang },
    { path: '/mobilguiden', component: Guiden },
    { path: '/om', component: OmOss },
    { path: '/test', component: Test },
    { path: '/till/telenor-abonnemang', component: TelenorAbb },
    { path: '/till/comviq-abonnemang-senior', component: ComviqAbbSenior },
    { path: '/till/comviq-abonnemang-student', component: ComviqAbbStudent },
    { path: '/till/comviq-abonnemang', component: ComviqAbb },
    { path: '/till/fello-abonnemang', component: felloAbb },
    { path: '/till/halebop-abonnemang-student', component: halebopAbbStudent },
    { path: '/till/halebop-abonnemang', component: halebopAbb },
    { path: '/till/hallon-abonnemang', component: hallonAbb },
    { path: '/till/hallon-abonnemang-rabatt', component: hallonAbbRabatt },
    { path: '/till/tele2-abonnemang', component: Tele2Abb },
    { path: '/till/telia-abonnemang', component: TeliaAbb },
    { path: '/till/tre-abonnemang', component: TreAbb },
    { path: '/till/vimla-abonnemang', component: VimlaAbb },
    { path: '/till/telia/doro8040', component: doro8040Telia },
    { path: '/till/comviq/galaxy-note8', component: galaxyNote8Comviq },
    { path: '/till/halebop/galaxy-note8', component: galaxyNote8Halebop },
    { path: '/till/telenor/galaxy-note8', component: galaxyNote8Telenor },
    { path: '/till/telia/galaxy-note8', component: galaxyNote8Telia },
    { path: '/till/tre/galaxy-note8', component: galaxyNote8Tre },
    { path: '/till/telia/galaxy-s7', component: galaxyS7Telia },
    { path: '/till/tre/galaxy-s7', component: galaxyS7Tre },
    { path: '/till/comviq/galaxy-s8', component: galaxyS8Comviq },
    { path: '/till/halebop/galaxy-s8', component: galaxyS8Halebop },
    { path: '/till/tele2/galaxy-s8', component: galaxyS8Tele2 },
    { path: '/till/telenor/galaxy-s8', component: galaxyS8Telenor },
    { path: '/till/telia/galaxy-s8', component: galaxyS8Telia },
    { path: '/till/tre/galaxy-s8', component: galaxyS8Tre },
    { path: '/till/comviq/galaxy-s8+', component: galaxyS8PlusComviq },
    { path: '/till/halebop/galaxy-s8+', component: galaxyS8PlusHalebop },
    { path: '/till/tele2/galaxy-s8+', component: galaxyS8PlusTele2 },
    { path: '/till/telia/galaxy-s8+', component: galaxyS8PlusTelia },
    { path: '/till/tre/galaxy-s8+', component: galaxyS8PlusTre },
    { path: '/till/comviq/galaxy-s9', component: galaxyS9Comviq },
    { path: '/till/halebop/galaxy-s9', component: galaxyS9Halebop },
    { path: '/till/hallon/galaxy-s9', component: galaxyS9Hallon },
    { path: '/till/tele2/galaxy-s9', component: galaxyS9Tele2 },
    { path: '/till/telenor/galaxy-s9', component: galaxyS9Telenor },
    { path: '/till/telia/galaxy-s9', component: galaxyS9Telia },
    { path: '/till/tre/galaxy-s9', component: galaxyS9Tre },
    { path: '/till/comviq/galaxy-s9+', component: galaxyS9PlusComviq },
    { path: '/till/halebop/galaxy-s9+', component: galaxyS9PlusHalebop },
    { path: '/till/hallon/galaxy-s9+', component: galaxyS9PlusHallon },
    { path: '/till/tele2/galaxy-s9+', component: galaxyS9PlusTele2 },
    { path: '/till/telenor/galaxy-s9+', component: galaxyS9PlusTelenor },
    { path: '/till/telia/galaxy-s9+', component: galaxyS9PlusTelia },
    { path: '/till/tre/galaxy-s9+', component: galaxyS9PlusTre },
    { path: '/till/telenor/galaxy-xcover-4', component: galaxyXCover4Telenor },
    { path: '/till/telia/galaxy-xcover-4', component: galaxyXCover4Telia },
    { path: '/till/tre/galaxy-xcover-4', component: galaxyXCover4Tre },
    { path: '/till/tre/huawei-honor-9', component: huaweiHonor9Tre },
    { path: '/till/halebop/huawei-mate-10-lite', component: huaweiMate10LiteHalebop },
    { path: '/till/telia/huawei-mate-10-lite', component: huaweiMate10LiteTelia },
    { path: '/till/comviq/huawei-mate-10-pro', component: huaweiMate10ProComviq },
    { path: '/till/halebop/huawei-mate-10-pro', component: huaweiMate10ProHalebop },
    { path: '/till/tele2/huawei-mate-10-pro', component: huaweiMate10ProTele2 },
    { path: '/till/telenor/huawei-mate-10-pro', component: huaweiMate10ProTelenor },
    { path: '/till/telia/huawei-mate-10-pro', component: huaweiMate10ProTelia },
    { path: '/till/tre/huawei-mate-10-pro', component: huaweiMate10ProTre },
    { path: '/till/halebop/huawei-p20-lite', component: huaweiP20LiteHalebop },
    { path: '/till/telenor/huawei-p20-lite', component: huaweiP20LiteTelenor },
    { path: '/till/telia/huawei-p20-lite', component: huaweiP20LiteTelia },
    { path: '/till/tre/huawei-p20-lite', component: huaweiP20LiteTre },
    { path: '/till/comviq/huawei-p20-pro', component: huaweiP20ProComviq },
    { path: '/till/halebop/huawei-p20-pro', component: huaweiP20ProHalebop },
    { path: '/till/tele2/huawei-p20-pro', component: huaweiP20ProTele2 },
    { path: '/till/telenor/huawei-p20-pro', component: huaweiP20ProTelenor },
    { path: '/till/telia/huawei-p20-pro', component: huaweiP20ProTelia },
    { path: '/till/tre/huawei-p20-pro', component: huaweiP20ProTre },
    { path: '/till/comviq/iphone-7', component: iphone7Comviq },
    { path: '/till/halebop/iphone-7', component: iphone7Halebop },
    { path: '/till/tele2/iphone-7', component: iphone7Tele2 },
    { path: '/till/telenor/iphone-7', component: iphone7Telenor },
    { path: '/till/telia/iphone-7', component: iphone7Telia },
    { path: '/till/tre/iphone-7', component: iphone7Tre },
    { path: '/till/comviq/iphone-8', component: iphone8Comviq },
    { path: '/till/halebop/iphone-8', component: iphone8Halebop },
    { path: '/till/hallon/iphone-8', component: iphone8Hallon },
    { path: '/till/tele2/iphone-8', component: iphone8Tele2 },
    { path: '/till/telenor/iphone-8', component: iphone8Telenor },
    { path: '/till/telia/iphone-8', component: iphone8Telia },
    { path: '/till/tre/iphone-8', component: iphone8Tre },
    { path: '/till/comviq/iphone-8+', component: iphone8PlusComviq },
    { path: '/till/halebop/iphone-8+', component: iphone8PlusHalebop },
    { path: '/till/hallon/iphone-8+', component: iphone8PlusHallon },
    { path: '/till/tele2/iphone-8+', component: iphone8PlusTele2 },
    { path: '/till/telenor/iphone-8+', component: iphone8PlusTelenor },
    { path: '/till/telia/iphone-8+', component: iphone8PlusTelia },
    { path: '/till/tre/iphone-8+', component: iphone8PlusTre },
    { path: '/till/halebop/iphone-se', component: iphoneSEHalebop },
    { path: '/till/hallon/iphone-se', component: iphoneSEHallon },
    { path: '/till/tele2/iphone-se', component: iphoneSETele2 },
    { path: '/till/telenor/iphone-se', component: iphoneSETelenor },
    { path: '/till/telia/iphone-se', component: iphoneSETelia },
    { path: '/till/tre/iphone-se', component: iphoneSETre },
    { path: '/till/comviq/iphone-x', component: iphoneXComviq },
    { path: '/till/halebop/iphone-x', component: iphoneXHalebop },
    { path: '/till/hallon/iphone-x', component: iphoneXHallon },
    { path: '/till/tele2/iphone-x', component: iphoneXTele2 },
    { path: '/till/telenor/iphone-x', component: iphoneXTelenor },
    { path: '/till/telia/iphone-x', component: iphoneXTelia },
    { path: '/till/tre/iphone-x', component: iphoneXTre },
    { path: '/till/halebop/moto-g6+', component: motoG6PlusHalebop },
    { path: '/till/telia/moto-g6+', component: motoG6PlusTelia },
    { path: '/till/telia/oneplus-5t', component: oneplus5TTelia },
    { path: '/till/halebop/oneplus-6', component: oneplus6Halebop },
    { path: '/till/telia/oneplus-6', component: oneplus6Telia },
    { path: '/till/telenor/phoneeasy-530x', component: phoneEasy530Telenor },
    { path: '/till/telia/phoneeasy-530x', component: phoneEasy530Telia },
    { path: '/till/halebop/xperia-l1', component: xperiaL1Halebop },
    { path: '/till/telenor/xperia-l1', component: xperiaL1Telenor },
    { path: '/till/telia/xperia-l1', component: xperiaL1Telia },
    { path: '/till/tre/xperia-l1', component: xperiaL1Tre },
    { path: '/till/comviq/xperia-xz2', component: xperiaXz2Comviq },
    { path: '/till/halebop/xperia-xz2', component: xperiaXz2Halebop },
    { path: '/till/tele2/xperia-xz2', component: xperiaXz2Tele2 },
    { path: '/till/telenor/xperia-xz2', component: xperiaXz2Telenor },
    { path: '/till/telia/xperia-xz2', component: xperiaXz2Telia },
    { path: '/till/tre/xperia-xz2', component: xperiaXz2Tre },
    { path: '/till/halebop/iphone-8-256GB', component: iphone8LargeHalebop },
    { path: '/till/halebop/iphone-8-plus-256GB', component: iphone8PlusLargeHalebop },
    { path: '/till/halebop/iphone-x-256GB', component: iphoneXLargeHalebop },
    { path: '/till/halebop/oneplus-6-256GB', component: oneplus6LargeHalebop },
    { path: '/till/mybeat-abonnemang', component: myBeat }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

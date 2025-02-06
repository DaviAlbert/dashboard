import { setupWorker } from 'msw/browser'
import { env } from '@/env'
import { signInMock } from './SignInMock'
import { registerRestaurantMock } from './registerRestaurantmock'
import { getDayOrdersAmountMock } from './getDayOrdersAmount'
import { getMonthOrdersAmountMock } from './getMonthOrdersAmount'
import { getMonthRevenueMock } from './getMonthRevenue'
import { getDailyRevenueInPeriodMock } from './getDailyRevenueInPeriod'
import { getPopularProductsMock } from './getPopularProductsMock'
import { getManagedRestaurantMock } from './getManagedRestaurantMock'
import { updateProfileMock } from './updateProfileMock'
import { getProfileMock } from './getProfileMock'
import { getMonthCanceledOrdersAmountMock } from './getMonthCanceledOrdersAmounts'
import { getOrdersMock } from './getOrdersMock'
import { getOrderDetailsMock } from './getOrderDetailsMock'
import { dispatchOrderMock } from './dispatchOrder'
import { approveOrderMock } from './approveOrderMock'
import { cancelOrderMock } from './cancelOrderMock'
import { deliverOrderMock } from './deliverOrderMock'

export const worker = setupWorker(  
  signInMock,
  registerRestaurantMock,
  getDayOrdersAmountMock,
  getMonthOrdersAmountMock,
  getMonthCanceledOrdersAmountMock,
  getMonthRevenueMock,
  getDailyRevenueInPeriodMock,
  getPopularProductsMock,
  getProfileMock,
  getManagedRestaurantMock,
  updateProfileMock,
  getOrdersMock,
  getOrderDetailsMock,
  cancelOrderMock,
  approveOrderMock,
  deliverOrderMock,
  dispatchOrderMock,

)
export async function enableMSW() {
  if (env.MODE !== 'test') {
    return
  }
  await worker.start()
}
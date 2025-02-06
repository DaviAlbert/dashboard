import { http, HttpResponse } from 'msw'
import { getmonthOrdersAmountResponse } from '../getMonthOrderAmount'

export const getMonthOrdersAmountMock = http.get<
  never,never,getmonthOrdersAmountResponse>('/metrics/month-canceled-orders-amount', () => {
  return HttpResponse.json({
    amount: 5,
    diffFromLastMonth: 3,
  })
})
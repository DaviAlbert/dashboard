import { http, HttpResponse } from "msw";
import { getDayOrdersAmountResponse } from "../getDayOrdersAmount";

export const getDayOrdersAmountMock = http.get<never, never, getDayOrdersAmountResponse>('/metrics/day-orders-amount', async () => {
    return HttpResponse.json({
        amount: 10,
        diffFromYesterday: -5
    })
})
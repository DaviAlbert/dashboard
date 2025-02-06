import { http, HttpResponse } from 'msw'
import { RegisterRestaurantBody } from '../registerRestaurant'

export const registerRestaurantMock = http.post<never, RegisterRestaurantBody>('/restaurants', async ({request}) => {
    const {email} = await request.json()

    if(email == 'Pizza shop'){
        return new HttpResponse(null, {status: 201,})
    }

    return new HttpResponse(null, {status: 400})
})
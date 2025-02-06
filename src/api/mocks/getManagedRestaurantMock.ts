import { http, HttpResponse } from 'msw'
import { GetManagedRestaurantResponse } from '../getManagedRestaurant'

export const getManagedRestaurantMock = http.get<never,never,GetManagedRestaurantResponse>('/managed-restaurant', () => {
  return HttpResponse.json({
    id:'custom-restauramt-d',
    name: 'Pizza Shop',
    description: 'A restaurant',
    managerId: 'custom-user-d',
    createdAt: new Date(),
    updatedAt: null,
  })
})
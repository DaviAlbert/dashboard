import { http, HttpResponse } from 'msw'
import { GetProfileRespposne } from '../getProfile'
export const getProfileMock = http.get<never, never, GetProfileRespposne>(
  '/me',
  () => {
    return HttpResponse.json({
      id: 'custom-user-id',
      name: 'John Doe',
      email: 'johndoe@example.com',
      phone: '81237127123',
      role: 'manager',
      createdAt: new Date(),
      updatedAt: null,
    })
  },
)
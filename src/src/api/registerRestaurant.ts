import { api } from '@/lib/axios'
export interface RegisterRestaurantBody {
    restaurantName: string
    managerName: string
    email: string
    phone:string
}
export async function registerRestaurant({ restaurantName, managerName, email, phone }: RegisterRestaurantBody) {
  console.log(restaurantName,managerName, email,phone)
  await api.post('/restaurants', { restaurantName, managerName, email, phone })
}
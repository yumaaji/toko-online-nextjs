import instance from '@/lib/axios/instance';

const userServices = {
  getAllUsers: () => instance.get('/api/user'),
  updateUser: (id: string, data:any, token:string) => instance.put(`/api/user/${id}`, {data}, {
    headers: {
      'authorization': `Bearer ${token}`
    }
  }),
  deleteUser: (id: string, token: string) => instance.delete(`/api/user/${id}`, {
    headers: {
      'authorization': `Bearer ${token}`
    }
  })
}

export default userServices
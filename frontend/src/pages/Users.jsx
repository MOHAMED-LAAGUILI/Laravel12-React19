import useSWR from 'swr'
import { useState } from 'react'
import axiosClient from '@/constants/axios-client'
import Modal from '@/components/Core/Modals/Modal'
import CoreButton from '@/components/Core/Buttons/CoreButton'
import { Input } from '@/components/Core/Inputs/CoreInput'
import { LockIcon, MailOpen, UserIcon } from 'lucide-react'
import toast from 'react-hot-toast'

const fetcher = (url) => axiosClient.get(url).then(res => res.data)

export default function Users() {
  const [page, setPage] = useState(1)
  const [isModalOpen, setModalOpen] = useState(false)
  const [formData, setFormData] = useState({ username: '', email: '', password: '', password_confirmation: '' })
  const [formError, setFormError] = useState([])

  const { data, error, isLoading, mutate } = useSWR(`/users?page=${page}`, fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 60000,
  })

  const meta = data
    ? {
        currentPage: data.current_page,
        lastPage: data.last_page,
        nextPage: data.current_page < data.last_page ? data.current_page + 1 : null,
        prevPage: data.current_page > 1 ? data.current_page - 1 : null,
      }
    : null

  const users = data?.data || []

  const openModal = () => {
    setFormData({ username: '', email: '', password: '' })
    setModalOpen(true)
  }

  const closeModal = () => setModalOpen(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCreateUser = async () => {
    setFormError(null)
    try {
      await axiosClient.post('/register', formData)
      // Refresh user list after creation
      await mutate()
      setModalOpen(false)
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Registration failed"
      toast.error(errorMessage)

      // Handle validation errors
      if (err.response?.status === 422 && err.response?.data?.errors) {
        setFormError(err.response.data.errors); // errors is an object: { field: [messages] }
      } else {
        setFormError({ general: [errorMessage] });
      }
    }
  }

  if (error) {
    return <div className="text-red-600 p-4">Failed to load users.</div>
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Users</h2>
        <CoreButton
          onClick={openModal}
          variant='soft'
          color='primary'
          
        >
          Create User
        </CoreButton>
      </div>

      <div className="overflow-x-auto rounded-md border border-gray-200 dark:border-gray-700 shadow-sm">
        <table className="min-w-full text-sm text-left text-gray-700 dark:text-gray-300">
          <thead className="bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-b dark:border-gray-700">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Username</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Verified</th>
              <th className="px-4 py-3">Created At</th>
              <th className="px-4 py-3">Updated At</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={6} className="text-center px-4 py-3">
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900 dark:border-white"></div>
                    <span className="ml-2">Loading...</span>
                  </div>
                </td>
              </tr>
            ) : users.length > 0 ? (
              users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 transition"
                >
                  <td className="px-4 py-2">{user.id}</td>
                  <td className="px-4 py-2">{user.username}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                        user.email_verified_at
                          ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                          : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                      }`}
                    >
                      {user.email_verified_at ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td className="px-4 py-2">{new Date(user.created_at).toLocaleDateString()}</td>
                  <td className="px-4 py-2">{new Date(user.updated_at).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center px-4 py-3 text-gray-400 dark:text-gray-600">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {meta && (
        <div className="flex justify-center gap-4 text-sm">
          <button
            onClick={() => setPage(meta.prevPage)}
            disabled={!meta.prevPage}
            className="px-3 py-1 border rounded disabled:opacity-40 dark:border-gray-600"
          >
            Previous
          </button>
          <span className="self-center">
            Page {meta.currentPage} of {meta.lastPage}
          </span>
          <button
            onClick={() => setPage(meta.nextPage)}
            disabled={!meta.nextPage}
            className="px-3 py-1 border rounded disabled:opacity-40 dark:border-gray-600"
          >
            Next
          </button>
        </div>
      )}

      {/* Modal for Create User */}
      <Modal
      isOpen={isModalOpen}
      onClose={closeModal}
      onConfirm={handleCreateUser}
      title="Create New User"
      btnMessage="Create"
      variant="drawer"
      >
        
      
        
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">


            <div className="space-y-4">
              <div>
                <Input
                  leftIcon={<UserIcon size={15}/>}
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleInputChange}
                />
                {formError?.username && (
                  <div className="text-red-600 text-xs mt-1">{formError.username.join(' ')}</div>
                )}
              </div>
              <div>
                <Input
                  leftIcon={<MailOpen size={15}/>}
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                {formError?.email && (
                  <div className="text-red-600 text-xs mt-1">{formError.email.join(' ')}</div>
                )}
              </div>
              <div>
                <Input
                  leftIcon={<LockIcon size={15}/>}
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                {formError?.password && (
                  <div className="text-red-600 text-xs mt-1">{formError.password.join(' ')}</div>
                )}
              </div>
              <div>
                <Input
                  leftIcon={<LockIcon size={15}/>}
                  type="password"
                  name="password_confirmation"
                  placeholder="Confirm Password"
                  value={formData.password_confirmation}
                  onChange={handleInputChange}
                />
                {formError?.password_confirmation && (
                  <div className="text-red-600 text-xs mt-1">{formError.password_confirmation.join(' ')}</div>
                )}
              </div>
            </div>

       
          </div>
        </Modal>
        </div>
  )
}

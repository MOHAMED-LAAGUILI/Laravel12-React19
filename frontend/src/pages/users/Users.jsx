import { useState } from 'react';
import useApiSWR from '@/hooks/useApiSWR';
import UserActions from '@/components/UserActions';
import axiosClient from '@/hooks/axios-client';
import Modal from '@/components/Core/Modals/Modal';
import CoreButton from '@/components/Core/Buttons/CoreButton';
import { Input } from '@/components/Core/Inputs/CoreInput';
import {
  LockIcon, MailOpen, PlusIcon, UserIcon, UsersIcon
} from 'lucide-react';
import toast from 'react-hot-toast';
import BodyCard from '@/components/BodyCard';
import CoreBadge from '@/components/Core/Badges/CoreBadge';

export default function Users() {
  const [search, setSearch] = useState('');
  const [isItLoading, setIsItLoading] = useState(false);
  const [emailVerified, setEmailVerified] = useState('');
  const [page, setPage] = useState(1);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [formError, setFormError] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null); // NEW
  const params = new URLSearchParams();
  if (search) params.append('search', search);
  if (emailVerified !== '') params.append('email_verified', emailVerified);
  params.append('page', page);
  const swrKey = `/users?${params.toString()}`;
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: ''
  });


  const { data, error, isLoading, mutate } = useApiSWR(swrKey);
  const users = data?.data || [];

  const meta = data?.meta
    ? {
        currentPage: data.meta.current_page,
        lastPage: data.meta.last_page,
        nextPage: data.meta.current_page < data.meta.last_page ? data.meta.current_page + 1 : null,
        prevPage: data.meta.current_page > 1 ? data.meta.current_page - 1 : null
      }
    : null;

  const openModal = () => {
    setFormData({ username: '', email: '', password: '', password_confirmation: '' });
    setIsEdit(false);
    setEditingUserId(null);
    setModalOpen(true);
  };

  const openEditModal = (user) => {
    setFormData({
      username: user.username,
      email: user.email,
      password: '',
      password_confirmation: '',
    });
    setIsEdit(true);
    setEditingUserId(user.id);
    setModalOpen(true);
  };

  const openDeleteModal = (user) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setIsEdit(false);
    setEditingUserId(null);
    setFormError([]);
    setFormData({ username: '', email: '', password: '', password_confirmation: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateUser = async () => {
    setFormError(null);
    setIsItLoading(true);
    try {
      await axiosClient.post('/register', formData);
      await mutate();
      setModalOpen(false);
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Registration failed";
      toast.error(errorMessage);

      if (err.response?.status === 422 && err.response?.data?.errors) {
        setFormError(err.response.data.errors);
      } else {
        setFormError({ general: [errorMessage] });
      }
    }finally{
      setIsItLoading(false);
    }
  };

  const handleUpdateUser = async () => {
    setFormError(null);
    setIsItLoading(true);
    try {
      await axiosClient.put(`/user/${editingUserId}`, formData);
      await mutate();
      toast.success('User updated successfully');
      closeModal();
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Update failed';
      toast.error(errorMessage);
    }finally{
      setIsItLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    try {
      setIsItLoading(true);
      await axiosClient.delete(`/user/${userToDelete.id}`);
      await mutate();
      setIsDeleteModalOpen(false);
      toast.success("User deleted successfully");
    } catch (err) {
      toast.error(`Failed to delete user: ${err}`);
    }finally{
      setIsItLoading(false);
    }
  };

  if (error) {
    return <div className="text-red-600 p-4">Failed to load users.</div>;
  }

  const tableHeaders = [
    "ID", "Username", "Email", "Verified", "Created At", "Updated At", "Actions"
  ];

  return (
    <BodyCard title="Users" icon={<UsersIcon size={15} />} action={
      <CoreButton onClick={openModal} variant='soft' color='primary' icon={<PlusIcon size={15} />}>
        Create User
      </CoreButton>
    }>
      {/* Search & Filter */}
      <div className="flex flex-wrap gap-2 mb-4 items-center">
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1); }}
          className="input input-bordered px-2 py-1 rounded border border-gray-300 dark:bg-gray-900 dark:text-white"
        />
        <select
          value={emailVerified}
          onChange={e => { setEmailVerified(e.target.value); setPage(1); }}
          className="select px-2 py-1 rounded border border-gray-300 dark:bg-gray-900 dark:text-white"
        >
          <option value="">All</option>
          <option value="1">Verified</option>
          <option value="0">Unverified</option>
        </select>
      </div>

      <div className="overflow-x-auto rounded-md border border-gray-200 dark:border-gray-700 shadow-sm">
        <table className="min-w-full text-sm text-left text-gray-700 dark:text-gray-300">
          <thead className="bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-b dark:border-gray-700">
            <tr>
              {tableHeaders.map((header) => (
                <th key={header} className="px-4 py-3">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={7} className="text-center px-4 py-3">
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900 dark:border-white"></div>
                    <span className="ml-2">Loading...</span>
                  </div>
                </td>
              </tr>
            ) : users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 transition">
                  <td className="px-4 py-2">{user.id}</td>
                  <td className="px-4 py-2">{user.username}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">
                    {user.email_verified_at
                      ? <CoreBadge color="green" variant="outline">Yes</CoreBadge>
                      : <CoreBadge color="red" variant="outline">No</CoreBadge>}
                  </td>
                  <td className="px-4 py-2">{new Date(user.created_at).toLocaleDateString()}</td>
                  <td className="px-4 py-2">{new Date(user.updated_at).toLocaleDateString()}</td>
                  <td className="px-4 py-2">
                    <UserActions
                      user={user}
                      onEdit={openEditModal}
                      onDelete={() => openDeleteModal(user)} // Pass user
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center px-4 py-3 text-gray-400 dark:text-gray-600">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {meta && (
        <div className="flex justify-center gap-4 text-sm mt-4">
          <button
            onClick={() => setPage(meta.prevPage)}
            disabled={!meta.prevPage}
            className="px-3 py-1 border rounded disabled:opacity-40 dark:border-gray-600"
          >
            Previous
          </button>
          <span>Page {meta.currentPage} of {meta.lastPage}</span>
          <button
            onClick={() => setPage(meta.nextPage)}
            disabled={!meta.nextPage}
            className="px-3 py-1 border rounded disabled:opacity-40 dark:border-gray-600"
          >
            Next
          </button>
        </div>
      )}

      {/* Create / Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={isEdit ? handleUpdateUser : handleCreateUser}
        title={isEdit ? 'Edit User' : 'Create New User'}
        btnMessage={isEdit ? (isItLoading ? 'Updating...' : 'Update') : (isItLoading ? 'Creating...' : 'Create')}
        variant="modal"
        isLoading={isItLoading}
      >
        <div className="space-y-4">
          <Input leftIcon={<UserIcon size={15} />} type="text" name="username" placeholder="Username" value={formData.username} onChange={handleInputChange} />
          {formError?.username && <div className="text-red-600 text-xs mt-1">{formError.username.join(' ')}</div>}

          <Input leftIcon={<MailOpen size={15} />} type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} />
          {formError?.email && <div className="text-red-600 text-xs mt-1">{formError.email.join(' ')}</div>}

          <Input leftIcon={<LockIcon size={15} />} type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} />
          {formError?.password && <div className="text-red-600 text-xs mt-1">{formError.password.join(' ')}</div>}

          <Input leftIcon={<LockIcon size={15} />} type="password" name="password_confirmation" placeholder="Confirm Password" value={formData.password_confirmation} onChange={handleInputChange} />
          {formError?.password_confirmation && <div className="text-red-600 text-xs mt-1">{formError.password_confirmation.join(' ')}</div>}
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteUser}
        title={'Delete User'}
        btnMessage={isItLoading ? 'Deleting...' : 'Delete'}
        variant="modal"
        isLoading={isItLoading}
        message="Are you sure you want to delete this user?"
      />
      <br />
      {JSON.stringify(data,null,2)}
    </BodyCard>


  )
}


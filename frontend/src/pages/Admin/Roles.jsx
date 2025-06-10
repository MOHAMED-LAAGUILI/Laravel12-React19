/* eslint-disable no-unused-vars */
import { useState } from 'react';
import useApiSWR from '@/hooks/useApiSWR';
import Actions from '@/components/Actions';
import axiosClient from '@/hooks/axios-client';
import Modal from '@/components/Core/Modals/Modal';
import CoreButton from '@/components/Core/Buttons/CoreButton';
import { Input } from '@/components/Core/Inputs/CoreInput';
import {
  PlusIcon, UserIcon, UsersIcon
} from 'lucide-react';
import toast from 'react-hot-toast';
import BodyCard from '@/components/BodyCard';

export default function Permissions() {
  const [search, setSearch] = useState('');
  const [isItLoading, setIsItLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [formError, setFormError] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editingRoleId, setEditingRoleId] = useState(null);
  const [roleToDelete, setRoleToDelete] = useState(null); // NEW
  const params = new URLSearchParams();
  if (search) params.append('search', search);
  params.append('page', page);
  const swrKey = `/roles?${params.toString()}`;
  const [formData, setFormData] = useState({
    name: '',
    permission_ids: []

  });
  
  
  const { data: permissionsData, isLoading: permissionsLoading } = useApiSWR('/permissions');
  const { data, error, isLoading, mutate } = useApiSWR(swrKey);
  const roles = data?.data || [];
  const permissions = permissionsData?.data || [];

  const meta = data?.meta
    ? {
        currentPage: data.meta.current_page,
        lastPage: data.meta.last_page,
        nextPage: data.meta.current_page < data.meta.last_page ? data.meta.current_page + 1 : null,
        prevPage: data.meta.current_page > 1 ? data.meta.current_page - 1 : null
      }
    : null;

  const openModal = () => {
    setFormData({ name: '', permission_ids: [] });
    setIsEdit(false);
    setEditingRoleId(null);
    setModalOpen(true);
  };

  const openEditModal = (role) => {
    setFormData({
      name: role.name,
      permission_ids: role.permission_ids || [],
    });
    setIsEdit(true);
    setEditingRoleId(role.id);
    setModalOpen(true);
  };

  const openDeleteModal = (role) => {
    setRoleToDelete(role);
    setIsDeleteModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setIsEdit(false);
    setEditingRoleId(null);
    setFormError([]);
    setFormData({ name: '', permission_ids: [] });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateRole = async () => {
    setFormError(null);
    setIsItLoading(true);
    try {
      await axiosClient.post('/roles', formData);
      toast.success("Role created successfully");
      await mutate();
      setModalOpen(false);
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Role creation failed";
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

  const handleUpdateRole = async () => {
    setFormError(null);
    setIsItLoading(true);
    try {
      await axiosClient.put(`/roles/${editingRoleId}`, formData);
      await mutate();
      toast.success('Role updated successfully');
      closeModal();
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Update failed';
      toast.error(errorMessage);
    }finally{
      setIsItLoading(false);
    }
  };

  const handleDeleteRole = async () => {
    try {
      setIsItLoading(true);
      await axiosClient.delete(`/roles/${roleToDelete.id}`);
      await mutate();
      setIsDeleteModalOpen(false);
      toast.success("Role deleted successfully");
    } catch (err) {
      toast.error(`Failed to delete role: ${err}`);
    }finally{
      setIsItLoading(false);
    }
  };

  const handlePermissionAdd = (e) => {
    const value = e.target.value;
    if (value && !formData.permission_ids.includes(value)) {
      setFormData((prev) => ({
        ...prev,
        permission_ids: [...prev.permission_ids, value]
      }));
    }
  };
  
  const handlePermissionRemove = (idToRemove) => {
    setFormData((prev) => ({
      ...prev,
      permission_ids: prev.permission_ids.filter(id => id !== idToRemove)
    }));
  };
  

  if (error) {
    return <div className="text-red-600 p-4">Failed to load roles.</div>;
  }

  const tableHeaders = [
    "ID", "Name", "Created At", "Updated At", "Actions"
  ];

  return (
    <BodyCard title="Roles" icon={<UsersIcon size={15} />} action={
      <CoreButton onClick={openModal} variant='soft' color='primary' icon={<PlusIcon size={15} />}>
        Create Role
      </CoreButton>
    }>
      {/* Search & Filter */}
      <div className="flex flex-wrap gap-2 mb-4 items-center">
        <input
          type="text"
          placeholder="Search roles..."
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1); }}
          className="input input-bordered px-2 py-1 rounded border border-gray-300 dark:bg-gray-900 dark:text-white"
        />
    
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
            ) : roles.length > 0 ? (
              roles.map((role) => (
                <tr key={role.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 transition">
                  <td className="px-4 py-2">{role.id}</td>
                  <td className="px-4 py-2">{role.name}</td>
                 <td className="px-4 py-2">{new Date(role.created_at).toLocaleDateString()}</td>
                  <td className="px-4 py-2">{new Date(role.updated_at).toLocaleDateString()}</td>
                  <td className="px-4 py-2">
                    <Actions
                      data={role}
                      onEdit={openEditModal}
                      onDelete={() => openDeleteModal(role)} // Pass user
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center px-4 py-3 text-gray-400 dark:text-gray-600">
                  No permissions found.
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
        onConfirm={isEdit ? handleUpdateRole : handleCreateRole}
        title={isEdit ? 'Edit Role' : 'Create New Role'}
        btnMessage={isEdit ? (isItLoading ? 'Updating...' : 'Update') : (isItLoading ? 'Creating...' : 'Create')}
        variant="modal"
        isLoading={isItLoading}
      >
  <div className="space-y-4">
  <Input
    leftIcon={<UserIcon size={15} />}
    type="text"
    name="name"
    placeholder="Name"
    value={formData.name}
    onChange={handleInputChange}
  />
  {formError?.name && <div className="text-red-600 text-xs mt-1">{formError.name.join(' ')}</div>}

  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
    Permissions
  </label>

  {/* Selected Permission Tags */}
  <div className="flex flex-wrap gap-2 mb-2">
    {formData.permission_ids.map((id) => {
      const permission = permissions.find(p => p.id.toString() === id.toString());
      return (
        <span
          key={id}
          className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
        >
          {permission?.name}
          <button
            type="button"
            onClick={() => handlePermissionRemove(id)}
            className="ml-2 text-blue-500 hover:text-red-600 focus:outline-none"
          >
            ×
          </button>
        </span>
      );
    })}
  </div>

  {/* Permission Select Dropdown (only unselected) */}
  <select
    onChange={handlePermissionAdd}
    className="w-full p-2 border rounded dark:bg-gray-900 dark:text-white"
    value="" // always empty so user can keep selecting
  >
    <option value="" disabled>Select a permission...</option>
    {permissions
      .filter(p => !formData.permission_ids.includes(p.id.toString()))
      .map((permission) => (
        <option key={permission.id} value={permission.id}>
          {permission.name}
        </option>
      ))}
  </select>

  {formError?.permission_ids && (
    <div className="text-red-600 text-xs mt-1">
      {formError.permission_ids.join(' ')}
    </div>
  )}
</div>

      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteRole}
        title={'Delete Role'}
        btnMessage={isItLoading ? 'Deleting...' : 'Delete'}
        variant="modal"
        isLoading={isItLoading}
        message="Are you sure you want to delete this role?"
      />
      <br />
      {JSON.stringify(data,null,2)}
    </BodyCard>


  )
}


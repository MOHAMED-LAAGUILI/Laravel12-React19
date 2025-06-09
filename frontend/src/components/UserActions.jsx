import CoreButton from '@/components/Core/Buttons/CoreButton';
import { Pencil, Trash } from 'lucide-react';
export default function UserActions({ user, onEdit, onDelete }) {
  return (
    <div className="flex gap-2">
      <CoreButton
        size="sm"
        variant="soft"
        color="primary"
        onClick={() => onEdit(user)}
        title="Edit user"
      >
        <Pencil size={15}/>
      </CoreButton>
      <CoreButton
        size="sm"
        variant="soft"
        color="red"
        onClick={() => onDelete(user)}
        title="Delete user"
      >
        <Trash size={15}/>
      </CoreButton>
    </div>
  );
}

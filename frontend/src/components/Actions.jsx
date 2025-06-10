import CoreButton from '@/components/Core/Buttons/CoreButton';
import { Pencil, Trash } from 'lucide-react';
export default function Actions({ data, onEdit, onDelete }) {
  return (
    <div className="flex gap-2">
      <CoreButton
        size="sm"
        variant="soft"
        color="primary"
        onClick={() => onEdit(data)}
        title="Edit user"
      >
        <Pencil size={15}/>
      </CoreButton>
      <CoreButton
        size="sm"
        variant="soft"
        color="red"
        onClick={() => onDelete(data)}
        title="Delete user"
        className=""
        
      >
        <Trash size={15}/>
      </CoreButton>
    </div>
  );
}

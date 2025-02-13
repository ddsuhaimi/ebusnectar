
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { Booking } from "@/types";

interface StatusChangeDialogProps {
  booking: Booking | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  newStatus: "completed" | "pending" | "cancelled";
  onStatusChange: (status: "completed" | "pending" | "cancelled") => void;
  onConfirm: () => void;
}

export const StatusChangeDialog = ({
  booking,
  open,
  onOpenChange,
  newStatus,
  onStatusChange,
  onConfirm,
}: StatusChangeDialogProps) => {
  if (!booking) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Booking Status</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={newStatus}
              onChange={(e) => onStatusChange(e.target.value as "completed" | "pending" | "cancelled")}
              className="block w-full border border-gray-300 rounded-md shadow-sm p-2"
            >
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => onOpenChange(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border border-gray-300 rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 text-sm font-medium text-white bg-accent hover:bg-accent-hover rounded-md"
            >
              Update Status
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

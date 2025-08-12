import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface CameraCrashDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CameraCrashDialog: React.FC<CameraCrashDialogProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-6">
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Camera has stopped</h3>
          </div>
        </div>
        
        <div className="mb-6">
          <p className="text-gray-600 text-sm mb-4">
            The camera application has encountered an error and needs to close. This may be due to hardware being disabled.
          </p>
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs text-gray-500">
              <strong>Error:</strong> Camera hardware not available
            </p>
            <p className="text-xs text-gray-500 mt-1">
              <strong>Package:</strong> com.spiritos.camera
            </p>
          </div>
        </div>
        
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};
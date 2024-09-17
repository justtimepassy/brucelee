"use client";

import { Dragon } from 'lucide-react';

export default function Modal({ onClose, onSave, children }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center">
      <div className="bg-gray-900 p-8 rounded-lg max-w-md w-full border-2 border-yellow-500 shadow-lg shadow-yellow-500/50">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-yellow-500 text-2xl hover:text-yellow-400 transition-colors"
        >
          &times;
        </button>
        <div className="flex items-center mb-6">
          <Dragon className="text-yellow-500 mr-3" size={32} />
          <h2 className="text-2xl font-bold text-yellow-500">Enter Training Details</h2>
        </div>
        <div className="text-gray-300">
          {children}
        </div>
        <div className="flex justify-end mt-6">
          <button
            onClick={onSave}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-6 rounded-full transition-colors duration-300 flex items-center"
          >
            <span className="mr-2">Be Water</span>
            <Dragon size={20} />
          </button>
        </div>
        <div className="mt-4 text-center text-sm text-gray-500 italic">
          "Empty your mind, be formless, shapeless — like water." - Bruce Lee
        </div>
      </div>
    </div>
  );
}
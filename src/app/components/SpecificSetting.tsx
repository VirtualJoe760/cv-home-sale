"use client";

import React, { useState, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { validatePhoneNumber, validateEmail, validateAddress } from '@/utils/validationUtils';

interface SpecificSettingProps {
  title: string;
  field: string;
  value: string;
  userId?: string;
  buttonLabel: string;
}

const formatPhoneNumber = (phone: string) => {
  const cleaned = phone.replace(/\D/g, ''); // Remove all non-numeric characters
  const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
  if (!match) return phone;
  return !match[2] ? `(${match[1]}` : !match[3] ? `(${match[1]}) ${match[2]}` : `(${match[1]}) ${match[2]}-${match[3]}`;
};

const SpecificSetting: React.FC<SpecificSettingProps> = ({ title, field, value, userId }) => {
  const [inputValue, setInputValue] = useState(value);
  const [isEditing, setIsEditing] = useState(false);
  const [errorShown, setErrorShown] = useState(false); // Track if error toast is shown
  const editableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isEditing && editableRef.current) {
      editableRef.current.focus();
    }
  }, [isEditing]);

  const validateInput = (value: string) => {
    switch (field) {
      case 'phone':
        return validatePhoneNumber(value);
      case 'email':
        return validateEmail(value);
      case 'address':
        return validateAddress(value);
      default:
        return true;
    }
  };

  const handleSave = async () => {
    if (!validateInput(inputValue)) {
      if (!errorShown) {
        toast.error(`Invalid ${title.toLowerCase()} format`);
        setErrorShown(true); // Set errorShown to true after showing the error
      }
      setIsEditing(true);
      return;
    }

    try {
      const response = await fetch(`/api/user/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [field]: inputValue }),
      });
      
      if (response.ok) {
        toast.success("Update Successful");
        setErrorShown(false); // Reset errorShown on successful update
      } else {
        toast.error("Failed to update");
      }
    } catch (error) {
      console.error("Error updating data:", error);
      toast.error("Error occurred while updating");
    }
    setIsEditing(false);
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLDivElement>) => {
    const rawValue = event.currentTarget.textContent || '';
    const formattedValue = formatPhoneNumber(rawValue);
    setInputValue(formattedValue);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSave();
    }
  };

  return (
    <div className="flex items-center relative">
      {/* Static title and editable content */}
      <div className="flex items-center">
        <span className="text-2xl font-semibold mr-2">{title}:</span>
        <div
          contentEditable={isEditing}
          suppressContentEditableWarning={true}
          ref={editableRef}
          onInput={field === 'phone' ? handlePhoneChange : undefined}
          onKeyDown={handleKeyPress}
          onBlur={() => { handleSave(); setErrorShown(false); }} // Reset errorShown on blur
          className="text-2xl font-semibold outline-none"
          style={{
            cursor: isEditing ? 'text' : 'pointer',
            display: 'inline-block',
            minWidth: '100px',
            padding: isEditing ? '0 2px' : '0',
          }}
          onClick={() => setIsEditing(true)}
        >
          {isEditing ? '' : inputValue || "Click to add..."}
        </div>
      </div>

      {/* Edit/Save button with absolute positioning */}
      <button
        onClick={() => {
          if (isEditing) {
            handleSave();
          } else {
            setIsEditing(true);
          }
        }}
        className="button absolute right-0"
      >
        {isEditing ? `Save ${title}` : `Edit ${title}`}
      </button>
    </div>
  );
};

export default SpecificSetting;

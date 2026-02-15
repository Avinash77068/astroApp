import { useMemo } from 'react';
import { PersonalDetailFormData } from '../types';

export const useFormValidation = (step: number, formData: PersonalDetailFormData) => {
  const isStepValid = useMemo(() => {
    switch (step) {
      case 1:
        return !!formData.name && formData.name.trim().length > 0;
      case 2:
        return !!formData.dob && formData.dob.trim().length > 0;
      case 3:
        return !!formData.location && formData.location.trim().length > 0;
      case 4:
        return !!formData.gender && formData.gender.trim().length > 0;
      default:
        return false;
    }
  }, [step, formData]);

  return { isStepValid, isDisabled: !isStepValid };
};

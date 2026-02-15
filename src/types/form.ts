export interface PersonalDetailFormData {
  name?: string;
  dob?: string;
  location?: string;
  gender?: string;
}

export interface FormStepProps<T = PersonalDetailFormData> {
  formData: T;
  setFormData: (data: T) => void;
}

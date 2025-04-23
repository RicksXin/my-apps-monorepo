import create from "zustand";
import FormDataProps from "@/api/types/form";

interface FormData extends FormDataProps {
  email: string;
  code: string;
}
interface SignIn {
  formData: FormData,
  setFormData: (formData: Partial<FormData>) => void
}
const useSignInStore = create<SignIn>((set) => ({
  formData: {
    email: '',
    code: '',
  },
  setFormData: (formData: Partial<FormData>) => {
    set((state) => {
      return {
        formData: {
          ...state.formData,
          ...formData
        }
      }
    })
  }
}))
export default useSignInStore
export default interface FormDataProps {
  [k: string]: string | number | null | undefined | FormDataProps;
}

export type Rules = {
  key: string;
  message: string;
} & ({ type: 'required' } | { type: 'pattern'; regex: RegExp });

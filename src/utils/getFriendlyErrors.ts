const map: Record<string, string> = {
  'is invalid': '格式不正确'
};

const getFriendlyErrors = (error: string) => {
  return map[error] || error
};

export default getFriendlyErrors;
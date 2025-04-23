export const getFileExtByBookType = (bookType: string): string | undefined => {
  switch (bookType) {
    case 'xlsx':
      return 'xlsx'
    case 'xlsm':
      return 'xlsm'
    case 'xlsb':
      return 'xlsb'
    case 'biff8':
    case 'biff5':
    case 'biff2':
    case 'xlml':
      return 'xls'
    case 'ods':
      return 'ods'
    case 'fods':
      return 'fods'   
    case 'csv':
      return 'csv'    
    case 'tst':
      return 'tst'
    case 'sylk':
      return 'sylk'
    case 'html':
      return 'html'
    case 'dif':
      return 'dif'
    case 'dbf':
      return 'dbf'
    case 'rtf':
      return 'rtf'
    case 'prn':
      return 'prn'
    case 'eth':
      return 'eth'
    case 'xls':
      return 'xls'
    default:
      return undefined
  }
}
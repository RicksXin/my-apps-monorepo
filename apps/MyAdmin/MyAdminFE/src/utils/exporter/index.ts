import { BookType, utils, WorkBook, WorkSheet, write } from "xlsx";
import {saveAs} from 'file-saver';
import { getFileExtByBookType } from "./utils";

interface IHeader {
  [name: string]: string
}

interface IExcelData {
  content: any[];
  headers: IHeader[];
}

interface IXlsxData {
  content: any[];
  headers: string[];
}

interface IParams {
  pageIndex: number;
  pageSize: number;
  [key: string]: any
}

interface MulitySheetsIExcelData {
  sheetName?: string
  data: IExcelData
}

interface MulitySheetsIXlsxData {
  sheetName?: string
  data: IXlsxData
}

class Exporter {
  public filename: string;
  public sheetName: string;
  public bookType: BookType;

  constructor(
    { filename = '导出文件', sheetName = 'Sheet1', bookType = 'xlsx' }
    : {filename: string, sheetName: string, bookType: BookType}
    = {filename: '导出文件', sheetName: 'Sheet1', bookType: 'xlsx'}
  ) {
    this.filename = filename;
    this.sheetName = sheetName;
    this.bookType = bookType;
  }
  public static async getmultipleExportData(
    method: (params: IParams) => Promise<any> = async () => ({headers:[], content: []}),
    recordsCount: number = 0,
    params ={},
    limit: number = 1000
  ): Promise<IExcelData> {
    try {
      let exports: Promise<any>[] = []
      for (
        let pageIndex: number = 1, len: number = Math.ceil(recordsCount / limit);
        pageIndex <= len;
        pageIndex += 1
      ) {
        exports = [
          ...exports,
          method({
            ...params,
            pageIndex,
            pageSize: limit
          })
        ]
      }
      const data = await Promise.all(exports)
      const [{
        data: {headers}
      }] = data
      return {
        content: data.reduce((result, {data: {content}}) => [...result, ...content]),
        headers
      }
    } catch (err) {
      return Promise.reject(err)
    }
  }

  private collectExcelData({headers, content}: IExcelData): IXlsxData {
    try {
      const headerMap: any = headers.reduce((result: any, item: any) => ({
        ...result,
        ...item
      }), {})
      return {
        content: content.map((item: any) => Object.keys(item).reduce((temp: any, key: string) => {
          if (headerMap[key] !== undefined) {
            temp[headerMap[key]] = item[key]
          }
          return temp
        }, {})),
        headers: headers.map((item: IHeader): string => {
          const [key]: string[] = Object.keys(item)
          return item[key]
        })
      }
    }
    catch(err){
      throw err
    }
  }

  private getDataByArrayBuffer(source: any): ArrayBuffer {
    try {
      const buffer: ArrayBuffer = new ArrayBuffer(source.length)
      const view: Uint8Array = new Uint8Array(buffer)
      for (let index = 0; index !== source.length; index +=1) {
        view[index] = source.charCodeAt(index) & 0xff
      }
      return buffer
    } catch (err) {
      throw err
    }
  }

  private generateExcel(source: IXlsxData) {
    try {
      const {headers, content}:IXlsxData = source;
      const sheet: WorkSheet = utils.json_to_sheet(content, {header: headers})
      const book: WorkBook = utils.book_new()
      utils.book_append_sheet(book, sheet. this.sheetName)
      const excel: any = write(book, {
        type: 'binary',
        bookType: this.bookType
      })
      saveAs(
        new Blob([this.getDataByArrayBuffer(excel)], {
          type: 'application/octet-stream'
        }),
        `${this.filename}.${getFileExtByBookType(this.bookType)}`
      )
    } catch(err) {
      throw err
    }
  }

    private generateMultiSheetsExcel(sourceList: MulitySheetsIXlsxData[]) {
    try {
      // const {headers, content}:IXlsxData = source;
      // const sheet: WorkSheet = utils.json_to_sheet(content, {header: headers})
      const book: WorkBook = utils.book_new()
      sourceList.forEach(({sheetName, data}, index) => {
        const {headers, content}:IXlsxData = data;
        const sheet: WorkSheet = utils.json_to_sheet(content, {header: headers})
        utils.book_append_sheet(book, sheet, sheetName || `sheet${index + 1}`)
      })
      
      const excel: any = write(book, {
        type: 'binary',
        bookType: this.bookType
      })
      saveAs(
        new Blob([this.getDataByArrayBuffer(excel)], {
          type: 'application/octet-stream'
        }),
        `${this.filename}.${getFileExtByBookType(this.bookType)}`
      )
    } catch(err) {
      throw err
    }
  }

  public exportToExcel(data: IExcelData | MulitySheetsIExcelData[]): void {
    try {
      if (data instanceof Array) {
        let excelList: MulitySheetsIXlsxData[] = []
        data.forEach(d => {
          const { content = [] }: {content:any[]} = d.data
          if (content.length > 0) {
            const excel: IXlsxData = this.collectExcelData(d.data)
            excelList.push({
              sheetName: d.sheetName,
              data: excel
            })
            this.generateMultiSheetsExcel(excelList)
          }
        })
      } else {
        const { content = [] }: {content:any[]} = data
        if (content.length > 0) {
          const excel: IXlsxData = this.collectExcelData(data)
          this.generateExcel(excel)
        }
      }
    } catch (err) {
      throw err
    }
  }
}

export default Exporter
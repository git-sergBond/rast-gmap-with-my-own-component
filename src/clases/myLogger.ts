export default class myLogger{
    constructor(private name: string) {}
  
    debug(msg?: any, ...args: any[]) {
      console.debug(msg, ...args)
    }
  
    log(msg?: any, ...args: any[]) {
      console.log(msg, ...args)
    }
  }
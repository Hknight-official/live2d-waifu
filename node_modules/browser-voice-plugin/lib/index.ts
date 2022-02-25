import { CsSounder, IeSounder, Option } from './sounder'

declare global {
  interface Window {
    $voicePlugin: any;
  }
}

export default class VoicePlugin {
  private sounder:any = null
  private options:Option

  constructor (options?:Option) {
    this.options = options
    this.initPlugin()
  }

  private verifyBrowser ():boolean|string {
    const userAgent = navigator.userAgent
    const isIE = !!window.ActiveXObject || 'ActiveXObject' in window
    const isSafari = userAgent.indexOf('Safari') > -1 &&
              userAgent.indexOf('Chrome') == -1
    const isChrome = userAgent.indexOf('Chrome') > -1 &&
              userAgent.indexOf('Safari') > -1
    if (isIE) {
      return 'IE'
    } else if (isSafari || isChrome) {
      return 'CS'
    } else {
      return false
    } 
  }

  private initPlugin():void {
    if (window.$voicePlugin) {
      throw new Error('Only one VoicePlugin can be initialized on the current page!')
    }

    if (this.options && (this.options).toString() !== '[object Object]') {
      throw new Error('Not a valid parameter (should be Object)')
    }

    const browser = this.verifyBrowser()
    if (browser === 'IE') {
      this.sounder = new IeSounder(this.options)
    } else if (browser == 'CS') {
      this.sounder = new CsSounder(this.options)
    } else {
      throw new Error('The browser does not currently support VoicePlugin!')
    }
    this.sounder.init()
    window.$voicePlugin = this.sounder
  }

  public speak(message:string):void  {
    if (message && typeof message !== 'string') {
      throw new Error('The speak method only supports broadcast text!')
    }
    this.sounder.speak(message)
  }

  public pause():void  {
    this.sounder.pause()
  }

  public resume():void  {
    this.sounder.resume()
  }

  public stop():void  {
    this.sounder.stop()
  }
}

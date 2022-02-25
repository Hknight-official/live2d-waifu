export interface Option {
  volume: number,
  rate: number,
  lang?: string,
  pitch?: number
}

export class CsSounder {
  private sounder:any = null
  private options:Option

  constructor (options?:Option) {
    this.options = options
  }

  public init():void {
    const options = this.options
    this.sounder = new SpeechSynthesisUtterance()
    this.sounder.volume = options?.volume || 0.5
    this.sounder.rate = options?.rate || 1
    this.sounder.lang = options?.lang || 'zh-CN'
    this.sounder.pitch = options?.pitch || 1
  }

  public speak(message:string):void {
    this.sounder.text = message
    window.speechSynthesis.speak(this.sounder)
  }

  public pause():void {
    window.speechSynthesis.pause()
  }

  public resume():void {
    window.speechSynthesis.resume()
  }

  public stop():void {
    window.speechSynthesis.cancel()
  }
}

export class IeSounder {
  private sounder:any = null
  private options:Option

  constructor (options?:Option) {
    this.options = options
  }

  public init():void {
    const options = this.options
    this.sounder = new ActiveXObject('Sapi.SpVoice')
    this.sounder.volume = options?.volume ? options.volume * 100 : 50
    this.sounder.rate = options?.rate ? options.rate * 2 - 10 : -6
  }

  public speak(message:string):void {
    this.sounder.Speak(message, 3)
  }

  public pause():void {
    this.sounder.Pause()
  }

  public resume():void {
    this.sounder.Resume()
  }

  public stop():void {
    this.sounder.Speak('', 3)
  }
}


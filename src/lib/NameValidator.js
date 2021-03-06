import BaseValidator from './BaseValidator';

export default class extends BaseValidator {
  constructor(val) {
    super(val, '名前', 'name');
    this._checkFormat = this._checkFormat.bind(this);
  }
  validate() {
    return super._cannotEmpty()
      .then(this._checkFormat)
      .then((res) => {
        return { success: true };
      })
      .catch(err => {
        return err;
      });
  }
  _checkFormat() {
    /* 
      名前は必ず一つのスペースを含みます。
      名前には半角英数字のみが利用可能です。
    */
    const re = /^([a-zA-Z]+)\s(([a-zA-Z]+)$)/;
    const match = re.test(this.val);
    const capitals = /^(?=.*[a-zA-Z])(?!.*[^a-zA-Z]).*$/;;
    const matchCapitals = capitals.test(this.val);
    if (match) {
      return Promise.resolve();
    } else {
      if (matchCapitals) {
        return Promise.reject({
          success: false,
          type: this.type,
          message: `姓と名の間に半角スペースを含みましょう。`
        });
      } else {
        return Promise.reject({
          success: false,
          type: this.type,
          message: `半角英数字のみ使用してください。`
        });
      }
      
    }
  }

}
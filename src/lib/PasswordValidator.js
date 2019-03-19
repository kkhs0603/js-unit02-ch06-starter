import BaseValidator from './BaseValidator';

export default class extends BaseValidator {
  constructor(val) {
    super(val, 'パスワード', 'password');
    this._checkLength = this._checkLength.bind(this);
    this._checkFormat = this._checkFormat.bind(this);
  }
  validate() {
    return super._cannotEmpty()
      .then(this._checkLength)
        .then(this._checkFormat)
          .then((res) => {
            return { success: true }; // Promise.resolve({ success: true })と同一
          })
          .catch(err => {
            return err; // Promise.resolve(err)と同一
          });
  }
  _checkLength() {
    if (this.val.length >= 8) {
      return Promise.resolve();
    } else {
      return Promise.reject({
        success: false,
        type: 'password',
        message: 'パスワードが短すぎます。'
      });
    }
  }
  _checkFormat() {
    /*
      パスワードには半角英数字または@_-.の4つの記号のみを利用可能です。
      必ず1文字以上の大文字のアルファベットが含まれる。
      必ず1文字以上の記号(_-.@)が含まれる。
    */
    const re = /^(?=.*[\w@_.-])(?!.*[^\w@_.-]).*$/;
    const capitals = /[A-Z]+/;
    const symbols = /[@_.-]+/;
    
    const match = re.test(this.val);
    const matchCapitals = capitals.test(this.val);
    const matchSymbols = symbols.test(this.val);

    if (match && matchCapitals && matchSymbols) {
      return Promise.resolve();
    } else {
      return Promise.reject({
        success: false,
        message: `${this.type}のフォーマットが異なります。`
      });
    }
  }
}
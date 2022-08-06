import * as ejs from 'ejs';
export interface IOptions {
  template?: string;
  ejsOptions?: ejs.Options;
}
export class Builder {
  constructor(private options: IOptions) {
    this.options.ejsOptions = Builder._extendsOptions(options.ejsOptions);
  }
  static _ejsOptions: ejs.Options = { client: true, strict: false, _with: false, localsName: 'locals', async: false, rmWhitespace: false, compileDebug: false };
  static _extendsOptions(options: ejs.Options = {}): ejs.Options {
    return { ...Builder._ejsOptions, ...options };
  }
  static async ToJs(template: string, ejsOptions?: ejs.Options): Promise<string> {
    let options = Builder._extendsOptions(ejsOptions);
    let renderText = ejs.compile(template, options).toString();//async function anonymous
    let localsName = options.localsName || 'locals';
    return options.async ?
      renderText.replace(new RegExp(`^async function anonymous\\(${localsName}`), `module.exports = async function(${localsName}`)
        .replace(
          '.replace(o,u)};',
          '.replace(_MATCH_HTML,encode_char)};'
        ) :
      renderText.replace(new RegExp(`^function anonymous\\(${localsName}`), `module.exports = function(${localsName}`)
        .replace(
          '.replace(o,u)};',
          '.replace(_MATCH_HTML,encode_char)};'
        );
  }
  toJs(template: string = this.options.template, options: ejs.Options = this.options.ejsOptions): Promise<string> {
    if (!template)
      throw 'Can not compile ejs without template';
    return Builder.ToJs(template, options);
    // return this.render.toString().replace(/^function anonymous/, 'module.exports = function');
  }
  static async ToTs(template: string, ejsOptions?: ejs.Options): Promise<string> {
    let options = Builder._extendsOptions(ejsOptions);
    let lines = template.split('\n');
    let imports: string[] = [], content: string[] = [];
    let open: boolean = false;
    for (const line of lines) {
      if (line.indexOf('<%') >= 0)
        open = true;
      if (line.indexOf('%>') >= 0)
        open = false;
      if (!open)
        content.push(line);
      else {
        let trimed = line.trim();
        if (trimed.startsWith('import '))
          imports.push(trimed);
        else
          content.push(line);
      }
    }
    let renderText = ejs.compile(content.join('\n'), options).toString();//async function anonymous
    let localsName = options.localsName || 'locals';
    return options.async ?
      [
        imports.length && imports.join('\n') || '',
        renderText.replace(
          new RegExp(`^async function anonymous\\(${localsName}, escapeFn, include, rethrow`),
          `export default async function(${localsName}:any = {}, escapeFn?:Function, include?:Function, rethrow?:Function`
        ).replace(
          '.replace(o,u)};',
          '.replace(_MATCH_HTML,encode_char)};'
        )
      ].filter(v => !!v).join('\n') :
      [
        imports.length && imports.join('\n') || '',
        renderText.replace(
          new RegExp(`^async function anonymous\\(${localsName}, escapeFn, include, rethrow`),
          `export default function(${localsName}:any = {}, escapeFn?:Function, include?:Function, rethrow?:Function`
        ).replace(
          '.replace(o,u)};',
          '.replace(_MATCH_HTML,encode_char)};'
        )
      ].filter(v => !!v).join('\n');
  }
  async toTs(template: string = this.options.template, options: ejs.Options = this.options.ejsOptions): Promise<string> {
    if (!template)
      throw 'Can not compile ejs without template';
    return Builder.ToTs(template, options);
  }
}
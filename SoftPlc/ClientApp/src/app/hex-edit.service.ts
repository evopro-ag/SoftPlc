import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { hexeditorline } from 'src/hexeditorline';
import { Datablock } from './datablock';

@Injectable({
  providedIn: 'root'
})
export class HexEditService {
  public datablock: Datablock;

  public decoderB64:   Subject<string>;
  public decoderHex: Subject<hexeditorline[]>;
  public encoder:   Subject<string>;

  constructor() { 
    this.decoderB64 = new Subject<string>();
    this.encoder = new Subject<string>();
    this.decoderHex = new Subject<hexeditorline[]>();
    
  }

  decodeBase64(base64string: string) : string{
    return atob(base64string);
  }
 encodeBase64(data: string) : string{
  return btoa(unescape(encodeURIComponent(data)))
}


convertHexToAscii(input: string[]) : string{
  var str = "";
  input.forEach(element => {
    str = this.appendParsedIntIfNotEmpty(str, element);
  });

  return str;
}


getSizeOf(hex : hexeditorline[]) : number{
    return  hex.map(line => line.bytes.filter(byte => byte != "" && byte != null).length).reduce((total, lineSize) => total + lineSize, 0);
}

convertAsciiToHex(str: string) : string[]
{
var bytes = [];
for (let n = 0, l = str.length; n < l; n ++) 
 {
  const zeroPad = (num, places) => String(num).padStart(places, '0');
var hex = Number(str.charCodeAt(n)).toString(16).toUpperCase();

 //handle multi-byte chars
  for(let i = 0; i < hex.length; i+=2){
    bytes.push(zeroPad(hex.substr(i, 2), 2));
  }
 }
 return bytes;
}

mapBytesToHexlines(array: Array<string>) : hexeditorline[]{
  var hexlines: hexeditorline[] = [];
  var offset = 0;
for(let i = 0, l = array.length; i < l; i+=16 ){
 var bytes : Array<string> = [];
bytes = array.slice(i, i + 16)

let hexline = {offset: Number(offset).toString(16).toUpperCase(), bytes: bytes}
 hexlines.push(hexline);
 offset +=16;
}
 return hexlines;
}


mapHexlinesToBytes(hex : hexeditorline[]) : string[]{
  var offset = 0;
  var output = [];

  var currentLine = hex.find(x => x.offset === Number(offset).toString(16).toUpperCase());
  while(currentLine){
    output = output.concat(currentLine.bytes.filter(byte => byte != null && byte != ""));
    offset += 16;
    currentLine = hex.find(x => x.offset === Number(offset).toString(16).toUpperCase());
  }
  return output;
}



private appendParsedIntIfNotEmpty(str: string, value: string) : string{
  if(value != "" && value != null){
    str += String.fromCharCode(Number.parseInt(value,16));
    }
    return str;
}

private getArrayValueIfIndexExistsElseEmptyString(index: number, length: number, arr1: any[]): string{
  return index < length ? arr1[index] : "";
}

fillEmptyBytes(hexLines: hexeditorline[]) : hexeditorline[]{
  var foundEnd = false;
  for (let n = hexLines.length - 1; n >= 0; n--) {
      for(let i = 16; i >= 0; i--){
      if(hexLines[n].bytes[i] !== ""){
          foundEnd = true;
      }
      hexLines[n].bytes[i]  = this.replaceIfFoundEnd(hexLines[n].bytes[i] , foundEnd);
    }
  }
    return hexLines;
}

private replaceIfFoundEnd(value :string, foundend: boolean) : string{
  return (value == "" || value == null) && foundend ? "00" : value;
}

}

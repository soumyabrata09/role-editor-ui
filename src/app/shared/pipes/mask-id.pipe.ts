import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maskId',
  standalone: false
})
export class MaskIdPipe implements PipeTransform {

  transform(id: string): string {
    const prefix: string = id.substring(0, 2);
    const suffix: string = id.substring(id.length - 2);
    const maskedMiddle: string = 'X'.repeat(id.length -4)
    return `${prefix}${maskedMiddle}${suffix}`;
  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'page'
})
export class PagePipe implements PipeTransform {

  transform<T>(value: T[], pageIndex: number, perPage: number): T[] {
    return value.slice(pageIndex * perPage, (pageIndex + 1) * perPage)
  }

}

import { Observable } from 'rxjs';

export function createHttpObservable(url: string): Observable<any> {
  return new Observable((observer) => {
    fetch(url, {
      headers: { jwt: localStorage.getItem('token') ?? '' },
    })
      .then((response) => {
        return response.json();
      })
      .then((body) => {
        console.log(body);
        observer.next(body);
        observer.complete();
      })
      .catch((error) => {});
  });
}

// {
//   fetch(url)
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error('request failed');
//       }
//       return response.json();
//     })
//     .then((body) => {
//       console.log(body);
//       observer.next(body);
//       observer.complete();
//     })
//     .catch((error) => {
//       console.error(error);
//       observer.error('something went wrong');
//     });
// }

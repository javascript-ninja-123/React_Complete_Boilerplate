import { combineEpics } from 'redux-observable';
import {Observable} from 'rxjs'
// import {CLICK,CLEAR,FETCH_USER,FETCH_HACKER_NEWS,SEARCH_BEER,CANCEL_SEARCH_BEER} from '../actions/type';
// import {clearClick,fetchUserFufilled,fetchHackerNewsFufilled,searchBeerFufilled,serchBeerError} from '../actions';
//
//
// const ajaxUser = async () => {
//   let response = await fetch('https://randomuser.me/api/');
//   let payload = await response.json();
//   return payload.results[0]
// }
//
// const ajaxHackerNews = async () => {
//   let response = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty');
//   return await response.json();
// }
//
// const ajaxHackerNewsIndividual = async (itemId) => {
//   let response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${itemId}.json?print=pretty`)
//   return await response.json();
// }
//
// const ajaxCallfromBeer = async (beerName) => {
//   try{
//     const URL = 'https://api.punkapi.com/v2/beers/'
//     let response = await fetch(`${URL}?beer_name=${beerName}`)
//     let result = await response.json();
//     if(result.statusCode === 404){
//       return Promise.reject(result.message)
//     }
//     return result;
//   }
//   catch(err){
//     return err.message;
//   }
// }
//
// const loadEpic = action$ => {
//   return action$.ofType(CLICK)
//   .switchMap(() => Observable.of(clearClick()).delay(2000))
// }
//
// const ajaxEpic = action$ => {
//   return action$.ofType(FETCH_USER)
//   .switchMap(() => Observable.fromPromise(ajaxUser()))
//   .map(user => fetchUserFufilled(user))
// }
//
// const hackerNewsEpic = action$ => {
//   return action$.ofType(FETCH_HACKER_NEWS)
//   .switchMap(() => Observable.fromPromise(ajaxHackerNews()))
//   .map(ids => ids.slice(0,5))
//   .map(ids => ids.map(id =>Observable.fromPromise(ajaxHackerNewsIndividual(id))))
//   .switchMap(ids => Observable.forkJoin(ids))
//   .map(news => fetchHackerNewsFufilled(news))
// }
//
// const searchBeerEpic = action$ => {
//   return action$.ofType(SEARCH_BEER)
//   .takeUntil(action$.ofType(CANCEL_SEARCH_BEER))
//   .distinctUntilChanged()
//   .debounceTime(500)
//   .switchMap(({payload}) =>{
//     return  Observable.fromPromise(ajaxCallfromBeer(payload)).delay(500)
//   })
//   .map(beer => searchBeerFufilled(beer))
//   .catch(err => Observable.of(serchBeerError(err)))
// }


const rootEpic = combineEpics(
);



export default rootEpic;

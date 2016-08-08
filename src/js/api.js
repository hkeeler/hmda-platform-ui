import fetch from 'isomorphic-fetch'

function getHandler(suffix){
  var url = makeUrl(parseLocation(), suffix);

  return fetch(url)
    .then(response => response.json())
}

function postHandler(suffix, postData){
  var url = makeUrl(parseLocation(), suffix);

  return fetch(url, {method: 'POST', body: postData})
    .then(response => response.json())
}

export function makeUrl(obj, suffix){
  var url = location.protocol + '//' + location.host + '/api'
  if(obj.id) url+= '/institutions/' + obj.id;
  if(obj.period) url+= '/periods/' + obj.period;
  if(obj.submission) url+= '/submissions/' + obj.submission;
  if(suffix) url += suffix;
  return url;
}

export function parseLocation(){
  var pathParts = location.pathname.split('/');
  return {id: pathParts[1], period: pathParts[2], submission: pathParts[3]}
 }

 export function getInstitutions(){
   return getHandler('/institutions');
 }

 export function getInstitution(id){
   return getHandler('/institutions/' + id);
 }

 export function getProgress(url, cb){
   return getHandler(url, cb, '/progress');
 }

 export function getIRS(url, cb){
  return getHandler(url, cb, '/irs');
 }

 export function postIRS(url, cb, data){
  return postHandler(url, cb, '/irs', data);
 }

 export function getSignature(url, cb){
  return getHandler(url, cb, '/sign');
 }

 export function postSignature(url, cb, data){
   return postHandler(url, cb, '/sign', data);
 }

 export function postSubmissions(url, cb){
   return postHandler(url, cb, '/submissions');
 }

 export function getEditsByType(url, cb){
   return getHandler(url, cb, '/edits');
 }

 export function getEditsByRow(url, cb){
   return getHandler(url, cb, '/edits/lars');
 }

 export function putEdit(edit, data){
    var suffix = '/edits/' + edit;
    var url = makeUrl(parseLocation(), suffix);

    return fetch(url, {method: 'PUT', body: data});
 }

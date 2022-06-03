
/**
 * @description
 * Returns a uuid.
 * @returns
 */
export function uuid(): string {
  let timestamp = new Date().getTime();//Timestamp
  let loadedTime = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported

  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char: string) => {
      var random = Math.random() * 16;//random number between 0 and 16
      if(timestamp > 0){//Use timestamp until depleted
        random = (timestamp + random)%16 | 0;
        timestamp = Math.floor(timestamp/16);
      } else {//Use microseconds since page-load if supported
          random = (loadedTime + random)%16 | 0;
          loadedTime = Math.floor(loadedTime/16);
      }

      return (char === 'x' ? random : (random & 0x3 | 0x8)).toString(16);
  });
}

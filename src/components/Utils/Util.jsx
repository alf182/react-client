import React from 'react';

class Util extends React.Component{
  static listenChar(value){
    if(value === undefined)
      return null;
    return value;
  }

  static listenInt(value){
    if(value === undefined || value === null || value === "")
      return null;
    return Number(value);
  }
}

export default Util;
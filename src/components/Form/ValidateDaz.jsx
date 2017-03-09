import React from 'react';
import ReactDom from 'react-dom';
import _defaultRules from './Rules';
import _defaultMessages from './Messages';
import assign from 'object-assign';

let __OriginFromSubmitHandler = function(){};
const _defaultMessage = 'Input is not valid.';

function insertMessageAfterInput (messages){
  let inputClassName = this.className.split(/\s+/);
  if(inputClassName.indexOf('text-red') === -1){
    inputClassName.push('text-red');
  }
  else {
    //Do Noting
  }
  this.className = inputClassName.join(' ');
  //if(this.nextSibling && this.nextSibling.className === 'validate-message'){
  if(this.nextSibling && this.nextSibling.className === 'help-block'){
    this.parentNode.classList.add("has-error");
    this.nextSibling.innerText = messages[0];
  }
  else{
    let messageNode = document.createElement('span');
    messageNode.innerText = messages[0];
    //messageNode.className = 'validate-message';
    messageNode.className = 'help-block';
    if(this.nextSibling && this.parentNode){
      this.parentNode.classList.add("has-error");
      this.parentNode.insertBefore(messageNode, this.nextSibling);
    }
    else if(this.parentNode) {
      if(this.parentNode.attributes[0].ownerElement.localName == 'div'){
        this.parentNode.classList.add("has-error");
        this.parentNode.appendChild(messageNode);
      }else{
        let newParent = this.parentNode;
        forParents(newParent.parentNode, messageNode,messages);
      }
    }
    else {
      throw "Don't have a parent Node?  Impossible!"
    }
  }
}

function forParents(element, messageNode,messages){
  if(element.attributes[0].ownerElement.localName == 'div'){
    if(!element.classList.contains("has-error")){
      element.classList.add("has-error");
      if(element.attributes[0].ownerElement.children.length == 2){
        element.appendChild(messageNode);
      }else{
        element.attributes[0].ownerElement.children[2].innerText = messages[0];
      }

    }
  }
}

function deleteMessageAfterInput (){
  let inputClassName = this.className.split(/\s+/);
  while(inputClassName.indexOf('text-red') !== -1){
    inputClassName.splice(inputClassName.indexOf('text-red'), 1);
  }
  this.className = inputClassName.join(' ');
  //if(this.nextSibling && this.nextSibling.className === 'validate-message'){
  if(this.nextSibling && this.nextSibling.className === 'help-block'){
    this.nextSibling.innerText = '';
    this.parentNode.classList.remove("has-error");
  } else {
    if(this.parentNode.nextSibling && this.parentNode.nextSibling.className === 'help-block'){
      this.parentNode.nextSibling.innerText = '';
      //this.parentNode.parentNode.classList.remove("has-error");
      this.parentNode.parentNode.classList.remove("has-error");
    }
  }
}

const VFrom = React.createClass({
    getDefaultProps (){
      return {
        rules: {},
        messages: {},
        onSubmit(){},
        messageClassName: ''
      }
    },
    getInitialState (){
      return {
        fitRule: true,
        messages: []
      }
    },
    findChildInputByName (name){
      const _theForm = ReactDom.findDOMNode(this.refs['vForm']);
      return _theForm.querySelector('[name=' + name + ']');
    },
    addChangeValidator (name){
      const rules = assign({}, this.props.rules[name]);
      return this.validate(rules, this.props.messages[name] || {});
    },
    validate (rules, messages){
      return (event) => {
        let value = event.target.value,
          testFlag = true,
          popMessages = [],
          input = event.target;
        for(let i in rules){
          if(rules.hasOwnProperty(i) && rules[i]){
            if(Object.prototype.toString.call(rules[i]) === '[object RegExp]'){
              //If the rule itself is a RegExp Object
              if(!rules[i].test(value)){
                //If you break the rules
                testFlag = false;
                popMessages.push(messages[i] || _defaultMessage);
              }
              else {
                //Do Nothing
              }
            }
            else if(Object.prototype.toString.call(rules[i]) === '[object Function]'){
              //If the rule itself is a Function.
              if(!rules[i](value)){
                testFlag = false;
                popMessages.push(messages[i] || _defaultMessage);
              }
              else {
                //Do Nothing
              }
            }
            else {
              if(!_defaultRules[i]){
                if(!_defaultRules['_NOT_' + i]){  //没有这条规则
                  throw 'ERROR: Rule: ' + i + ' is not defined.';
                }
                else { //If there is a anti-rule of this current rule
                  if(_defaultRules['_NOT_' + i].test(value)){
                    testFlag = false;
                    popMessages.push(messages[i] || _defaultMessages[i]);
                  }
                  else {
                    //Do Nothing
                  }
                }
              }
              else { //If there is a Default Rule.
                if(Object.prototype.toString.call(_defaultRules[i]) === '[object RegExp]'){
                  if(!_defaultRules[i].test(value)){
                    testFlag = false;
                    popMessages.push(messages[i] || _defaultMessages[i]);
                  }
                  else {
                    //Do Nothing
                  }
                }
                else if(Object.prototype.toString.call(_defaultRules[i]) === '[object Function]') {
                  if(!_defaultRules[i](rules[i], value)){
                    testFlag = false;
                    popMessages.push(messages[i] || (_defaultMessages[i] + rules[i]));
                  }
                }
              }
            }
          }
        }
        if(testFlag){
          deleteMessageAfterInput.call(input, popMessages);
        }
        else {
          insertMessageAfterInput.call(input, popMessages);
        }
        return testFlag;
      }
    },
    componentDidMount (){
      const rules = this.props.rules;
      if(this.refs['vForm']){
        const _theForm = ReactDom.findDOMNode(this.refs['vForm']);
        _theForm.addEventListener('submit', this.valid);
        for(let i in rules){
          if(rules.hasOwnProperty(i)){
            let input = this.findChildInputByName(i);
            if(input){
              input.onkeyup = this.addChangeValidator(i);
            }
            else {
              throw 'ERROR: There is no input name as :' + i + ' !'
            }
          }
        }
      }
      else {
        throw 'ERROR: Did not found a Form to validate. Make sure you set the ref of the Form as "vForm".'
      }
    },
    valid (event){
      if(this.refs['vForm']){
        const rules = this.props.rules;
        let testFlag = true;
        for(let i in rules){
          if(rules.hasOwnProperty(i)){
            let input = this.findChildInputByName(i);
            if(input){
              testFlag = (this.validate(this.props.rules[i], this.props.messages[i] || {})({target: input}))&&testFlag;
            }
            else {
              throw 'ERROR: There is no input name as :' + i + ' !'
            }
          }
        }
        if(!testFlag){
          event.preventDefault();
          event.stopPropagation();
        }
        else {
          this.props.onSubmit(event);
        }
      }
    else {
      throw 'ERROR: Did not found a Form to validate. Make sure you set the ref of the Form as "vForm".'
    }
  },
  render (){
  return(
    <div>
      {React.Children.map(this.props.children, (element) => {
        return React.cloneElement(element, { ref: element.ref });
      })}
    </div>
  )
}
});

export default VFrom;
module.exports = VFrom;
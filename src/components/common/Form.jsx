import React from 'react'

const getData = target => {
  let obj = {};
  for (var k of target) obj[k.name] = k.value;
  return obj;
}

const Form = props => (
  <form
    onSubmit={e => {
      e.preventDefault();
      props.onSubmit(getData(e.currentTarget))
    }}>
    {props.children}
  </form>
)

export default Form;

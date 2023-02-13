import './style.css'
import './button-style.css'
import Result from '../../assets/svgs/result.svg';
import { useEffect, useState } from 'react';


export function Calculator() {

  const [num, setNum] = useState(0)
  const [oldNum, setOldNum] = useState(0)
  const [operator, setOperator] = useState(0)
  const [rest, setRest] = useState()

  function inputNum(e) {
    let number = e.target.value

    const dotCount = (num + number).toString().split(".").length - 1;
    if (dotCount > 1) {
      return;
    }

    if (num === 0) {
      setNum(number)
    } else {
      setNum(num + number)
    }

  }

  function porcentage() {
    setNum(num / 100)
    setRest(`${num} / 100 =`)
    if (oldNum === 0) {
      setNum(0)
    }

  }

  function changeSign() {
    if (num > 0) {
      setNum(-num)
    } else {
      setNum(Math.abs(num))
    }
  }

  function operatorHandler(e) {
    let operatorInput = e.target.value
    setOperator(operatorInput)
    setOldNum(num)
    setRest(`${num} ${operatorInput}`)
    setNum(0)
  }

  function calculate() {
    let result;

    if (isNaN(num) || !isFinite(num) || isNaN(oldNum) || !isFinite(oldNum)) {
      setRest(0);
      return;
    }

    if (operator === '/' && num === 0) {
      setNum(0);
      return;
    }


    if (operator === '/') {
      result = parseFloat(oldNum) / parseFloat(num)
    } else if (operator === 'X') {
      result = parseFloat(oldNum) * parseFloat(num)
    } else if (operator === '-') {
      result = parseFloat(oldNum) - parseFloat(num)
    } else if (operator === '+') {
      result = parseFloat(oldNum) + parseFloat(num)
    }

    if (isNaN(result)) {
      setNum(0);
      setRest('Erro');
    } else {
      setNum(result)
      setRest(`${oldNum + ' ' + operator + ' ' + num} =`)
    }
  }

  function clearNum() {
    setNum(0)
  }

  function clearAll() {
    setNum(0)
    setRest()
  }

  const numberResponsive = () => {
    const numDigits = num.toString().length

    if (numDigits <= 9) {
      return {fontSize: '32px'}
    } else if (numDigits >= 10 && numDigits <= 14) {
      return { fontSize: '24px' }
    } else if (numDigits > 14) {
      return { fontSize: '12px' }
    }

  }

  const restResponsive = () => {
    const numDigits = num.toString().length


    if (numDigits <= 9) {
      return {fontSize: '20px'}
    } else if (numDigits >= 10 && numDigits <= 14) {
      return { fontSize: '15px' }
    } else if (numDigits > 14) {
      return { fontSize: '10px' }
    }
  }

  const iconResponsive = () => {
    const numDigits = num.toString().length


    if (numDigits <= 9) {
      return {marginTop: '14px'}
    } else if (numDigits >= 10 && numDigits <= 14) {
      return { marginTop: '5px' }
    } else if (numDigits > 14) {
      return { marginTop: '-3px' }
    }
  }



  if (num == NaN) {
    setNum(0)
  }


  return (
    <div id="calculator">

      <div id='result'>

        <div id="rest" className='result' style={restResponsive()}>
          {rest}
        </div>

        <img id='result-icon' src={Result} alt="Resultado" style={iconResponsive()}/>

        <div id='counter'>
          <p id='numberContainer' style={numberResponsive()}>
            {num}
          </p>
        </div>

      </div>

      <span id='line'></span>

      <div id='keyboard'>

        <button id="button" onClick={clearAll} className='secondary'> CE </button>

        <button id="button" onClick={clearNum}> C </button>

        <button id="button" value="%" onClick={porcentage}> % </button>

        <button id="button" value="/" onClick={operatorHandler} className='tertiary'> / </button>

        <button id="button" value="7" onClick={inputNum}> 7 </button>

        <button id="button" value="8" onClick={inputNum}> 8 </button>

        <button id="button" value="9" onClick={inputNum}> 9 </button>

        <button id="button" value="X" className='tertiary' onClick={operatorHandler}> x </button>

        <button id="button" value="4" onClick={inputNum}> 4 </button>

        <button id="button" value="5" onClick={inputNum}> 5 </button>

        <button id="button" value="6" onClick={inputNum}> 6 </button>

        <button id="button" value="-" className='tertiary' onClick={operatorHandler}> - </button>

        <button id="button" value="1" onClick={inputNum}> 1 </button>

        <button id="button" value="2" onClick={inputNum}> 2 </button>

        <button id="button" value="3" onClick={inputNum}> 3 </button>

        <button id="button" value="+" className='tertiary' onClick={operatorHandler}> + </button>

        <button id="button" onClick={changeSign}> +/- </button>

        <button id="button" value="0" onClick={inputNum}> 0 </button>

        <button id="button" value="." onClick={inputNum}> . </button>

        <button id="button" className='quaternary' onClick={calculate}> = </button>

      </div>

    </div>
  )
}
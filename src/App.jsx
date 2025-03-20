import { useState } from "react";
import { DynamicInput } from "./Components";
import useCurrency from "./Hooks/useCurrency";

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [converting, setConverting] = useState(false);

  // use useCurrencyInfo hook **CUSTOM**
  const currencyInfo = useCurrency(from);
  const options = Object.keys(currencyInfo);
  //convert method
  const convert = () => {
    if (amount > 0) {
      setConvertedAmount(amount * currencyInfo[to]);
      if (setConvertedAmount) {
        setConverting(true);
        setTimeout(() => {
          setConverting(false);
        }, 300);
      }
    } else {
      setConverting(false);
    }
  };
  // swap

  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount)
    setAmount(convertedAmount)
  };
  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('${"https://images.unsplash.com/photo-1738165170747-ecc6e3a4d97c?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}')`,
      }}
    >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto  rounded-lg p-5 backdrop-blur-sm">
          <form
            onSubmit={(e) => {
              e.preventDefault(), convert();
            }}
          >
            <div className="w-full mb-1">
              <DynamicInput
                label="From"
                currencyOptions={options}
                value={amount}
                onAmountChange={(amount) => setAmount(amount)}
                onCurrencyChange={(currency) => setFrom(currency)}
                currentCurrency={from}
              />
            </div>
            <div className="relative w-full h-0.5">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                onClick={swap}
              >
                swap
              </button>
            </div>
            <div className="w-full mt-1 mb-4">
              <DynamicInput
                label="To"
                currencyOptions={options}
                value={convertedAmount}
                onCurrencyChange={(currency) => setTo(currency)}
                // onAmountChange={(amount) => setConvertedAmount(amount)} NOTE :- NO  NEED FOR THIS LINE CZ ITS CHANGES THROUGH CONVERTED FN NOT HERE
                currentCurrency={to}
                amountDisabled
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg"
            >
              {converting
                ? "Converting"
                : `Convert ${from.toUpperCase()} to ${to.toUpperCase()}`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;

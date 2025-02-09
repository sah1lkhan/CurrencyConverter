import PropTypes from "prop-types";
import { useId } from "react";

const DynamicInput = ({
  label,
  value,
  onAmountChange,
  onCurrencyChange,
  currencyOptions = [],
  currentCurrency = "usd",
  currencyDisabled = false,
  amountDisabled = false,
}) => {
  //useIdHook
  const idForAmountInput = useId();
  return (
    <div className={`bg-white p-3 rounded-lg text-sm flex `}>
      <div className="w-1/2">
        <label
          htmlFor={idForAmountInput}
          className="text-black/40 mb-2 inline-block"
        >
          {label}
        </label>
        <input
          className="outline-none w-full bg-transparent py-1.5"
          type="number"
          placeholder="Amount"
          value={value}
          onChange={(e) => {
            const newValue = Number(e.target.value);
            onAmountChange &&
              onAmountChange(!isNaN(newValue) && newValue > 0 ? newValue : 0);
          }}
          disabled={amountDisabled}
          id={idForAmountInput}
        />
      </div>
      <div className="w-1/2 flex flex-wrap justify-end text-right">
        <p className="text-black/40 mb-2 w-full">Currency Type</p>
        <select
          className="rounded-lg px-1 py-1 bg-gray-100 cursor-pointer outline-none"
          value={currentCurrency}
          onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
          disabled={currencyDisabled}
        >
          {currencyOptions.map((selectedCurrency) => (
            <option key={selectedCurrency} value={selectedCurrency}>
              {selectedCurrency}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

DynamicInput.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onAmountChange: PropTypes.func.isRequired,
  currentCurrency: PropTypes.string,
  currencyOptions: PropTypes.arrayOf(PropTypes.string),
  amountDisabled: PropTypes.bool,
  currencyDisabled: PropTypes.bool,
  onCurrencyChange: PropTypes.func.isRequired,
};

DynamicInput.defaultProps = {
  currentCurrency: "usd",
  currencyOptions: [],
  amountDisabled: false,
  currencyDisabled: false,
};

export default DynamicInput;

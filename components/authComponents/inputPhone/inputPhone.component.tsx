import NumberFormat from "react-number-format";
interface inputNumber {
  onChange: Function;
}
const inputNumber = ({ onChange }: inputNumber) => {
  return (
    <NumberFormat
      className="inputPhone"
      format="+7 (###) ###-####"
      allowEmptyFormatting
      mask="_"
      required
      onValueChange={({ value }) => onChange(value)}
    />
  );
};
export default inputNumber;

import NumberFormat from "react-number-format";
interface inputCode {
  onChange: Function;
  value: string;
}

const inputCode = ({ onChange,value }: inputCode) => {
  return (
    <NumberFormat
      className="inputCode"
      format="####"
      allowEmptyFormatting
      mask="*"
      required
      value={value}
      onValueChange={({ value }) => onChange(value)}
    />
  );
};
export default inputCode;

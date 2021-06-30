import NumberFormat from "react-number-format";
interface inputCode {
  onChange: Function;
}
const inputCode = ({ onChange }: inputCode) => {
  return (
    <NumberFormat
      className="inputCode"
      format="###-###"
      allowEmptyFormatting
      mask="*"
      required
      onValueChange={({ value }) => onChange(value)}
    />
  );
};
export default inputCode;

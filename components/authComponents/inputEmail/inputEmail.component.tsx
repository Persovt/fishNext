import NumberFormat from "react-number-format";
interface inputNumber {
  onChange: Function;
}
const inputNumber = ({ onChange }: inputNumber) => {
  return (
    <input
      onChange={(e) => onChange(e.target.value)}
      type="email"
      className="inputPhone"
      placeholder="email@example.com"
      name="email"
      required
    />
  );
};
export default inputNumber;

import Icon, { type IconProps } from "../../UI/icons/Icon";

export default function ChevronDownIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m19.5 8.25-7.5 7.5-7.5-7.5"
      />
    </Icon>
  );
}

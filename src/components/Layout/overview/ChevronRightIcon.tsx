import Icon, { type IconProps } from "../../UI/icons/Icon";

export default function ChevronRightIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m8.25 4.5 7.5 7.5-7.5 7.5"
      />
    </Icon>
  );
}

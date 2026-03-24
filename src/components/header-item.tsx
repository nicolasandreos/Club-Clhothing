interface HeaderItemProps {
  text: string;
  onClick: () => void;
  icon?: React.ReactNode;
}

const HeaderItem = ({ text, onClick, icon }: HeaderItemProps) => {
  return (
    <li className="cursor-pointer" onClick={onClick}>
      {icon ? (
        <div className="flex items-center gap-2">
          {text}
          {icon}
        </div>
      ) : (
        text
      )}
    </li>
  );
};

export default HeaderItem;

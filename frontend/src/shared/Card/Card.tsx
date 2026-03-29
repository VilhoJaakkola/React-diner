const Card = (props: { className?: string; style?: React.CSSProperties; children: React.ReactNode }) => {
  return (
    <div
      className={`relative m-0 shadow-[0_2px_8px_rgba(0,0,0,0.26)] rounded-md p-4 overflow-hidden text-[#4d4d4d] bg-white ${props.className ?? ''}`}
      style={props.style}
    >
      {props.children}
    </div>
  );
};

export default Card;

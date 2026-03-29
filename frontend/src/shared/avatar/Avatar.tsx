const Avatar = (props: { className?: string; style?: React.CSSProperties; image: string; alt: string; width?: string | number }) => {
  return (
    <div className={`${props.className ?? ''}`} style={props.style}>
      <img src={props.image} alt={props.alt} style={{ width: props.width, height: props.width }} />
    </div>
  );
};

export default Avatar;

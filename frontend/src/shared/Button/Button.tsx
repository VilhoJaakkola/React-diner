const base =
  '[font:inherit] py-2 px-6 border border-[#4285f4] rounded bg-[#4285f4] text-white cursor-pointer mr-4 no-underline inline-block ' +
  'focus:outline-none hover:bg-[#0d47a1] hover:border-[#0d47a1] active:bg-[#0d47a1] active:border-[#0d47a1] ' +
  'disabled:bg-[#ccc] disabled:text-[#979797] disabled:border-[#ccc] disabled:cursor-not-allowed';

const inverse =
  'bg-transparent text-[#4285f4] hover:text-white hover:bg-[#4285f4] active:text-white active:bg-[#4285f4]';

const danger =
  'bg-[#ff4444] border-[#ff4444] hover:bg-[#cc0000] hover:border-[#cc0000] active:bg-[#cc0000] active:border-[#cc0000]';

const sizes: Record<string, string> = {
  small: 'text-[0.8rem]',
  big: 'text-[1.5rem]',
  default: '',
};

type ButtonProps = {
  size?: 'small' | 'big' | 'default';
  inverse?: boolean;
  danger?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  'data-cy'?: string;
};

const Button = (props: ButtonProps) => {
  const classes = [
    base,
    props.inverse ? inverse : '',
    props.danger ? danger : '',
    sizes[props.size ?? 'default'],
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      className={classes}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
      data-cy={props['data-cy']}
    >
      {props.children}
    </button>
  );
};

export default Button;
